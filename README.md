# halimrafi.com

Personal site for Halim Rafi. Next.js App Router, TypeScript, Tailwind CSS v4,
MDX for case studies. Content is static; client-side code is limited to the
streaming demonstration.

## Commands

```bash
pnpm dev     # http://localhost:3000
pnpm build   # production build
pnpm lint    # eslint
pnpm test    # node --test, covers the demo's projection and fixtures
```

Tests run on Node's built-in runner with no test framework. A small resolve hook
in `scripts/` lets Node follow the extensionless imports the bundler handles.

## Structure

```
src/
  app/                       routes
    page.tsx                 homepage — Direction A (primary)
    about/                   about page
    work/[slug]/             shared case-study template
    review/direction-b/      Direction B, review only (see below)
  components/
    demo/                    streaming demo presentation
    site/                    chrome, homepage compositions, shared copy
    story/                   MDX prose mapping and story parts
  content/work/              case studies (.mdx)
  demo/                      fixtures, projection, replay controller
  lib/
    site.ts                  public identity and contact — single source
    work.ts                  content model and registry
```

## Adding a case study

No page component changes are needed.

1. Create `src/content/work/<slug>.mdx`.
2. Export a `meta` object from it matching `WorkMeta` in `src/lib/work.ts`
   (`slug`, `title`, `summary`, `date`, `status`, `role`, `collaborators`,
   `artifact`, and an optional private `evidence` list).
3. Add one line to `registry` in `src/lib/work.ts`.

Set `status: 'draft'` to keep an entry out of the build; only `published`
entries are routed or listed.

The narrative follows a fixed sequence, written as `##` headings: product
context, the problem, constraints, alternatives, the decision, implementation
detail, verification, what remains uncertain.

Available inside MDX: `<Demo />` (the streaming demonstration) and
`<Aside label="…">` (a marginal note). Both are registered in
`mdx-components.tsx`.

## Editing the demo fixture

Everything the demo replays lives in `src/demo/fixtures.ts`.

- `BASE` is the event stream: `at` is milliseconds from the start. **Keep it in
  chronological order** — the projection stops at the first event in the future.
  `eventsFor` re-sorts after moving the tool result, for this reason.
- `DELAYED_RESULT_AT` is the only value the delayed scenario changes, which is
  what keeps the two scenarios comparable.
- `WIDGET_WAIT_LIMIT_MS` is how long the reserved widget slot waits before it
  says it is late.
- `ACCOUNT_RECORD` is the fictional record the tool returns.

`src/demo/project.ts` turns `(events, elapsed, mode)` into rendered state and is
pure — playback is just advancing `elapsed`. `src/demo/useReplay.ts` schedules
against the timestamps where output can actually change.

## The two demo surfaces

The same fixture and the same projection drive both, through the shared clock in
`src/demo/clock.ts`.

- **`CompactComparison`** (homepage). Two panes at a single telling frame —
  950ms, where the stream has opened a bold span and the closing marker is still
  in flight. One control. It stops at `COMPARISON_END` (1700ms), before the tool
  call, because two panes only read as a comparison if both fit on screen at
  once, which they cannot on a phone if they replay the whole answer.
- **`StreamingDemo`** (case study, via `<Demo />`). The full stream: both modes,
  both scenarios, play / pause / restart, the reserved widget slot and the
  delayed-result behaviour.

Both reserve the height of their finished state before playing, by rendering the
completed output invisibly underneath and laying the live output over the top
(`Reserve` in `ResponseView.tsx`). Nothing scrolls inside either panel and
nothing below them moves while they play. The pending record slot uses the same
technique so it holds the height of the record it is waiting for.

## Contact details

`src/lib/site.ts` is the only place public contact information lives. `email` and
`profiles` are `null`/empty until real values are supplied, and every control
that would use them is omitted rather than rendered dead. Do not put a
placeholder address there.
