# Vite Plugin Relay

Add relay support to your Vite project.

Created with the help of [@Brendonovich](https://github.com/Brendonovich).

## Usage

Add `vite-plugin-relay` and `relay` to your project.

```bash
yarn add react-relay relay-runtime
yarn add -D relay-compiler relay-config vite-plugin-relay
```

Next setup NPM scripts in the `package.json`. One is required for Vite and the other for the Relay Compiler

```json
"scripts": {
  "dev": "vite",
  "relay": "relay-compiler"
},
```
Next setup `relay.config.js` more information about this can be found in the [official relay docs](https://relay.dev/docs/getting-started/installation-and-setup/#set-up-relay-with-a-single-config-file).

Finally add `vite-plugin-relay` to your Vite configuration (`vite.config.ts`).

```typescript
import { defineConfig } from "vite";
import relay from "vite-plugin-relay";

export default defineConfig({
  plugins: [..., relay],
});
```
Now your project is setup to use Relay with Vite!
