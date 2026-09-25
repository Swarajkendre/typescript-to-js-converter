# TypeScript to JavaScript Converter

A powerful Node.js tool to convert TypeScript to plain JavaScript using **Babel** or **esbuild**. Perfect for browser compatibility!

## Features

✨ **Two Conversion Tools:**
- **Babel** - Great browser compatibility, excellent polyfill support
- **esbuild** - Ultra-fast, minimal dependencies, great for bundling

✅ **Multiple Target Options:**
- ES5 (for old browsers)
- ES2015 (ES6)
- ES2020
- ESNext

🎯 **Advanced Options:**
- Minification
- Source maps
- Single file or directory conversion
- Programmatic API & CLI

## Installation

```bash
npm install
```

## Usage

### 1. **CLI - esbuild Converter**

Convert a single TypeScript file:
```bash
npm run esbuild-convert input.ts output.js
```

Convert with options:
```bash
npm run esbuild-convert input.ts output.js --minify --sourcemap --target=es5
```

Convert entire directory:
```bash
npm run esbuild-convert ./src ./dist --minify
```

### 2. **CLI - Babel Converter**

Convert a single TypeScript file:
```bash
npm run babel-convert input.ts output.js
```

Convert with minification:
```bash
npm run babel-convert input.ts output.js --minify --sourcemap
```

### 3. **Programmatic API**

```typescript
import { convertWithESBuild, convertWithBabel } from './src/index';

// Using esbuild
const result = await convertWithESBuild(tsCode, {
  target: 'es2020',
  minify: true,
  sourceMap: true
});
console.log(result.code);

// Using Babel
const result = await convertWithBabel(tsCode, {
  target: 'es2020',
  minify: false
});
console.log(result.code);
```

### 4. **Run Examples**

```bash
npm run build
npm run test
```

## API Reference

### esbuild Options

```typescript
interface ESBuildOptions {
  target?: 'es5' | 'es2015' | 'es2020' | 'esnext';  // Default: 'es2020'
  minify?: boolean;                                   // Default: false
  sourceMap?: boolean;                                // Default: false
  format?: 'iife' | 'cjs' | 'esm';                   // Default: 'esm'
}
```

### Babel Options

```typescript
interface BabelOptions {
  target?: 'es5' | 'es2015' | 'es2020' | 'esnext';  // Default: 'es2020'
  sourceMap?: boolean;                                // Default: false
  minify?: boolean;                                   // Default: false
}
```

## Examples

### Example 1: Convert TypeScript Interface

**Input (TypeScript):**
```typescript
interface User {
  name: string;
  age: number;
}

const user: User = { name: "John", age: 30 };
console.log(user);
```

**Output (JavaScript - ES2020):**
```javascript
const user = { name: "John", age: 30 };
console.log(user);
```

### Example 2: Convert Classes with Methods

**Input (TypeScript):**
```typescript
class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
console.log(calc.add(5, 3));
```

**Output (JavaScript):**
```javascript
class Calculator {
  add(a, b) {
    return a + b;
  }
}
const calc = new Calculator();
console.log(calc.add(5, 3));
```

### Example 3: Convert to ES5 (Old Browsers)

**Input (TypeScript with modern syntax):**
```typescript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n: number) => n * 2);
console.log(doubled);
```

**Output (JavaScript - ES5):**
```javascript
var numbers = [1, 2, 3, 4, 5];
var doubled = numbers.map(function(n) {
  return n * 2;
});
console.log(doubled);
```

## Comparison: Babel vs esbuild

| Feature | Babel | esbuild |
|---------|-------|------|
| Speed | Moderate | ⚡ Very Fast |
| Browser Support | Excellent | Good |
| Polyfills | ✅ Built-in | ❌ Manual |
| Configuration | Extensive | Simple |
| Dependencies | Many | Few |
| Use Case | Legacy apps | Modern apps |

## Use Cases

✅ **When to use esbuild:**
- Fast build times
- Modern browser targets (ES2015+)
- Lightweight projects
- CI/CD pipelines

✅ **When to use Babel:**
- Support for old browsers
- Need for polyfills
- Complex transformations
- Large enterprise projects

## Project Structure

```
typescript-to-js-converter/
├── src/
│   ├── index.ts                    # Main entry point
│   ├── converters/
│   │   ├── babel-converter.ts      # Babel implementation
│   │   └── esbuild-converter.ts    # esbuild implementation
│   └── test.ts                     # Examples and tests
├── dist/                           # Compiled JavaScript
├── examples/
│   └── user-manager.ts             # Example TypeScript file
├── package.json
├── tsconfig.json
└── README.md
```

## Development

```bash
# Build TypeScript to JavaScript
npm run build

# Run examples
npm run test

# Run with ts-node (no build needed)
npm run dev
```

## License

MIT

## Author

Swarajkendre

---

**Happy Converting! 🚀**
