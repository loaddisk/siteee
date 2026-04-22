---
title: Homomorphic Encryption in iOS 18
description: A mathematical miracle enables Apple's servers to process your photos while never knowing anything about them
date: 2025-01-10
is: the product of two dots
tags: [apple,security,math,ai]
in: blog
---

> [[PenPen]]'s Note: This article is written with the intent of accessibility to non-maths folk who possess some computer knowhow. It comes in wake of the shit storm following Jeff Johnson's recent “[Apple Photos phones home on iOS 18 and macOS 15](https://lapcatsoftware.com/articles/2024/12/3.html)”. There's a lot of confusion and curiosity about how this technology works, along with criticisms lobbed at Apple's densely packed published research. The goal of this post is to distill that research into a more understandable package, so that you can make more informed decisions about your data. "[Nowhere does Apple plainly say what is going on](https://pxlnv.com/linklog/enhanced-visual-search/)", but maybe I can.

You are Apple. You want to make search work like magic in the Photos app, so the user can find all their “dog” pictures with ease. You devise a way to numerically represent the _concepts_ of an image, so that you can find how closely images are related in meaning. Then, you create a database of known images and _their_ numerical representations (“this number means car”), and find the closest matches. To preserve privacy, you put this database on the phone.

All of this, as cool as it might sound, is a [solved](https://youtu.be/wjZofJX0v4M?t=747) [problem](https://stackoverflow.blog/2023/11/09/an-intuitive-introduction-to-text-embeddings/). This "numerical representation" is called an embedding vector. A vector is a series of coordinates in a very high dimensional space. One dimension might measure how "dog-like" a thing is. Another might measure how "wild-like" a thing is. Dog-like *and* wild-like? That's a wolf. We can compare distances using algorithms like cosine similarity. We are quite good at turning text into vectors, and only slightly worse at doing the same for images.

But then, your database grows. Your users don’t want _all_ dogs, they want golden retrievers. You can no longer fit this database on a device. You’re tempted to store this database on your servers, and send the numerical representation computed on device off to them. This should be fine: vectorization is a lossy operation. But then you would know that Amy takes lots of pictures of golden retrievers, and that is a political disaster.

## The promise of homomorphic encryption

Another thing we're pretty good at is encryption. Encryption enables us to take a series of bits and scramble them, such that an observer (someone without a key) cannot read the original value. When the correct key is applied, the original value is restored.

For encryption to work, small changes to the input must change the output in unpredictable ways. If this *wasn't* the case, an attacker could gradually refine an input, with the goal of creating increasingly similar encrypted outputs. When the outputs match, the attacker knows the original value.

Unfortunately, encryption as we know it is of little use to us. If we encrypt our vector before we send it, Apple's servers cannot read the value of the vector. If Apple's servers cannot read the value of the vector, then they do not know what database entry is most closely located to our vector (if they *do* know, then our encryption failed). Servers cannot tell us things they do not know. Therefore, all this was for waste.

This conjecture sounds concrete, but one of the statements is false. What if I told you that servers *can* tell us things they do not know? Enter homomorphic encryption.

The premise is as follows: the client sends the server an encrypted value. The server cannot read the value. The server *can* modify the value, but it cannot know the new value resulting from this modification. In essence, the server is operating with a blindfold.

::: figure Real photo of apple server rooms

![A stock image of a woman using an old computer wearing a blindfold](/assets/Pasted%20image%2020250109220746.png)

:::

Take addition. You are given unknown value `P`, and you add known value `Q` to it. You can deduce that the resulting value is equal to `P+Q`, but you do not know what `P+Q` *is*, nor do you know `P`. The client decrypts the value using it's key, and obtains the result of `P+Q`. Since the client also knows the value of `P`, it can backsolve for `Q`.

```pintora
sequenceDiagram
    Client->>Client: Generate plaintext value P
    Client->>Client: Encrypt P into ciphertext E(P)
    Client->>Server: Send E(P)
    Server->>Server: Modify E(P) blindly: E(P)+E(Q)=E(P+Q)
    Server->>Client: Send modified ciphertext E(P+Q)
    Client->>Client: Decrypt to get result (P+Q)
```

There are two main operations that hold in a homomorphic scheme:

- **Homomorphic addition**: `E(P) + E(Q) = E(P + Q)`
- **Homomorphic multiplication**: `E(P) * E(Q) = E(P * Q)`

Operations typically reserved for plaintext can now be performed on ciphertext!

There are a number of complexities associated with homomorphic encryption, such as the accumulation of [noise](https://www.jeremykun.com/2024/05/04/fhe-overview/#basic-operations-and-dealing-with-noise). Supporting a truly arbitrary number of operations is quite difficult, but if you can support both gates with arbitrary depth, you have *fully* homomorphic encryption. The actual maths behind this is quite complex, and will unfortunately need to be out of scope. There's some interest in creating compilers for homomorphic encryption, and our code samples will be Rust, loosely based on the [Sunscreen](https://docs.sunscreen.tech/fhe/intro/intro.html) compiler for simplicity. [Concrete](https://docs.zama.ai/concrete) is likely a much [more robust](https://medium.com/optalysys/fully-homomorphic-encryption-and-the-game-of-life-d7c37d74bbaf) option, with a higher learning curve.

::: details Open call for cryptographers

The world could use an explanation of the maths behind homomorphic encryption (and, by extension, post-quantum encryption!) in simple English.

I somewhat understand the shortest vector problem and the resulting insecure GGH encryption scheme.

I *think* I understand that the fundamentals of BFV is 'Ring learning with errors', where the client generates a number of polynomials, picks some value of `w`, and calculates the answers to each equation for its value of `w`. The public key is the system with a private value of `w`, and public solutions. The solutions have some random error. The solution to RLWE can be used to solve a shortest vector problem in a lattice. But it's all a little fuzzy.

I'm looking for some 3blue1brown style intuitive explanation of how BFV works end to end, I haven't really found one. Maybe it exists? If so, let me know. If it doesn't exist, maybe you'd like to make one ;)

:::

### What do homomorphic programs look like?

Below is a simple homomorphic program that multiplies two encrypted values:

```rust
#[fhe_program]
fn multiply(a: Cipher<Signed>, b: Cipher<Signed>) -> Cipher<Signed> {
    a * b
}
fn main() {
    let (public_key, private_key) = runtime.generate_keys()?;
    // client encrypts value using its public key. This encrypted value can only be decrypted using the private key. This is called asymmetric encryption.
    let client_value = runtime.encrypt(Signed::from(8), &public_key)?;
    // The private key isn't sent to the server, so the server cannot decrypt the '8'
    let res = server(public_key, client_value);
    // client uses its private key to decrypt the value. result = 24
    let result = runtime.decrypt(res, &private_key)?;
}
// the server does not receive the private key, and thus cannot decrypt the result nor client_value
fn server(public_key: PublicKey, client_value: Cipher<Signed>) -> Cipher<Signed> {
	// server encrypts a new value using the user's public key
    let server_value = runtime.encrypt(Signed::from(3), &public_key)?;
    // server runs 'multiply' using both the client_value and the server_value, and returns the response
    runtime.run(multiply, vec![client_value, server_value], &public_key)?
}
```

This example is quite simple. It gets much more complicated when you need to perform a number of operations, such what may be required by private information retrieval, as you need to structure the query as some primitive mathematical operations.

More specifically, HE programs tend to *only* support `add` and `mul` instructions by their nature. Comparisons and Modulus are very difficult. So you need to structure your query in very particular ways.

For instance, to retrieve a value from a database, the query can be structured a vector of length `n`, where `n` is the size of the database. The query is a vector of `0`s, with a `1` at the index of the value you want to retrieve[^1]. Then, you perform a dot product with the database, and all values except the one you want to retrieve will be zeroed out:

```rust
// [0, 0, 1, 0, 0] * [10, 20, 30, 40, 50] = [0, 0, 30, 0, 0]
// => (0 + 0 + 30 + 0 + 0) = 30
#[fhe_program]
fn lookup(query: [Cipher<Signed>; DATABASE_SIZE], database: [Signed; DATABASE_SIZE]) -> Cipher<Signed> {
    let mut sum = query[0] * database[0];
    for i in 1..DATABASE_SIZE {
        sum = sum + query[i] * database[i]
    }
    sum
}
```

You may be thinking that this sounds computationally expensive. You would be correct. In terms of bandwidth, you can reduce the length of inputs. For instance, if you structured the database in two dimensions, the query could encode the row and the column separately, and then you have a query size of `2sqrt(n)`, without any leaks. You may, however, be paying the price in execution cost.

::: details sqrt lookup

```rust
#[fhe_program]
fn lookup(
    col_query: [Cipher<Signed>; SQRT_DATABASE_SIZE],
    row_query: [Cipher<Signed>; SQRT_DATABASE_SIZE],
    database: [[Signed; SQRT_DATABASE_SIZE]; SQRT_DATABASE_SIZE],
) -> Cipher<Signed> {
    let mut col = [col_query[0]; SQRT_DATABASE_SIZE];
    // extract desired column
    for i in 0..SQRT_DATABASE_SIZE {
        for j in 0..SQRT_DATABASE_SIZE {
            if j == 0 {
                col[i] = database[i][j] * col_query[j];
            } else {
                col[i] = col[i] + database[i][j] * col_query[j];
            }
        }
    }
    let mut sum = col[0] * row_query[0];
    for i in 1..SQRT_DATABASE_SIZE {
        sum = sum + col[i] * row_query[i];
    }
    sum
}
```

:::

> [[PenPen]]'s Note: With sunscreen, branching cannot depend on function parameters, and comparisons with those parameters isn't supported. Not even `==`. This is because under the hood, everything you do is just algebra with polynomials. By hand, you *can* implement boolean logic, however. Jeremy Kun writes that "Given this power, you can encrypt your data bit by bit, express your program as a boolean circuit—an `XOR` gate is addition and an `AND` gate is multiplication—and simulate the circuit. Since `XOR` and `AND` form a universal basis for boolean logic, you can always decompose a circuit this way". Also, with branching, you might wonder if branches can leak information. [Yes](https://www.jeremykun.com/2024/05/04/fhe-overview/#the-highest-level-view). They can. Hence, the worst case scenario must be executed every time. All `if` branches must be executed, and all loops must reach their upper bounds (this also means that the bounds must be statically known)

Cosine similarity is more difficult, as it is defined with division and norm operations, but you can normalize the vectors and then do simple scalar products inside the homomorphic program. Preprocessing really is the name of the game.

```rust
let norm = (vector1.iter().map(|x| x * x).sum::<f64>()).sqrt();
let normalized_vector: Vec<Signed> = vector1.iter().map(|x| Signed::from(x / norm1)).collect();
```

We have no way to simply return the best match. At best, we can return scores for each entry in the database, and the client can then decrypt the scores and find the best match:

> For each query, the server response contains all the entries in the cluster. [...] In Wally, we utilize lattice-based, somewhat homomorphic encryption (SHE) to reduce the response overhead. [...] The server computes the distance function between the encrypted information and the cluster entries under SHE and returns encrypted scores. This reduces the response because the size of encrypted scores is significantly smaller than the entries.

## Apple's implementation: Wally

> [[PenPen]]'s Note: This section provides a high level overview of the [Scalable Private Search with Wally](https://arxiv.org/pdf/2406.06761) paper.

Unfortunately, Apple's implementation of homomorphic encryption is not as pure as what we've discussed above. Apple must balance both privacy and performance, which are at odds with each other (HE programs run many orders of magnitude slower than their equivalents).

Before we get to Apple's take on HE, let's take a step beck. A non-private implementation of this search would look like this:

1. At initialization, the server separates its documents into clusters of similar documents.[^2]
2. The client picks the cluster that best matches the query.
3. The client sends its vector to the server.
3. The server returns the similarity score for each document in the cluster.
4. The client picks the best entry.
5. The client requests the metadata for the index of the best entry.

This has the following security flaws:

1. The server can read the vector. Embeddings can be [quite revealing](https://arxiv.org/abs/2310.06816).
2. The client reveals the nearest cluster. This is a less significant issue, but it can be used to infer the query. For instance, a query with an embedding matching "dog" would likely be in the "animal" cluster.
3. To fetch the relevant metadata, the client sends the index of the closest entry to the server. This would also be a privacy leak!

### Hiding the embedding: back to homomorphic encryption

The embedding vector is by far the most sensitive piece of information that is currently being leaked.

Fully homomorphic encryption is too slow to be used by Apple, so they use somewhat homomorphic encryption. SHE supports both addition and multiplication logic, but only to a certain depth. Each math operation increases depth, as it increases the amount of noise. Parameters have been chosen that balance security and noise budgets. Obviously it would be ideal not to be working under these constraints. Unfortunately, FHE just isn't fast enough yet.

Here are the implemented operations, where `ct` means `E(v)` and `v` is a vector:


| SHE operation                   | Result    | Time (ms) | Noise (bits) |
| ------------------------------- | --------- | --------- | ------------ |
| PtCtAdd(ct, v')                 | E(v + v') |           |              |
| CtCtAdd(ct, ct')                | E(v + v') | 0.004     | 0.5          |
| PtCtMult(ct, v')                | E(v ⊙ v') | 0.02      | 20           |
| CtCtMult(ct, ct')               | E(v ⊙ v') | 2.5       | 26           |
| CtRotate(ct, r) for r ∈[0, n/2) |           | 0.5       | 0.5          |

In the pesudocode above, the query is a vector of many individually encrypted values. In Apple's implementation, it appears the whole vector is fit into a singular value:

> Overall, in our implementation, the client query and server response are a single RLWE ciphertext of sizes 226kB, and 53kB, respectively, (the former with evaluation keys)

The optimizations they do to the similarity math is described later in the paper, but I'm not gonna lie — it went over my head.

### Hiding the nearest cluster

Of the three leaks, the cluster is the least significant. If the embedding is leaked, a huge amount about the content of the photo is revealed. The breed of dog. The color of the grass. The *vibe*. If the best match is leaked, the server knows we likely have a photo of a golden retriever. If the cluster is leaked... well it's an animal of some sort. Apple chose to make some privacy sacrifice for the sake of performance, opting for a technique called differential privacy.

Apple uses an [ohttp](https://www.rfc-editor.org/rfc/rfc9458) anonymization network operated by a 3rd party to proxy requests to Wally. This means that it is impossible to know what device a specific request comes from — it all blends together. In addition, the following mitigations are put in place:

1. Clients issue a number of fake queries, then discard the result.
2. Queries are clumped together by "epoch". Within each epoch, a fixed number of users make queries, and their queries are processed at the end of the epoch. The queries are also sent in a random order at random times, hopefully eliminating timing side channels.

[Jeff Johnson](https://lapcatsoftware.com/articles/2025/1/1.html) rightfully notes that this scheme is still somewhat flawed:

> The two hops, the two companies, are already acting in partnership, so what is there technically in the relay setup to stop the two companies from getting together—either voluntarily or at the secret command of some government—to compare notes, as it were, and connect the dots?

### Hiding metadata

Metadata is our third leak. The solution is really quite simple. Instead of querying a cluster for the metadata at one index, the cluster returns the metadata for *all* indexes stored in that cluster.

> [[PenPen]]'s Note: This seems like a lot of data the client is getting anyway. I don't blame you for questioning if the server is actually needed. The thing is, the stored vectors that are compared against are by far the biggest storage user. Each vector can easily be multiple kilobytes. The paper discusses a database of 35 million entries divided across 8500 clusters.

If the metadata is too big, the same techniques detailed in this article can be used for private information retrieval instead of private nearest neighbor search, which is what we've focused on up till this point.
## Discussion

Before I go any further, I want to make it clear that I am just a hobbyist, not any sort of an expert on this subject matter. I first learned of homomorphic encryption while reading Jeff Johnson’s recent “[Apple Photos phones home on iOS 18 and macOS 15](https://lapcatsoftware.com/articles/2024/12/3.html)” and [later](https://lapcatsoftware.com/articles/2024/12/4.html) [posts](https://lapcatsoftware.com/articles/2025/1/1.html), and what precedes is 10 or so hours worth of research. I do not contest anything that he wrote.

> One natural way of understanding privacy is as synonymous with secrecy. According to this interpretation, if my data is private, then nobody except me can read my data [...] The right to privacy can also mean the right to private *ownership*. [...] With Enhanced Visual Search, Apple appears to focus solely on the understanding of privacy as secrecy, ignoring the understanding of privacy as ownership.

I myself, having put in the time to piece together a huge pile of scattered information, have decided I like the feature and will leave it enabled. With that being said, technical understanding is no substitute for consent, which should have been requested by Apple along with a proper explanation.

!["What happens on your iPhone, stays on your iPhone."](/assets/Pasted%20image%2020250109113847.png)

Apple once said that "What happens on your iPhone, stays on your iPhone." Obviously, this is not entirely the case, and it wasn't the case long before Apple began using homomorphic encryption.

::: details A brief tangent about Private Cloud Compute

No doubt, they are putting in the effort. Much more than any other tech company. But they still make sacrifices, like when they decided to offload their most complex AI workloads to their servers in a programme called [Private Cloud Compute](https://security.apple.com/blog/private-cloud-compute/). This entails running computations in an isolated, permissionless and stateless environment, and giving security researchers permission to read the source.

All this sounds good, but how can I be sure that the servers are running the code they say they're running? With homomorphic encryption, this trust isn't needed because an adversarial server wouldn't have anything to steal, but LLMs can't run in this context. If we are expected to know that Private Cloud Compute is indeed private, we must be able to *know* through cryptographic verification that servers we do not control are running code we trust, but how can we know this when the servers can send whatever data they want over the wire? It doesn't mean much that the server *says* it's running commit `f52fbd`, it can say whatever it wants. This is a problem that feels impossible, and apple recognizes this problem:

> There’s no general mechanism to allow researchers to verify that those software images match what’s actually running in the production environment.

And it appears they claim that they've found a solution. In the future, I plan to investigate this claim. But anyway, back to the task at hand. Is homomorphic encryption private? *Something* is leaving your device...

:::

But, what information is *really* leaving your device? There is no trust me bro element. Barring some issue being found in the math or Apple's implementation of it, for the first time the cloud is able to act as a sort of extension to your device and your data, which is an immensely exciting proposition. Apple has managed categorise photos without knowing anything about what they contain. How cool is that.

Had this project came first, before the commoditization of the smartphone and social media, I would've written something about a slippery slope to less and less careful use of the cloud. But we're already living in a world where all our data is up there, not in our hands. This project represents a small step back in the right direction, and I cannot get over how cool it is. I just wish that Apple would be more upfront.

We live in amazing times.

_P.S. If you made it this far, you clearly like math, and if you clearly like math, you'll clearly like my app, [Maculate](https://apps.apple.com/us/app/maculate/id6738711535?ct=https://indiecatalog.app)!_

## 📝 References & Recommended Reading

- [Building Applications with Homomorphic Encryption](https://homomorphicencryption.org/wp-content/uploads/2018/10/CCS-HE-Tutorial-Slides.pdf)
- [Scalable Private Search with Wally](https://arxiv.org/pdf/2406.06761)
- [Homomorphic encryption](https://en.wikipedia.org/wiki/Homomorphic_encryption)
- [A High-Level Technical Overview of Fully Homomorphic Encryption](https://www.jeremykun.com/2024/05/04/fhe-overview/)
- [Katherine E. Stange: Ring learning with errors and rounding](https://www.youtube.com/watch?v=kOEqDAREc-U)
- [Technology is never a substitute for consent](https://lapcatsoftware.com/articles/2025/1/1.html)

[^1]: You may be wondering how this stays private, if all values except one are the same. The encryption function does not necessarily need to be deterministic. That's the noise. It's random.
[^2]: Using K-means clustering. More clusters means more performance, but too many clusters means the wrong cluster can be selected.
