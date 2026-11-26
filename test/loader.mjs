import { resolve as pathResolve, dirname } from 'node:path';
import { existsSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';

const rootDir = pathResolve('.');

function firstExisting(base) {
  for (const candidate of [base + '.ts', base + '.tsx', pathResolve(base, 'index.ts')]) {
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

export async function resolve(specifier, context, nextResolve) {
  // Handle the `@/` path alias from tsconfig.
  if (specifier.startsWith('@/')) {
    const hit = firstExisting(pathResolve(rootDir, specifier.slice(2)));
    if (hit) return nextResolve(pathToFileURL(hit).href, context);
  }

  // Handle extensionless relative imports between TypeScript modules.
  if (specifier.startsWith('./') || specifier.startsWith('../')) {
    const parentDir = context.parentURL
      ? dirname(fileURLToPath(context.parentURL))
      : rootDir;
    const hit = firstExisting(pathResolve(parentDir, specifier));
    if (hit) return nextResolve(pathToFileURL(hit).href, context);
  }

  return nextResolve(specifier, context);
}
