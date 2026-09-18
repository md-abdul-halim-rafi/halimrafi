Articles live here as MDX, one file per slug.

Each file exports a `meta` object and then the body:

  export const meta = {
    slug: 'the-url-segment',
    title: 'The title as written',
    description: 'One sentence.',
    date: '2026-01-31',        // publication
    updated: '2026-02-04',     // optional, only for a material revision
    status: 'published',       // or 'draft'
    sections: ['First', 'Second'],  // optional, drives the reading rail
  }

Then register it in src/lib/writing.ts. Nothing else needs changing: the list
on the story page, the archive at /writing, the article route and the sitemap
all read from that registry.

A file with `status: 'draft'` is invisible everywhere public. It is excluded
from the list, from the archive, from the sitemap, and its own URL returns 404.

Never write a title, description, date or body that was not supplied.
