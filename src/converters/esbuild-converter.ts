import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

interface ESBuildOptions {
  target?: 'es5' | 'es2015' | 'es2020' | 'esnext';
  minify?: boolean;
  sourceMap?: boolean;
  format?: 'iife' | 'cjs' | 'esm';
}

export async function convertWithESBuild(
  tsCode: string,
  options: ESBuildOptions = {}
): Promise<{ code: string; map?: string }> {
  const {
    target = 'es2020',
    minify = false,
    sourceMap = false,
    format = 'esm'
  } = options;

  try {
    const result = await esbuild.transform(tsCode, {
      loader: 'ts',
      target: target,
      minify: minify,
      sourcemap: sourceMap ? 'inline' : false,
      format: format,
      jsx: 'transform'
    });

    return {
      code: result.code,
      map: sourceMap ? result.map : undefined
    };
  } catch (error) {
    throw new Error(`ESBuild compilation failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function convertFileWithESBuild(
  inputPath: string,
  outputPath: string,
  options: ESBuildOptions = {}
): Promise<void> {
  try {
    const tsCode = fs.readFileSync(inputPath, 'utf-8');
    const { code, map } = await convertWithESBuild(tsCode, options);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, code, 'utf-8');

    if (map && options.sourceMap) {
      fs.writeFileSync(`${outputPath}.map`, map, 'utf-8');
    }

    console.log(`✓ Converted: ${inputPath} → ${outputPath}`);
  } catch (error) {
    console.error(`✗ Failed to convert ${inputPath}:`, error instanceof Error ? error.message : String(error));
    throw error;
  }
}

export async function convertDirectoryWithESBuild(
  inputDir: string,
  outputDir: string,
  options: ESBuildOptions = {}
): Promise<void> {
  try {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Read all TypeScript files
    const files = fs.readdirSync(inputDir, { recursive: true });
    const tsFiles = files.filter((file) => String(file).endsWith('.ts') || String(file).endsWith('.tsx'));

    for (const file of tsFiles) {
      const inputPath = path.join(inputDir, String(file));
      const relativePath = path.relative(inputDir, inputPath);
      const outputPath = path.join(outputDir, relativePath.replace(/\.tsx?$/, '.js'));

      await convertFileWithESBuild(inputPath, outputPath, options);
    }

    console.log(`✓ Converted ${tsFiles.length} files from ${inputDir} → ${outputDir}`);
  } catch (error) {
    console.error('✗ Directory conversion failed:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: esbuild-converter <input.ts|dir> <output.js|dir> [--minify] [--sourcemap] [--target es5|es2015|es2020]');
    process.exit(1);
  }

  const inputPath = args[0];
  const outputPath = args[1];
  const minify = args.includes('--minify');
  const sourceMap = args.includes('--sourcemap');
  const targetArg = args.find((arg) => arg.startsWith('--target'));
  const target = (targetArg?.split('=')[1] || 'es2020') as 'es5' | 'es2015' | 'es2020' | 'esnext';

  const isDir = fs.statSync(inputPath).isDirectory();

  if (isDir) {
    convertDirectoryWithESBuild(inputPath, outputPath, { minify, sourceMap, target })
      .catch(() => process.exit(1));
  } else {
    convertFileWithESBuild(inputPath, outputPath, { minify, sourceMap, target })
      .catch(() => process.exit(1));
  }
}
