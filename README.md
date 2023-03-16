# sample-code

This repository contains sample code making use of TypeScript OSS's open source projects.

These include examples for at least [react-bindings](https://www.npmjs.com/package/react-bindings) and [react-waitables](https://www.npmjs.com/package/react-waitables), but for a complete listing of our open source projects, see [TypeScript OSS](https://github.com/TypeScript-OSS).

Each sub-folder of the "samples" folder includes a project that can be installed and run independently.

The general pattern for use of a sample project is:

- `cd samples/<project>`
- `yarn install`
- `yarn start`

## Sample Projects

- react-bound-html-input - Demonstrates several ways to use bindings with otherwise standard HTML inputs.  However, the same basic techniques can also be applied to other inputs, including things like Material-UI TextFields.
- react-validated-form - Demonstrates the use of field, form, and compound validators.
- react-waitable-color-mixer - Demonstrates using waitables to download data (named colors in this example, locking waitables until they're needed, deriving values from waitable and bindings, and creating a dynamic UI putting it all together.
