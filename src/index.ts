export { convertWithBabel, convertFileWithBabel } from './converters/babel-converter';
export { convertWithESBuild, convertFileWithESBuild, convertDirectoryWithESBuild } from './converters/esbuild-converter';

// Main API for programmatic usage
import { convertWithBabel } from './converters/babel-converter';
import { convertWithESBuild } from './converters/esbuild-converter';

export async function convertTypeScript(
  code: string,
  tool: 'babel' | 'esbuild' = 'esbuild',
  options: any = {}
): Promise<string> {
  if (tool === 'babel') {
    const result = await convertWithBabel(code, options);
    return result.code;
  } else {
    const result = await convertWithESBuild(code, options);
    return result.code;
  }
}

export default convertTypeScript;
