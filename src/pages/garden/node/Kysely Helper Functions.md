---
tags:
  - work in public
---

An [`Expression<T>`](https://kysely-org.github.io/kysely-apidoc/interfaces/Expression.html) is the fundamental building block of Kysely. Pretty much all methods accept expressions as inputs. Most internal classes like [SelectQueryBuilder](https://kysely-org.github.io/kysely-apidoc/interfaces/SelectQueryBuilder.html) and [RawBuilder](https://kysely-org.github.io/kysely-apidoc/interfaces/RawBuilder.html) (the return value of the [sql tag](https://kysely-org.github.io/kysely-apidoc/functions/sql-1.html)) are expressions themselves.  

`Expression<T>` represents an arbitrary SQL expression, like a binary expression (e.g. `a + b`), or a function call (e.g. `concat(arg1, ' ', arg2, ...)`). It can be any combination of those, no matter how complex. `T` is the output type of the expression.

To extend Kysely, it is important to understand how it uses Typescript. Methods called on a Kysely instance receive a type internally, and return a refined version of that type. For instance, `.selectFrom("person")` takes the type from `QueryCreator<DB>`, and returns a `SelectQueryBuilder<DB,TB,O>`. The generic `DB` was inherited from the type it was called on, but the value of `TB` is now set to `"person"`. This way, Kysely knows that it currently has access to the person table.

Now, imagine we do a join: `.innerJoin("pet", "owner_id", "person.id")`. The join takes in `SelectQueryBuilder<DB,"person",O>`. It returns `SelectQueryBuilder<DB,"person" | "pet",O>`, so now Kysely lets you access both. Finally, we run a `.select(["first_name", "pet.name as pet_name"])`. This select might return `SelectQueryBuilder<DB, "person" | "pet", { first_name: string; pet_name: string; }`, so now we've extended the rules for what we can access through this process of refinement.

You'll note that, in addition to transforming data, we are transforming types. Each one of these transforms builds upon the context of the last one, and this context is inferred. But now, let's say we want to make a helper function:

```ts
db
	.selectFrom("person") // SelectQueryBuilder<DB,"person",{}>
	.innerJoin("pet", "owner_id", "person.id") // SelectQueryBuilder<DB,"person" | "pet",{}>
	.select(["first_name", "pet.name as pet_name"]) // SelectQueryBuilder<DB, "person" | "pet", { first_name: string; pet_name: string; }

function selectOnlyPetsNamedTim(db) {
	db
		.where("pet.name", "=", "Tim") // we just lost all this context!
}
```

Because we've exited the chain, the context we've established is lost, and this is the crux of what we must do: We must make ourselves responsible for reinstantiating the chain for our function. Now, we *could* type db like this:

```ts
function selectOnlyPetsNamedTim(db: SelectQueryBuilder<DB, "person" | "pet", { first_name: string; pet_name: string; }) {
	// ...
}
```

But this misses the point entirely. We want 