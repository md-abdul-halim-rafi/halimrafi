# Project status, private

Not published. Only `public/` is served, so this file, the brief and the handoff
never reach the site. Keep it that way.

Last updated: 2026-09-06 (refinement pass)

## Missing assets and evidence

The short list. Everything here is blocked on material only Rafi can supply.

| Needed | What it unblocks | Where it goes |
|---|---|---|
| Public email address | Every contact control on the site. The invitation is currently omitted entirely rather than pointing somewhere useless. | `src/lib/site.ts`, `email` |
| Verified profile URLs | The profile row on About | `src/lib/site.ts`, `profiles` |
| Octolane product screenshot or short recording | A real product view in the opening section. No placeholder is rendered in the meantime. | New section beside the intro |
| Confirmed Octolane responsibilities | Expanding the scope paragraph past what the title alone supports | `content.ts`, `octolane.responsibility` |
| Personal photograph | An image on About. No empty frame is rendered. | About page |
| Production record for the reveal behaviour: change record, before and after recordings, confirmed authorship | Any claim that this behaviour is live at Octolane, and a real contribution claim | Case study `role` and a new section |
| A shipped change with defensible dates: problem identified, first usable version, release, scope, collaborators | The delivery-speed account. Omitted entirely rather than estimated. | New section on the case study |
| Any measured readability or latency finding | Turning the coherence hypothesis into a result | Case study, closing section |
| Mainly Coding: original screens, dates, acquisition record | A second chapter with a real artifact | Homepage record row |

## Refinement pass, 2026-09-06

**The contents rail overlapped the demo by a constant 128px at every width.**
Both were centred on the viewport, so no stacking order or opaque backing would
have fixed it. The article now runs on one grid where the rail is a real column;
the wide figure centres on the content column instead of the page. Measured zero
overlap at 1280, 1440 and 1536, across fifteen scroll positions with both
disclosures open. Below 1280 the rail is not rendered, so it contributes nothing
to the tab order.

**Typography split.** Instrument Serif is now display only. Every heading under
it is Inter at 600: "Octolane AI" at 32px, the case-study card and "Mainly
Coding" at 22px, article section headings at 23px. The condensed serif at those
sizes was the thing that read as narrow.

**Drop cap removed.** It was a high-contrast serif capital against an Inter
body, which read as borrowed rather than designed, and holding its baseline
across widths and font-load states needed a measuring pass on every resize. The
lede now carries the opening through scale. LedeCap and its CSS are deleted
rather than left dormant.

**Article alignment.** The opening and the body were on different left edges
because each block centred inside the column. Everything now shares one edge:
title, summary, metadata, lede, headings and the figure all begin at the same x.

**Background.** Concentric rings had no relationship to anything on the page.
They are replaced by rows of fragments that drift in scattered and settle into
aligned lines, which is the featured decision drawn as geometry. Same gating as
before: tab visibility, intersection, reduced motion, with cleanup. The still
frame is drawn part way through the cycle so the composition reads as finished.

**Controls.** Cards now lift with the same shadow grammar as the pills but
without scale, which would blur their text. Touch pointers get a 44px control
height. Focus rings are keyboard only. Anchor targets carry scroll-margin so
they do not land under the floating nav, whose contrast was raised.

**Demo.** After completion the control reads "Play again", and the header
carries a status chip reading Waiting, Playing, Paused or Complete. The two
panes stack below 1024 rather than squeezing two narrow columns onto a tablet.

## Claims corrected in this pass

- Word-level reveal no longer claims to solve incomplete markup. Buffering to a
  word boundary and withholding unclosed markers are now described as separate
  concerns, with the reason a word-level reveal still leaks a `**`.
- The reservation claim is qualified beside itself: it holds because the fixture
  is scripted and the finished record can be measured in advance, and the
  prototype does not solve a real result of unknown size.
- "The alternative I rejected" is now "An alternative".
- The 520ms figure is described as a property of the scripted fixture, measured
  from the start of playback, not of any deployed system.
- The determinism claim now says what the tests sample rather than implying a
  proof. Those tests were run: 11 pass.

## Earlier redesign, same day

Direction changed from warm editorial paper to an instrument surface: cool
graphite stage, hairline geometry, technical annotations in mono. Reference was
`octolane-org/octolane.com` at commit 6a693021d, which is the revision in
/Users/rafi/Desktop/Octolane/octolane.com.

- Type: Instrument Serif for display, Inter for reading, Geist Mono for
  annotation. Replaces Newsreader plus Geist Sans.
- One token file drives colour, motion, radii, shadow and type. Components do
  not invent their own values.
- Control grammar ported in principle, not copied: icon column opens 0fr to 1fr
  over 300ms, the icon focuses in after 130ms, neighbours step aside 6px, rest
  shadows sit at zero alpha so they animate rather than appear, and departures
  use a longer centred curve than arrivals.
- Canvas graticule behind the opening, gated on tab visibility, intersection and
  reduced motion, with cleanup. The page is complete without it.
- Article: expressive opening on the same stage, self-measuring drop cap, a
  contents rail that is inert while hidden, demo breaking out past the column.

