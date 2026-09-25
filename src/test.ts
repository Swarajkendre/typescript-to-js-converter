import { convertWithBabel, convertFileWithBabel } from './converters/babel-converter';
import { convertWithESBuild, convertFileWithESBuild, convertDirectoryWithESBuild } from './converters/esbuild-converter';

// Example 1: Convert TypeScript string with esbuild
async function example1() {
  console.log('\n=== Example 1: esbuild - Convert TS string ===');
  const tsCode = `
    interface User {
      name: string;
      age: number;
    }

    const user: User = {
      name: "John",
      age: 30
    };

    console.log(\`User: \${user.name}, Age: \${user.age}\`);
  `;

  const result = await convertWithESBuild(tsCode, { target: 'es2020' });
  console.log('Input TypeScript:');
  console.log(tsCode);
  console.log('\nOutput JavaScript:');
  console.log(result.code);
}

// Example 2: Convert TypeScript string with Babel
async function example2() {
  console.log('\n=== Example 2: Babel - Convert TS string ===');
  const tsCode = `
    interface Product {
      id: number;
      name: string;
      price: number;
    }

    class Store {
      products: Product[] = [];

      addProduct(product: Product): void {
        this.products.push(product);
      }

      getTotal(): number {
        return this.products.reduce((sum, p) => sum + p.price, 0);
      }
    }

    const store = new Store();
    store.addProduct({ id: 1, name: "Laptop", price: 1000 });
  `;

  const result = await convertWithBabel(tsCode, { target: 'es2020' });
  console.log('Input TypeScript:');
  console.log(tsCode);
  console.log('\nOutput JavaScript:');
  console.log(result.code);
}

// Example 3: Convert with minification
async function example3() {
  console.log('\n=== Example 3: esbuild - Minified output ===');
  const tsCode = `
    const greet = (name: string): string => {
      return \`Hello, \${name}!\`;
    };

    console.log(greet("World"));
  `;

  const result = await convertWithESBuild(tsCode, { minify: true });
  console.log('Input TypeScript:');
  console.log(tsCode);
  console.log('\nMinified Output:');
  console.log(result.code);
}

// Example 4: Convert to ES5 (older browsers)
async function example4() {
  console.log('\n=== Example 4: esbuild - Target ES5 ===');
  const tsCode = `
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map((n: number) => n * 2);
    console.log(doubled);
  `;

  const result = await convertWithESBuild(tsCode, { target: 'es5' });
  console.log('Input TypeScript:');
  console.log(tsCode);
  console.log('\nES5 Output (for older browsers):');
  console.log(result.code);
}

// Run all examples
async function runExamples() {
  try {
    await example1();
    await example2();
    await example3();
    await example4();
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

runExamples();
