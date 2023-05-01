import { EsbuildTransformOptions, transformWithEsbuild } from 'vite'
import { grants } from './constants.js'
import type { Grants, Transform } from './types.js'

export function removeDuplicates(arr: any): any[] {
  return [...new Set(Array.isArray(arr) ? arr : arr ? [arr] : [])]
}

export async function transform(
  { file, name, loader }: Transform,
  options?: EsbuildTransformOptions
): Promise<string> {
  const { code } = await transformWithEsbuild(file, name, {
    loader,
    minify: true,
    sourcemap: false,
    legalComments: 'none',
    ...options
  })

  return code
}

export function defineGrants(code: string): Grants[] {
  const definedGrants: Grants[] = []

  for (const grant of grants) {
    if (code.indexOf(grant) !== -1) {
      definedGrants.push(grant)
    }
  }

  return definedGrants
}