### Two real bugs found and fixed during this pass

1. **The icon column never opened.** `min-width: 0` on the inner span collapsed
   the grid's intrinsic contribution to zero, so the 1fr track resolved against
   a zero-width container. Fixed with `width: max-content` on the span; the
   track still collapses at rest because it is sized 0fr.
2. **`filter: blur(0)` was minified to the invalid `filter: blur()`** by
   Lightning CSS, which the browser then dropped. Changed to `filter: none`,
   which interpolates the same way and survives minification.

### Not verified

Hover, focus and press transitions could not be confirmed at runtime. The
browser pane intermittently stops compositing, and while it is hidden
`requestAnimationFrame` never fires, so CSS transitions do not advance and every
measurement reads its start value. The rules were confirmed present and correct
in the served stylesheet, and the layout-driven part of the reveal (the column
opening to 16px) was measured working. The transition timings themselves need a
look in a real browser.

`prefers-reduced-motion` still could not be toggled at OS level. The override
block is confirmed last in the emitted CSS with nothing but `@property`
declarations after it, so no later rule can reintroduce motion.

## Blocked next-pass priorities

Ranked by the reviewer. Each needs material only Rafi can supply, and none of it
can be substituted with something invented.

1. **One real artifact.** The largest gap, and the reviewer agrees further
   typography work matters less. The receiving code is built and waiting:
   set `productArtifact` in `src/components/site/artifact.ts` with a path under
   `public/`, alt text, a caption and optional annotations, and it renders in the
   Octolane section. While it is null the page shows nothing at all for it, by
   design. Needed: a screenshot or short recording, plus confirmation of which
   parts of it Rafi's contribution actually covers, so annotations stay honest.
2. **Two or three concrete Octolane examples.** The broad sentence about "the
   data we take in, through the model layer" has been deleted rather than
   softened, so the section is now shorter and only claims what the title
   supports. Real decisions with their constraints would slot into `details` in
   `content.ts` alongside the existing entry.
3. **A public email or profile URL.** Verified on 2026-09-06 that supplying one
   makes the footer contact appear on every page and the invitation block appear
   on About, and that removing it takes all of them away again. Nothing else is
   needed for this; it is one value in `src/lib/site.ts`.
4. **A shipped change with real dates.** Problem identified, first usable
   version, release, scope, collaborators. Still omitted rather than estimated.

## Done in this pass

- Added "The alternative I rejected" and "When I would choose differently" to the
  case study: why paragraph-level over word-level, where the wait stops being
  acceptable, and the cases where the approach is wrong (long paragraphs,
  latency-sensitive lookups, code and tables, bursty connections).
- The 520ms cost of grouping quoted in that section is derived from the fixture
  by a test, so the prose cannot drift from the prototype.
- Removed the abstract language from About. No "distance" metaphor, and
  photography is left as a fact rather than turned into a metaphor for software.
- Deleted the vague Octolane scope sentence.

## What is on the site now

- Homepage: introduction, Octolane (purpose, responsibility, scope), one
  inspectable decision, Mainly Coding as a compact record, link to About.
- Case study: problem, prototype, decision, tradeoff, with implementation and
  verification behind disclosures.
- About: short personal page, no duplication of the homepage biography.

## What is simulated

The streaming prototype is the only interactive element and it is entirely
simulated. Local fixture in `src/demo/fixtures.ts`, no model call. Labelled
"Interactive prototype using simulated data" in its own header and again in the
case study's closing section. The account "Northwind Logistics" is fictional.
`WIDGET_WAIT_LIMIT_MS` (2400ms) is a demo setting, not a measurement.

## Claims audited on 2026-09-06

| Claim | Resolution |
|---|---|
| "Only one of them is under our control" | Rewritten to say exactly which part: we do not choose when pieces arrive, only when to show what has arrived. |
| "Nothing moves when the result lands" | Was false. The pending slot sized itself to its own text, so the record displaced content when it resolved. Fixed: the slot now renders the finished record invisibly underneath to reserve its true height. Verified in the browser, footer Y identical at 1694px before and after resolution. Claim is now accurate. |
| "Duplicated or interleaved text is unrepresentable" | Overclaim removed. Replaced with what the tests actually establish: the same elapsed value always produces the same output, checked by sampling out of order and after a rewind, and described as a property of the current model. |
| "A much larger amount of perceived coherence" | Now stated as a design hypothesis with no measurement behind it. |
| Role: "Design and implementation" | Now "Prototype designed and built for this site", with the prototype-versus-production distinction stated once in the closing section. |

## Not done, and why

- No deployment, no DNS, no domain connection.
- No delivery-speed timeline. No records supplied, and estimating one would be
  inventing it.
- Only one inspectable decision. A second needs either the confirmation-flow
  evidence or a decision to build another labelled prototype.
- `prefers-reduced-motion` not exercised at the OS level. The browser tooling
  here cannot toggle it. The resting state is static, nothing autoplays, and the
  reduce rule is present in the served stylesheet (verified), but the setting
  itself was not flipped.
- At a 320px viewport the two comparison panes total slightly more than one
  screen. No horizontal overflow at any width. Fits comfortably at 390px.
