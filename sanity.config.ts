import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
if (!projectId) {
  throw new Error(
    'Missing `NEXT_PUBLIC_SANITY_PROJECT_ID`. Create `.env.local` (copy from `.env.example`) and set NEXT_PUBLIC_SANITY_PROJECT_ID to your Sanity project id.'
  )
}

export default defineConfig({
  name: 'minc-pay',
  title: 'MINC Pay',

  projectId,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('MINC Pay')
          .items([
            S.listItem()
              .title('Merchant Applications')
              .child(
                S.documentList()
                  .title('Applications')
                  .filter('_type == "application"')
                  .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Contact Messages')
              .child(
                S.documentList()
                  .title('Messages')
                  .filter('_type == "contactMessage"')
                  .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})
