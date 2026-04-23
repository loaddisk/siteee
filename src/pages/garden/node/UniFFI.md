---
in: blog
date: 2023-12-20
title: Bridging the Gap Between Swift & Rust
description: Using UniFFI to call rust functions from my SwiftUI codebase
tags: [rust, app, development, swift]
is: statically linking
---

Hi all! My app, [[Love Your Music]], needs a cross platform backend shared between a swift and kotlin codebase. UniFFI has been an absolute joy to use, but unfortunately the setup process is a little bit poorly documented. No problem! I got you <3. This tutorial assumes you have a file structure like

```
app/
app.xcodeproj/
app.xcworkspace/
myCrate/
  cargo.toml
  src/
    lib.rs
```

Of course, you can diverge from this if so needed.

<sup>it also assumes you are on Mac. I don't know why you'd be here if you aren't</sup>

> [[PenPen]]'s note: **Why Rust × Swift?** A common use for rust is FFI, which we are actually doing right here anyway! But if you can FFI to Swift, you can FFI to anywhere. Cross platform apps writen in native code (e.g. apps with a Kotlin counterpart) benefit greatly from shared libraries and UniFFI. In addition, the Rust community is significantly larger, and so it's very likely you'll find crates that are more battletested, more featureful, higher performance, more documented, or even nonexistant in Swift.

## Converting a rust codebase to UniFFI

Add UniFFI to your crate

```toml
[dependencies]
uniffi = { version = "0.25.3", features = [ "cli" ] }

[build-dependencies]
uniffi = { version = "0.25.3", features = [ "build" ] }
```

A rust codebase like

```rust
enum Fruits {
  Watermelon,
  Cranberry,
  Cherry
}

struct Person {
  name: String,
  age: u8
}

fn add(a: u32, b: u32) -> u32 {
    a + b
}
```

Can be converted to

```rust
#[derive(uniffi::Enum)]
enum Fruits {
  Watermelon,
  Cranberry,
  Cherry
}

#[derive(uniffi::Record)]
struct Person {
  name: String,
  age: u8
}

#[uniffi::export]
fn add(a: u32, b: u32) -> u32 {
    a + b
}
```

Also, somewhere in `lib.rs` at the *top level* (not inside a function) you need to write

```rust
uniffi::setup_scaffolding!();
```

## Building & Adding UniFFI to your Swift codebase

This configures UniFFI to generate libraries it understands. Unfortunately, as part of this build the Swift and header code is not generated. You might be inclined to do this in `build.rs`, but I don't reccomend this because as of writing Cargo does not support post-build code, and to generate correct swift code we need correct libraries. Instead, create a binary for a small CLI by making a new file named `uniffi-bindgen.rs` (I put this outside of the `src` directory, and inserting the following:

```rs
fn main() {
    uniffi::uniffi_bindgen_main()
}
```

Don't forget to add it to your `cargo.toml`!

```toml
[[bin]]
name = "uniffi-bindgen"
path = "uniffi-bindgen.rs"
```

Great, we now have a binary that basically proxies UniFFI. How do we call it?

Create `build.sh` in the top level of the project's fs (on the same level as your app and crate folders), and write the following:

```bash
cd <myCrate>

NAME="<myCrate>"
HEADERPATH="out/${NAME}FFI.h"
TARGETDIR="target"
OUTDIR="../<myApp>"
RELDIR="release"
STATIC_LIB_NAME="lib${NAME}.a"
NEW_HEADER_DIR="out/include"

cargo build --target aarch64-apple-ios --release
cargo run --bin uniffi-bindgen generate --library target/aarch64-apple-ios/release/lib${NAME}.a --language swift --out-dir out
```

What this code does is build the crate for iOS and generate the code we need. As a result of this, you should get a

- Static library
- Module map
- Header file
- Swift file with pregenerated call bindings

But how do we include this in XCode? We should use a *framework*, which removes the ambiguity about how code is bundled in the app and allows you to add multiple targets (eg mac) in the future.

To do this, let's append to the build script the following

```bash
mkdir -p "${NEW_HEADER_DIR}"
cp "${HEADERPATH}" "${NEW_HEADER_DIR}/"
cp "out/${NAME}FFI.modulemap" "${NEW_HEADER_DIR}/module.modulemap"

rm -rf "${OUTDIR}/${NAME}_framework.xcframework"

xcodebuild -create-xcframework \
    -library "${TARGETDIR}/aarch64-apple-ios/${RELDIR}/${STATIC_LIB_NAME}" \
    -headers "${NEW_HEADER_DIR}" \
    -output "${OUTDIR}/${NAME}_framework.xcframework"

rm -rf "${NEW_HEADER_DIR}"
```

What this does is generate a folder with all the components we just generated, except for the swift binding code, and generate a framework from that folder, insert it into our iOS project, and then remove that folder. Clean!

Run the script...

> **[[PenPen]]'s note:** If you don't have a folder called `out` with 3 files, please run the command *again*. The double run is only needed this one time.

Got all that? Switch to XCode, and... Nothing yet? We need to tell XCode what we want to include! Add the framework by finding said framework within finder and clicking "open"

![image](https://gist.github.com/assets/51836263/851d508c-b90c-45cb-ba49-9226be2a7d18)

Also, we need to add the Swift file we just generated to the project.

<img width="1767" alt="image" src="https://gist.github.com/assets/51836263/18c4d028-8fc7-4fa2-aea6-1338d3221561">

XCode should automatically add it to the global namespace, and you can call all the functions, use all the types, and just generally have a swell time *as if* you wrote native swift code. Build, and watch the magic! Every time you update the rust code, just rerun `build.sh`

<img width="1175" alt="image" src="https://gist.github.com/assets/51836263/91f7c3d8-818d-48db-bd06-3fa85258e92a">

## PS: Reducing size

```toml
[profile.release]
# 31mb -> 7.1mb
lto = "fat"
# these two strip off another 0.3mb
panic = "abort"
strip = true
```

## PS: Additional Targets

To run in the simulator, you need another build, which is

```sh
cargo build --target <targetName> --release
cargo run --bin uniffi-bindgen generate --library target/<targetName>/release/lib${NAME}.a --language swift --out-dir out

# Add the following arguments:

-library "${TARGETDIR}/<targetName>/${RELDIR}/${STATIC_LIB_NAME}" \
-headers "${NEW_HEADER_DIR}" \

xcodebuild -create-xcframework \
    -library "${TARGETDIR}/aarch64-apple-ios/${RELDIR}/${STATIC_LIB_NAME}" \
    -headers "${NEW_HEADER_DIR}" \
    # Here
    -output "${OUTDIR}/${NAME}_framework.xcframework"
```

Targets particularaly relevant to me is:

- iOS Sim on M1 Macs: `aarch64-apple-darwin`
- M1 Mac: `aarch64-apple-darwin`
- Mac Catalyst M1: `aarch64-apple-ios-macabi` *Note: This does not work as of writing because Rust support for this is bad*

If you don't have a mac I believe you `s/aarch64/x86_64/` (with the exception of the native iOS target because that's native iOS)

::: details Acknowledgements

- [This article provided the original script I based mine off](https://www.strathweb.com/2023/07/calling-rust-code-from-swift/)
- [The UniFFI tutorial is helpful, to some degree](https://mozilla.github.io/uniffi-rs/swift/overview.html)
- [Alexandre Hanot chronicled his own journey, with reference to mine](https://forgen.tech/en/blog/post/building-an-ios-app-with-rust-using-uniffi)

:::
