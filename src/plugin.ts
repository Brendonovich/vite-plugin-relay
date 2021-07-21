import type { Plugin } from 'vite'
import { transformAsync, transformFromAstAsync } from '@babel/core'

export default {
  name: 'vite:relay',
  async transform(src, id) {
    let code = src
    if (/.(t|j)sx?/.test(id) && src.includes('graphql`')) {
      const result = await transformAsync(src, {
        plugins: [
          [
            'relay',
            {
              eagerESModules: true,
            },
          ],
        ],
        code: true,
      })

      let count = 0

      const otherResult = await transformFromAstAsync(result!.ast!, undefined, {
        plugins: [
          function cleanup() {
            return {
              visitor: {
                ImportDeclaration(path: any) {
                  if (
                    path.node.source.type === 'StringLiteral' &&
                    path.node.source.value.endsWith('.graphql')
                  ) {
                    path.node.source.value = path.node.source.value.replace(
                      new RegExp('.graphql$'),
                      '.graphql.js'
                    )
                  }
                },
                ExportDefaultDeclaration(path: any) {
                  if (count === 1) path.remove()
                  else count++
                },
              },
            }
          },
        ],
      })

      if (!otherResult?.code)
        throw new Error('vite-plugin-react Failed to build')
      code = otherResult.code
    }

    return {
      code,
      map: null,
    }
  },
} as Plugin
