# Introduction to Typescript

![](./images/TS_LOGO.png)

---

# Typescript

* A statically typed `superset` of JavaScript that compiles to plain JavaScript.
  * Any valid JavaScript, is valid Typescript
* TypeScript adds additional developer features to JavaScript that are stripped away at compile time

![](./images/TS_JS.png)

* TypeScript is a static type checker
  * Detects errors in code without running it
* TypeScript does NOT effect the runtime behavior of JavaScript
* To run TypeScript code, we have to convert it to JavaScript FIRST
* The TypeScript to JavaScript compilation process removes all type information
* TypeScript doesn’t provide any additional runtime libraries. There’s no additional TypeScript-specific framework to learn.
* [Should I learn JavaScript or TypeScript first?](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html#learning-javascript-and-typescript)

---

# Prerequisites

* You have built basic web pages or backends with JavaScript
* You have `npm` and `node` installed

---

# Agenda

* [ ] Project Setup
  * create `package.json`
    * `npm init -y`
  * install `typescript` as dev dependency
    * `npm i -D typescript`
  * create / update [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
  * install [`nodemon`](https://www.npmjs.com/package/nodemon) and [`ts-node`](https://www.npmjs.com/package/ts-node)
    * `npm i -D nodemon ts-node`
  * add scripts to `package.json`
    * build, dev, start
* [ ] [Type Annotations](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
* [ ] [Inferred Types](https://www.typescriptlang.org/docs/handbook/type-inference.html#handbook-content)
* [ ] [Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
* [ ] Objects and Interfaces
  * [ ] [Optional Properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties)
  * ["duck typing" or "structural typing"](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#structural-type-system)
    * As long as the object has the same shape, it is considered the same type
* [ ] [Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
* [ ] [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html#handbook-content)
* [ ] How to read / fix errors
  * [ ] [Type assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions)
  * [ ] [@ts-ignore / @ts-nocheck](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check)
  * [ ] [any](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any), [unknown](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown), [never](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type)
* [ ] Generate [Typescript Interfaces](https://quicktype.io/) from JSON / API Responses

# Examples

We'll use project templates for these so we don't have to configure typescript from scratch.

* [ ] Typescript with Express
  * `npx create-express-api --typescript --directory my-api-name`
* [ ] [API contract with express + axios](https://www.jonmellman.com/posts/typescript-for-api-contracts)
* [ ] Typescript with [react](https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets)
  * `npm create vite@latest -- --template react-ts`
* [ ] Typescript with [Vue](https://vuejs.org/guide/typescript/overview.html#definecomponent)
  * `npm create vite@latest -- --template vue-ts`
  * Usage with [composition API](https://vuejs.org/guide/typescript/composition-api.html#typing-component-props)
* [ ] Anything on npm will work (within reason)
  * [ ] [Definitely Typed](https://www.typescriptlang.org/dt/search?search=)
