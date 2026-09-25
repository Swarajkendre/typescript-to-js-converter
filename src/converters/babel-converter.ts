import * as babel from '@babel/core';
import * as fs from 'fs';
import * as path from 'path';

interface BabelOptions {
  target?: 'es5' | 'es2015' | 'es2020' | 'esnext';
  sourceMap?: boolean;
  minify?: boolean;
}

export async function convertWithBabel(
  tsCode: string,
  options: BabelOptions = {}
): Promise<{ code: string; map?: any }> {
  const {
    target = 'es2020',
    sourceMap = false,
    minify = false
  } = options;

  try {
    const result = await babel.transformAsync(tsCode, {
      presets: [
        ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } }],
        '@babel/preset-typescript'
      ],
      sourceMap: sourceMap,
      minified: minify,
      filename: 'file.ts'
    });

    return {
      code: result?.code || '',
      map: sourceMap ? result?.map : undefined
    };
  } catch (error) {
    throw new Error(`Babel compilation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function convertFileWithBabel(
  inputPath: string,
  outputPath: string,
  options: BabelOptions = {}
): Promise<void> {
  try {
    const tsCode = fs.readFileSync(inputPath, 'utf-8');
    const { code, map } = await convertWithBabel(tsCode, options);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, code, 'utf-8');

    if (map) {
      fs.writeFileSync(`${outputPath}.map`, JSON.stringify(map), 'utf-8');
    }

    console.log(`✓ Converted: ${inputPath} → ${outputPath}`);
  } catch (error) {
    console.error(`✗ Failed to convert ${inputPath}:`, error instanceof Error ? error.message : String(error));
    throw error;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: babel-converter <input.ts> <output.js> [--minify] [--sourcemap]');
    process.exit(1);
  }

  const inputPath = args[0];
  const outputPath = args[1];
  const minify = args.includes('--minify');
  const sourceMap = args.includes('--sourcemap');

  convertFileWithBabel(inputPath, outputPath, { minify, sourceMap })
    .catch(() => process.exit(1));
}
