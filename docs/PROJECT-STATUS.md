# Project status, private

Not published. Only `public/` is served, so this file, the brief and the handoff
never reach the site. Keep it that way.

Last updated: 2026-09-06 (studio refined)

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

## Studio refined, 2026-09-06

All five photographs are present. The sea lavender frame was re-saved after I
destroyed it, and it is now in the opening.

- **Supporting work.** Mainly Coding is a compact full-width section on the
  shared 280px grid. The experiment has its own full-width section, so the two
  views sit side by side at 576px each on desktop and stack at 350px with their
  labels on mobile. The article link is directly beneath the comparison and the
  prototype caption appears once. No fixed heights: the panes reserve the height
  of the finished answer, so nothing clips and nothing pads.
- **Octolane.** Three sentences beside the cover, from the supplied project
  material: what the product does, the role, and credit to the team. The image is
  labelled "Octolane · Revenue Superintelligence" with a small "Brand artwork"
  label. The sentence explaining it is not the product interface is gone.
- **Captions.** Literal subject names: Sea lavender, Marina, Shoreline,
  Waterfront, Moon. No locations, dates, camera settings or commentary, since
  none were supplied. One credit for the gallery.
- **Viewer.** Darker backdrop at 94%, chrome shrink-wrapped to the picture,
  focus contained, Escape, focus and scroll restored, background locked, and the
  exploration switcher hidden by visibility so it also leaves the tab order.

### Two things caught by verifying rather than assuming

1. **The viewer was scaling images down.** A `w-fit` frame combined with
   `max-h-full` on a flex child created a circular constraint, and a 5152x7728
   photograph rendered at 267x401 in a 900px viewport. Switched to `inline-flex`
   and capped the image alone: now 515x772, 86% of viewport height, undistorted.
2. **`statice-boardwalk.jpg` served the wrong picture.** That path had held one of
   my earlier test stand-ins, so the optimizer and browser kept returning the
   brand image for it. Renamed to `sea-lavender.jpg`. This is the third path
   poisoned this way, all by my own testing; the README now records that test
   content must never be written under `public/`.

## Studio rebuilt on the real photographs, 2026-09-06

Four photographs landed in `public/photographs` at 22:02, part way through this
pass. Everything below is built on them.

### What the files actually contained

The supplied filenames did not match their subjects. Each file was opened before
being captioned:

| supplied name | actual subject | renamed to |
|---|---|---|
| riprap-water.jpg | the marina, masts and breakwater | marina-breakwater.jpg |
| marina-dusk.jpg | riprap meeting still water | riprap-still-water.jpg |
| pier-shed.jpg | pier shed and railings (correct) | pier-shed-railings.jpg |
| half-moon.jpg | half moon in a pink sky (correct) | half-moon-sky.jpg |

Renaming also cleared a stale image cache: those two paths had briefly served
other content during earlier testing, and the optimizer kept returning it.

### EXIF rotation

The files are 7728x5152 in their JPEG headers and display portrait, because the
camera records the rotation separately and browsers honour it. The dimension
reader now parses the EXIF orientation tag and swaps the axes for the quarter
turn cases, so the reserved box matches what renders and the page does not jump
on load. Verified: three report 5152x7728 portrait, the moon reports 7728x5152
landscape.

### I overwrote a file

At 22:03, one minute after the four arrived, I wrote a layout stand-in to
`public/photographs/statice-boardwalk.jpg`, a name from my own README. If a fifth
photograph had been saved under that name it was overwritten. The stand-in has
been deleted. The sea lavender photograph is not on disk and needs saving again.

The mistake was writing test content into the directory that holds real assets,
using a filename I had told him to use. Stand-ins belong outside `public/`.

### The composition

1200px content width, 280px introduction column, the rest for the visual
composition. Inside it the Octolane cover and one photograph sit side by side
weighted 1.9 to 1. The cover is capped at 35rem so it cannot balloon when the
photograph is absent, which is what made it oversized before. A portrait
photograph goes beside the cover; a landscape one would go beneath it, since a
wide image in a side column loses its subject.

Measured at 1440x900: cover 522x274 at x=465, photograph 276x414 at x=1020, both
inside the first screen. Supporting work is a balanced two column row below with
nothing empty beside it, and the prototype's own caption is the only one, with
the case study link directly beneath its preview.

Expanded views: the product fills the width, a photograph is fitted whole rather
than scrolled. Both restore focus and scroll on close.

## Studio rebuilt around the assets, 2026-09-06

### Asset audit, done first

Searched `public/`, the whole project, and the home directory for images
modified in the last three days. One usable image exists:

- `public/octolane/octolane-revenue-superintelligence.jpg`, 2400x1260, 1.09MB.
  Opened and inspected: it is Octolane's brand image, the wordmark
  "Superintelligence for human judgment" over an iridescent gradient with the
  mark above and mono marginalia. **It is not a product interface screenshot.**
  Filename was not trusted; the file was opened.

Still absent from disk: all five photographs, and any screenshot of the Octolane
interface. Photographs attached to a conversation do not become files, so they
cannot be read or served. They were not substituted with anything.

### The rebuild

The composition is set by the product image's 1.9:1 proportion: it takes a wide
band across the upper right, which puts the lockup in the narrow column beside
it. Product and photography have deliberately different treatments. The product
sits in a hairline frame with a mono caption, because an interface artifact reads
as a specimen and wants an edge. A photograph sits on the paper with no frame and
a body-face caption, because framing a photograph like a screenshot flattens it.
Neither is inside a rounded white card.

The image is shown uncropped. Its focal point is centred type, so a detail crop
would cut the wordmark the caption names.

The text drawer is replaced by an image-first expanded view: sized to its
content rather than full height, growing from the trigger's centre so the
expansion belongs to what was clicked, with Escape, focus restore and scroll
restore. Verified: scroll 260 to 260, focus back on the trigger, transform origin
at the trigger's centre.

Supporting work is small underneath: a one-line Mainly Coding entry with the
acquisition fact and no empty tile, and the prototype as a compact experiment
labelled "Interactive prototype using simulated data".

Removed from this page: the positioning slogan and the instructional line
"Three things I have worked on...". Verified absent from the rendered output.

### Fixed while verifying

- The secondary "Open full image" control was an 11px line of text. It now has a
  40px hit area.
- `quality={92}` on the expanded image was silently ignored: Next 16 requires the
  value in `images.qualities`. The prop was removed rather than left implying
  something it did not do. At the requested `w=3840` the default quality is ample.
- A `naturalWidth` reading suggested the expanded image was upscaled. It was not:
  `naturalWidth` is density-corrected when srcset uses `w` descriptors, and
  `currentSrc` showed `w=3840` at dpr 2 for a 1204px render.

### Not delivered this pass

Item 4, photography presence, and the expanded-photograph screenshot. Both need
the files. The code path is built and was verified end to end with temporary
stand-ins, which were then deleted.

## Assets supplied, 2026-09-06

**Public email is live.** `mdabdulhalimrafi@gmail.com` is set in
`src/lib/site.ts`. The footer contact appears on every page and the About
invitation with its Get in touch action is now rendered.

**Octolane image is in.** Copied `og-image-v3.jpg` from the company repo to
`public/octolane/octolane-revenue-superintelligence.jpg` (2400x1260) and wired it
to the homepage work section. It is captioned as Octolane's brand image for
Revenue Superintelligence and explicitly says it shows how the company presents
itself rather than the product interface, because that is what it is: the mark
and the positioning, not a screenshot of the UI. The figures printed in its
margins are Octolane's own marketing copy and are not repeated as claims
anywhere on this site.

**Photography is built and waiting for files.** `src/lib/photographs.ts` holds a
manifest of five entries with alt text and captions already written from the
photographs supplied in conversation. `availablePhotographs()` filters to the
files that exist under `public/photographs`, so dropping files in makes them
appear and a missing one is skipped rather than leaving a gap. Verified with
temporary stand-ins across About, Studio and Editorial, then removed; the empty
path renders no section, no frame and no broken image.

### Still needed

| Needed | Why it is not done |
|---|---|
| The five photograph files on disk | They were attached to the conversation, which does not put them on the filesystem, and I will not fabricate image files. Drop them in `public/photographs/` with the names listed in the README there and they appear with the captions already written. |
| Exact LinkedIn profile URL | "My LinkedIn profile" was supplied but not the address. A guessed profile URL is worse than no link, so `site.profiles` stays empty. One line in `src/lib/site.ts` once the URL arrives. |
| A real Octolane product screenshot | The OG image is brand material. A view of the actual interface would let Studio's largest tile and Editorial's featured figure carry the product rather than the prototype. |
| Confirmed Octolane responsibilities | The contribution line is still limited to what the title supports. |
| Mainly Coding screens or records | Its entry is text only in every direction. |

No delivery dates, metrics or outcomes anywhere, because no records establish
them.

## Visual explorations, 2026-09-06

Three directions built as local routes for comparison. The live site is
untouched apart from scoped additions to globals.css: per-direction palettes
under `[data-explore]` and the component styles those directions use. Nothing on
the live pages links to them and all three are noindex, nofollow.

- `/explorations/studio` — asymmetric field of unequal tiles; a tile opens into
  a detail panel and returns focus to itself.
- `/explorations/workbench` — compact index driving a large preview; a real
  tablist with roving tabindex and arrow, Home and End keys.
- `/explorations/editorial` — masthead, one large figure, small supporting
  entries; numbered marks expand one note at a time.

Identical factual content across all three, in `src/explorations/data.ts`. The
headline "I build products, from the hard decision to the last interaction" and
the action "Open the decision" are not used in any of them.

### Assets these explorations need

No product imagery or photography has been supplied, so all three carry
themselves on typography plus the existing prototype. That is the ceiling on how
good any of them can look, and it is the same ceiling for whichever is chosen.

| Needed | What it changes |
|---|---|
| Octolane product screenshot or short recording | Studio's largest tile and Editorial's featured figure both currently fall back to type or the prototype. A real product view is the single biggest upgrade available to any direction. |
| A photograph Rafi took | Studio has a natural place for one beside the lockup; Editorial can run one at figure scale. Neither renders a placeholder in the meantime. |
| Public email or verified profile | None of the explorations shows a contact action, because there is nothing to point it at. |
| Confirmed Octolane responsibilities | The contribution line in all three is limited to what the title supports. |
| Mainly Coding screens or records | Its entry is text only in every direction. |

Delivery dates and outcomes are absent everywhere because no records establish
them.

## Finishing pass, 2026-09-06

**Assets checked again before starting: still none.** `public/` is empty, there
is no image, video or PDF anywhere in the project, `site.email` is null and
`site.profiles` is empty. So item 6 recorded needs rather than adding evidence,
About is text only with no contact action, and `productArtifact` stays null.

- **Case-study card.** One semantic link with no nested interactive elements, a
  dark title, a single green action, 24px padding and a 1px shadow that only
  deepens slightly on hover. It no longer lifts: a card that moves under the
  cursor makes a list feel unstable while scanning.
- **Navigation.** The translucent floating pill is gone. A sticky opaque header
  strip with a hairline under it replaces it, so text passes behind a real edge
  rather than showing through. Its height is published as `--header-h` and used
  by `scroll-padding-top` and `:target` scroll-margin.
- **Playback.** One shared label table drives both demos: Play, Pause, Resume,
  Play again. Play again rewinds and starts. Reset is separate, returns to the
  resting frame without starting, and is disabled at rest. Restart is gone.
  Changing mode or scenario mid-run returns to the resting frame and keeps the
  selection; the projection is pure so runs cannot mix.
- **Status chip** distinguishes the resting frame ("Finished answer") from a run
  that just ended ("Complete"). Labelling both Complete beside a Play button read
  as a contradiction.
- **About.** Education, location, origin and company history live in the record
  and nowhere else. The paragraph that restated all four is gone.
- **Article** trimmed to 1424 words. The parser and test mechanics moved into the
  implementation disclosure; the main text keeps a short statement that buffering
  and markup are separate concerns. "When I would choose differently" merged into
  the tradeoff, which is what it was.

### Bugs found and fixed in this pass

1. **Deep links did not scroll.** Loading `/work/slug#section` set the hash and
   left the page at the top: the browser attempts the fragment scroll before
   layout settles and gives up. In-page hash changes were unaffected, so this
   only appeared on a shared or reloaded link. `HashScroll` waits for
   `document.fonts.ready` and then scrolls, honouring scroll-margin.
2. **Both disclosures were briefly deleted** while merging two sections, because
   they sat inside the range being replaced. Caught by a DOM probe finding zero
   `details` elements, and restored.

### Corrected in my own notes

An earlier comment in `globals.css` claimed `overflow-x: clip` on body broke
anchor scrolling. That was wrong: testing showed hash navigation scrolls with or
without it, and the real cause was the fragment-on-load case above. The comment
now says only what is true.

## Earlier refinement pass, 2026-09-06

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
- `prefers-reduced-motion` was not exercised at the OS level for the first
  passes; the preview pane cannot toggle it. Closed on 2026-09-07 by emulating
  the setting in a headless Chrome context: with reduce on, every transition on
  both pages computes to 0.001ms, nothing plays on load, and a run still
  completes to the resting answer. The OS toggle itself is still untouched.
- At a 320px viewport the two comparison panes total slightly more than one
  screen. No horizontal overflow at any width. Fits comfortably at 390px.

## Studio article preview, 2026-09-07

`/explorations/studio/making-a-response-readable` is a second shell around the
same content: the MDX in `src/content/work` and the demo in `src/demo` are
shared, and only the page wrapper differs. `/work/making-a-response-readable`
is unchanged and still the live route. Both exploration pages return
`noindex, nofollow`; neither appears in the sitemap.

Measured, not estimated: the reading column is 528px, which is a mean of 64
characters a line in Inter at 17px, and the comparison breaks out to 832px.
Both were counted from rendered line boxes rather than assumed from `ch`.

### Company descriptions

Mainly Coding is Rafi's sentence, used as written. Octolane is split into what
the product does and what he is responsible for, and the brand image is
captioned "Octolane · Revenue Superintelligence / Brand artwork". No claim that
he designed the artwork or that it shows the product interface.

### Playback

Both demos now rest at the end of their own timeline, so the first thing on
screen is a finished, readable answer on both sides. The primary control reads
Replay comparison at rest and when a run finishes, Pause while running, Resume
while paused; Reset is separate, stops a run, restores the resting answer, and
is disabled once there. One label table in `src/demo/labels.ts` serves both
demos, so the two cannot drift.

Verified by driving the real controls in a browser: labels follow the clock, a
paused run holds its position, a finished run matches the resting state exactly,
and Reset from mid-run restores it.

### How this pass was verified

50 checks through a headless Chrome build, all passing: no autoplay on either
page, reduced-motion emulation, the full playback sequence driven through the
real controls on both demos, no horizontal overflow at 1440 and 390, every
visible control at least 24px tall, the contents rail's smallest gap to the
article or the demo across 13 scroll positions, every section anchor landing
fully visible with nothing over it, the round trip from Studio into the preview
and back at both sizes, and the robots meta on four routes. Plus `pnpm lint`,
`tsc --noEmit`, `pnpm build`, and 16 unit tests.

Three things the run caught that were real: the status chip and the
screen-reader hint each used different words for the resting and finished
states, which are one state to a reader, and the hint still said "press play"
after the button had been renamed. All three now read from one source.

### Evidence still missing

- **The playback recording is webm only.** Playwright's bundled ffmpeg has no
  other muxer and there is no system ffmpeg, so there is no mp4 or gif. A
  six-frame stills sequence of every playback state was captured alongside it.
- **No production timings.** The 520ms figure is read from the fixture by a test
  and is described in the article as belonging to the simulated example. The
  2.4s late-result threshold is a demo setting.
- **Readability is not evaluated.** The claim that a finished sentence is easier
  to follow than a growing one is stated as a design hypothesis, because no
  study or telemetry backs it.
- **One supplied photograph is unused.** `half-moon-sky.jpg` is the only
  landscape frame; the opening takes a portrait and the selection below it is a
  three-up of portraits. The file is in the manifest and will appear if the
  layout gains a landscape slot.
- **No `robots.txt`.** `sitemap.xml` is served and the exploration routes carry
  `noindex`, but there is no robots file. Worth adding before launch.

### Browser-tool artifacts, not site defects

The preview pane intermittently stops compositing: it returned a blank white box
for the Octolane brand image while the same image was decoded and non-blank when
sampled into a canvas, and it starves `requestAnimationFrame`, which stalls
smooth scrolling and delays React's passive effects by hundreds of
milliseconds. Playback timing was therefore checked by waiting on state rather
than on the clock. One real hardening came out of it: the scheduled playback
step now checks a flag set synchronously by the press, so a pause cannot be
overtaken by a late effect cleanup.

## Studio rebuilt as one story, 2026-09-07

The page is now a single column read top to bottom: who he is, what he is
building, one decision, one photograph, an address. The three-column opening,
the Mainly Coding section, the response-reveal comparison and the photograph
grid are gone from the page. The comparison and everything around it live in the
article, which is unchanged apart from the switcher.

Homepage copy is 156 words, inside the 150 to 220 budget. Nothing on the page
uses the uppercase label style any more.

Text sits at 528px, a mean of 62 characters a line, and figures step out to
736px. Both are set on the page as `--measure-read` and `--measure-wide`, the
same two tokens the article uses, so the two pages hold the same measures.

A lying photograph takes the figure measure; a standing one stays at the reading
measure, where its edges line up with the paragraphs. Neither is cropped.

The exploration switcher is now a 38px control in the bottom right, closed until
pressed, and `process.env.NODE_ENV` gates it out of production builds entirely.
The bottom right rather than the bottom left because Next's development overlay
sits in the left corner and swallows clicks meant for anything beneath it.

The image viewer holds a sequence rather than one picture. That is what lets the
page show a single photograph and keep the other four behind one quiet link
instead of laying out a second grid. Arrow keys and two controls step through it,
focus is trapped inside it, and Escape returns focus and scroll position to the
link that opened it.

`ArtifactPanel.tsx` was deleted. Nothing imported it.

### Verified on 2026-09-07

71 checks in a headless Chrome build, all passing, at 1440, 1280 and 390:
one left edge for every block, the featured work starting on the first screen at
all three widths, the largest gap of the page falling above the photograph, no
streaming demo on the page, exactly one photograph shown and all five reachable
through the viewer, the same story order at every width, no horizontal overflow,
no clipped text, keyboard traversal, focus trapping and restoration, reduced
motion stilling every transition and the viewer's own animation, the switcher
starting closed with no links in the tab order, the round trip into the article
and back, and the robots meta on seven routes. Plus `pnpm lint`, `tsc --noEmit`,
`pnpm build` and 16 unit tests.

### Unresolved asset issues

- **No product screenshot or recording.** Only Octolane's brand image has been
  supplied, so that is what the page shows, captioned "The company's brand
  image, not the product interface". A real screenshot would replace it in one
  place, `src/components/site/artifact.ts`.
- **No LinkedIn URL.** Rafi said his public profile would be his LinkedIn, but
  the address itself was never given, so the page carries only the email he did
  supply. Add the URL and the profile link can go beside it.
- **No favicon anywhere on the site.** `/favicon.ico`, `/icon.png` and
  `/apple-icon.png` all return 404, so every page logs one console 404 in any
  browser. This predates this pass and affects the live pages too. It needs an
  icon file, which is a main-site change and out of scope here.

### A test artifact worth remembering (corrected 2026-09-07)

Rewriting `img.loading` from a capture script makes React report a hydration
mismatch that looks like a page defect. That much is true.

The rest of what this note originally said was wrong. It claimed the warning
that appeared when a script scrolled just after `load` came from `next/image`
racing a lazy image against hydration. It does not. It comes from the capture
script itself setting `document.documentElement.style.scrollBehavior`, which
writes to an attribute of an element React owns; doing that before hydration
finishes is the mismatch. Isolated on `/explorations/story`, a page with no
images at all: scrolling with that mutation logs one warning, scrolling without
it logs none, and making the mutation after hydration logs none. Every capture
and verification script now scrolls with `window.scrollTo({ behavior:
'instant' })` and touches nothing on `<html>`, and all of them run clean.

## Studio opening recomposed, 2026-09-07 (second pass of the day)

The opening is one grid again: a 280px identity column, then the Octolane brand
image and one photograph side by side in the remaining width, on a 1200px
content box. Identity, work and photography are all inside the first screen at
1440x900 and at 1280x800. Below that, Mainly Coding and the response-reveal
experiment share one row with no label column beside them, and the response
preview is back on the page with its article link directly beneath it.

Measured at 1440: cover image 480x252, photograph 302x452, both above the fold
(cover bottom 309, photograph bottom 508). The cover was 736px wide in the
previous version and is 480px now. The photograph covers more area than the
cover does. Both keep their exact natural proportions, 1.905 and 0.667.

### Asset audit, done before editing

Searched and opened: `public/photographs/` (five files), `public/octolane/` (one
file), `~/Desktop`, `~/Downloads`, `~/Pictures`, the CLI cache directory and the
session scratchpad, plus the whole repo outside `public/`.

| File | Header | EXIF orientation | Displays | Subject confirmed by opening it |
|---|---|---|---|---|
| `sea-lavender.jpg` | 7728x5152 | 8 | 5152x7728 portrait | Pale purple sea lavender in the foreground, promenade and water behind |
| `marina-breakwater.jpg` | 7728x5152 | 8 | 5152x7728 portrait | Marina at dusk, masts along a breakwater |
| `riprap-still-water.jpg` | 7728x5152 | 8 | 5152x7728 portrait | Grey and ochre riprap boulders at flat water |
| `pier-shed-railings.jpg` | 7728x5152 | 8 | 5152x7728 portrait | Long pier shed with white railings |
| `half-moon-sky.jpg` | 7728x5152 | 1 | 7728x5152 landscape | Half moon in a flat pink and grey sky |

All five are the camera originals, 22 to 27MB each. Orientation 8 means the
stored frame is rotated and the axes swap on display, which is why the manifest
parses tag 0x0112 rather than trusting the JPEG header.

Three other images sit on the Desktop (`CleanShot 2026-09-05 at 22.05.43@2x`,
`2026-09-06 at 11.01.58@2x`, `2026-09-06 at 20.53.25@2x`). Opened to check:
they are screenshots of this site in an earlier state and of an unrelated
purchase page. None is a project asset, and none was used.

Used on the page: `public/octolane/octolane-revenue-superintelligence.jpg` and
`public/photographs/sea-lavender.jpg`. The other four are reachable through the
viewer.

### Still no product screenshot

There is no Octolane product screenshot or recording anywhere in the places
listed above, so the opening shows the brand image, captioned "Octolane ·
Revenue Superintelligence" with "Brand image" beside it and the confirmed role
below. No claim is made that he made the artwork or that it shows the interface.

### Dev server port

Port 3000 is now held by the Octolane app, so `.claude/launch.json` has
`autoPort: true` and this site was verified on port 64898. Nothing in the
project hard-codes a port.

### Verified

82 checks in headless Chrome at 1440x900, 1280x800 and 390x844, all passing:
the supplied filenames actually loading, both images keeping their natural
proportions, cover and photograph side by side sharing one top edge and both
inside the first screen, the cover no wider than 520px, the photograph no
smaller than 260x380, exactly one prototype caption, the concise brand caption
once, the article link within 120px of the preview, the supporting row's first
cell carrying real content, mobile collapsing to one column in the order
introduction, cover, photograph, supporting work, both images opening a labelled
modal dialog that focuses a close control, closes on Escape, restores focus to
its trigger and preserves scroll position, all five photographs still reachable,
reduced motion stilling every transition, the preview resting on a finished
answer, no horizontal overflow, no clipped text, no console errors beyond the
site-wide favicon 404, and the robots meta across seven routes. Plus `pnpm
lint`, `tsc --noEmit`, `pnpm build` and 16 unit tests.

## Studio returned to the single vertical read, 2026-09-07 (third pass)

The side-by-side opening built earlier today is gone. The page is one continuous
column in this order at every width: introduction, Octolane artwork with its two
short paragraphs, Mainly Coding as one background sentence, the decision teaser
with the article link, the photography sentence and one photograph, then the
address.

Confirmed on the route itself at 1440x900, 1280x800 and 390x844: the opening has
no grid columns and the introduction does not overlap either image; zero demo
nodes, zero playback controls and zero prototype captions on the page; no
Mainly Coding heading and exactly one mention of it, in one sentence; the
photograph sits below the decision block (photograph top 1313 against decision
top 924 on desktop); the address is the last block; every block shares one left
edge; no horizontal overflow.

The article keeps the full demo with all six of its controls and its return
link. The viewer still reaches all five photographs and returns focus to the
link that opened it. Neither was redesigned in this pass.

This is the second reversal of the opening's structure in one day: side by side
was asked for, built and verified, then removed again. The composition itself is
the same arrangement recorded under "Studio rebuilt as one story", so both
layouts are known to work and either can be restored from that description.

## Studio editing pass, 2026-09-07 (fourth pass)

Structure untouched: introduction, Octolane, decision, photograph, contact, one
column. What changed:

**The decision teaser** is Rafi's supplied copy, in `STUDIO.decisionTitle`,
`decisionBody`, `decisionLink` and `decisionCaption`. The old heading and the
three-sentence explanation are gone, and the caption is now the only place on
the page where the prototype is described, so the explanation is not given
twice. The link reads "Explore the comparison" and points at the article.

**The heading typography** moved off the display serif. Instrument Serif is
condensed, and two words at heading size read cramped in it. The heading now
takes the body face at weight 500, 22px on mobile and 26px from the small
breakpoint up, line height 1.3, natural tracking. The serif is now used exactly
once on the page, on the name, which is what the earlier instruction asked to
preserve.

**The photograph** is capped by height from the large breakpoint up:
`lg:max-h-[65svh] lg:w-auto` with `max-w-full`. Both maxima apply at once and
the intrinsic ratio decides which binds, so nothing is cropped or stretched. At
1440x900 it renders 390x585 against a 528px text column, sharing the column's
left edge, and the figure shrinks to the picture so the caption row sits under
it rather than running the column's full width. Below 1024px the column alone
sizes it, with no height cap at all. The whole photography block, caption and
gallery link included, is 665px tall and fits a 900px viewport whole.

**Spacing**: the four lines of the teaser sit at 12/16/4px, the gap before the
photograph came down from 96px to 80px, and the contact from 64px to 40px, so
the ending reads as part of the photograph's block. Page height fell from 2316px
to 2007px.

Apostrophes in the three supplied sentences are now typographic, so the same
word is not set with two different marks on one page.

### Verified

109 checks in headless Chrome at 1440x900, 1280x800 and 390x844, all passing:
the exact four strings of the teaser, the link target, one prototype mention in
that section, the old paragraph gone, the heading's family, size, weight,
tracking and line height at each width, the serif appearing once, the
photograph's displayed ratio matching the source file, its left edge matching
the text column, the 65svh cap within 6px, the block fitting one screen, mobile
sizing by column width with no height cap, the group and gap measurements,
contact last, keyboard reach, enlargement at 875x1312 keeping the ratio, gallery
stepping, Escape, focus restoration, exact scroll restoration, reduced motion
stilling every transition and the viewer's animation, no overflow, no clipped
text, and the article still carrying its demo with all six controls and its
return link. Plus `pnpm lint`, `tsc --noEmit`, `pnpm build` and 16 unit tests.

### Checks I could not perform

- **No OS-level reduced-motion toggle.** Emulated in the browser context
  instead, which exercises the media query but not the system setting.
- **No real touch device.** 390x844 was emulated with `hasTouch`, so
  coarse-pointer rules were exercised but no finger ever touched glass.
- **The favicon 404 remains.** `/favicon.ico` still 404s site-wide, so every
  page logs one console 404. Out of scope for a Studio pass.

### One thing that looked like a defect and was not

The Next development overlay showed "1 Issue" in an early screenshot. It is the
`next/image` lazy-image hydration warning, and it appears only when a script
scrolls before hydration finishes. Measured across four pages, three runs each:
scrolled immediately, Studio, Workbench, Editorial and the untouched main
homepage each log exactly one; scrolled after hydration, all four log none. The
capture script now waits for hydration first.

## Studio recomposed with room to unfold, 2026-09-07 (fifth pass)

Four sections on one 1160px container and one left anchor, each with its own
composition:

1. **Introduction.** The name at `clamp(2.875rem, 7vw, 5.5rem)`, so 88px at 1440
   and 46px at 390, one line at every width. It sits in a band of `70svh` from
   the large breakpoint up, which puts "Building Octolane" at 774px on a 900px
   screen: visible at the foot of the fold rather than immediately. Below 1024px
   the band is dropped and ordinary padding spaces it, because a 70svh hole on a
   phone is not air, it is a gap.
2. **What I build.** Copy leads at 576px, the artwork sits at 378px on the right,
   both starting on the same top edge. The artwork is now a fifth of its former
   area and its embedded headline no longer carries the page. Caption reads
   "Octolane brand artwork". Mainly Coding stays one grey sentence under the
   copy.
3. **The decision.** The question alone at 46px over three lines, in the body
   face at weight 500, then one sentence, the link, and "Simulated data".
   Nothing beside it.
4. **Photography and contact.** Image-led and stepped in 86px from the left
   anchor, the only block that breaks it. The photograph is capped at 60svh, so
   540px tall at 900, with the sentence beside it and the address below.

Rhythm is padding only: every section has top padding, none has bottom padding,
so a gap is one value and not the sum of two. 128px between sections on desktop,
64px on mobile. Page height went from 2007px to 2501px at 1440, about 2.8
screens.

No entrance motion at all. Everything is present at load, which is what reduced
motion would fall back to, so there is no second code path that could leave
content hidden. Native scrolling, no snapping.

`.studio-story` was deleted from the stylesheet; nothing used it after this
recomposition.

### Verified

103 checks in headless Chrome at 1440x900, 1280x800 and 390x844, all passing:
four sections in story order with no two side by side and at most one at full
height, the exact content order of all fifteen blocks, name and question sizes
inside the requested ranges at each width, the name larger than the question and
never wrapping, the question at three lines, the artwork 360-420px and below
half the container, the artwork always after the name, section padding inside
the requested ranges with zero bottom padding anywhere, the container at
1160px, the opening at 0.70 of the viewport, the work heading past 70% of the
fold and inside it, the photograph at 60svh, photography stepping in from the
anchor, keyboard order, both images enlarging with focus and scroll restored,
all five photographs reachable, the development control collapsed and out of the
column, reduced motion stilling every transition with no animated element and
nothing hidden, no scroll snapping, no overflow, no clipped text, and the
article keeping its demo and return link. Plus `pnpm lint`, `tsc --noEmit`,
`pnpm build` and 16 unit tests.

### Could not verify

- **No OS-level reduced-motion toggle.** Emulated per browser context, which
  exercises the media query and not the system setting.
- **No real touch device.** 390x844 emulated with `hasTouch`.
- **Displayed image ratios are within 0.2%, not exact.** The brand artwork
  renders 378x198.84 against a source ratio of 1.9048, a 0.2% deviation that
  comes from fractional layout and the resizer's rounded variant. It is about
  0.4px over 199px and is not visible; the checks allow 0.5% and report the
  measured figure rather than claiming pixel equality.
- **The favicon 404 remains** site-wide and predates this work.

## Studio recomposed to close the gaps, 2026-09-07 (sixth pass)

The page read as blocks scattered across a canvas because the canvas was twice
as wide as anything on it: text ran at 576px inside a 1160px container, and
every section carried a viewport-scale rhythm. Both are gone.

**Container 58rem, was 72.5rem.** The left anchor and the right edge of the text
are now within sight of each other. Page height fell from 2501px to 1741px at
1440.

**A small header.** "Halim Rafi" at 15px on the left, the email quiet on the
right. The viewport-height hero and the empty band above the name are gone.

**The introduction is the statement.** Two deliberate lines at 44px on desktop,
30px on a phone, with YC W24 and San Francisco secondary beneath. The work
section begins at 455px, so the first screen carries the identity and the whole
Octolane description without crowding.

**One display direction, and it is the body face.** The condensed serif name and
the oversized sans question were two systems arguing. Everything display-sized is
now Inter at weight 500 in three steps: introduction 44px, section heading 28px,
inset title 17px. The serif is no longer used on this page; it still sets the
article's title. If the warmer serif is wanted back, it should take all three
steps rather than one.

**Octolane and the decision are one section.** Heading, then a lead line at
17px, the detail beneath it at 15px in a lighter ink so it scans, then the
responsibility sentence, then Mainly Coding as one grey line. The decision sits
inset on the sunken surface inside that section: title, question, link, and a
"Prototype · Simulated data" caption. 196px tall, not a screen of its own.

**The brand artwork is off the page.** Its marketing headline competed with
Rafi's own. The asset is untouched in `src/components/site/artifact.ts` and
`public/octolane/`, still served, and still used by `ProductArtifactView` on the
main site. Nothing was put in its place.

**Photography closes.** The sentence sits with the top of the picture rather
than trailing off its bottom corner, beside it on desktop and above it on a
phone. The photograph is capped at 58svh, so the whole frame and its caption sit
in one desktop viewport.

`OCTOLANE.product` became `productLead` and `productDetail` in the data rather
than the component slicing the string, so a wording change cannot silently print
the lead twice.

### Verified

69 checks at 1440x900 and 390x844, all passing: one image on the page and no
Octolane artwork anywhere in it, the header's name and quiet contact link, the
introduction's exact two lines breaking in two on desktop and its type being the
largest on the page, one font family across all three display steps, the inset
living inside the work section on a changed surface with its four exact lines
and the article link, the inset under 260px, the work beginning inside the first
screen, the introduction ending before 55% of it, no vertical gap anywhere over
220px, the photograph's ratio within 0.5% of source with the sentence beside its
top on desktop and above it on mobile, the whole photography block inside one
viewport, two contact links with the last ending the page, keyboard order, the
viewer enlarging with focus and scroll restored, all five photographs reachable,
reduced motion stilling every transition with nothing hidden, no snapping, no
overflow, no clipped text, the article keeping its demo and return link, and the
brand artwork still returning 200 from the project. Plus `pnpm lint`,
`tsc --noEmit`, `pnpm build` and 16 unit tests.

### Could not verify

- No OS-level reduced-motion toggle; emulated per browser context.
- No real touch device; 390x844 emulated with `hasTouch`.
- The site-wide favicon 404 remains and predates this work.

## /explorations/story: a visual direction, 2026-09-07 (seventh pass)

A prototype route, not a page of the site. It covers the opening and its turn
into the work and nothing else: no photography, no article, no gallery, no
second project. `/explorations/studio` is untouched and still linked from the
bottom of it. Both stay out of the index.

### The three choices it is proposing

**Two type roles, divided by job.** Instrument Serif carries the two things the
page says in its own voice, the name at 96px and the product's question at 40px,
where a high-contrast display face has room. Inter carries everything that is
information: the role, the aside, the explanation, the diagram's labels. The
earlier pages set the name in the serif and the question in a large sans, which
read as two systems; dividing by job instead means one voice and one hand. This
is the third answer this page has given to the same question, and it is the one
that keeps the warmer face without letting it near a small heading, which is
where it looked cramped.

**One accent, one meaning.** #7a3f22 appears in exactly four places, all of them
connections: the thread from the introduction down to the question, the three
source paths, their terminals, and the answer's. Nowhere else on the page.

**A drawing, not a screenshot.** Three labelled sources converge into one
answer. It is SVG with real text, so the labels scale and select, and it is
captioned "Illustration of the product concept, not a screenshot or a measured
result." Two layouts, wide and tall, because a left-to-right convergence needs
about 400px before its labels get too small; only one is in the document at a
time. The wide viewBox starts at x=51 so the longest label sits on the same left
anchor as the text above it.

The interaction is the sequence: the three paths draw once, staggered, when the
figure comes into view, and "Show again" replays it. Total 1.26s. Without
JavaScript, or with reduced motion, the finished drawing is the default state
and the replay control is not shown, because there is nothing to replay.

### Verified

85 checks at 1440x900, 1280x800 and 390x844, all passing: the supplied copy word
for word, the name at 96px against a 40px question with the role at 18px, one
display family across both display lines and the text face for everything else,
the question indicated inside the first screen with the drawing arriving on the
scroll, the thread present and aligned to the text anchor, all four diagram
labels rendering at 13px or larger, three source paths settling drawn, the accent
appearing only on connection elements, no images anywhere on the page, no
overflow, no clipped text, no snapping. Then, separately: with reduced motion the
sequence never starts, the drawing is complete, the replay is hidden and every
transition is stilled; with JavaScript disabled the page still says all of it;
the replay restarts the draw and settles; the keyboard reaches the contact, the
replay and the link, and the replay shows a focus ring. Finally, Studio still has
its own opening, its photograph and its article link, and all eight routes return
200 with the robots metadata they had. Plus `pnpm lint`, `tsc --noEmit`,
`pnpm build` and 16 unit tests.

### Limitations

- The accent check is weaker than it reads. Colours built with `color-mix()`
  compute to values that do not match a plain search for the accent's rgb, so
  the assertion caught only the full-strength terminal. What it establishes is
  that nothing outside the connection vocabulary uses the accent at full
  strength, not that every accent-derived tint was enumerated.
- No OS-level reduced-motion toggle; emulated per browser context.
- No real touch device; 390x844 emulated with `hasTouch`.
- The site-wide favicon 404 remains and predates this work.
- The dev server took port 3000 back after the Octolane app on it stopped, so
  this pass was verified there rather than on the assigned port.

## /explorations/story reworked from the Octolane frontend, 2026-09-07 (eighth pass)

### Reference access

**Repository: inspected.** `/Users/rafi/Desktop/Octolane/octolane.com`, the
octolane.com marketing app (`package.json` name `octolane`, Next 16.2.11). Read:
`src/app/(site)/page.tsx`, `components/HeroSection.tsx`,
`components/LineReveal.tsx`, `components/ReadManifestoLink.tsx`,
`components/essay/PostTemplate.tsx`, `components/essay/Reveal.tsx`,
`components/essay/SectionMark.tsx`, `content/posts/revenue-superintelligence.tsx`,
`src/components/Fonts.tsx`, `src/designSystem/constants/token.ts`,
`tailwind.config.js`, `src/app/styles/globals.scss`, `src/app/styles/variables.scss`.

**Live pages: not verifiable here.** Both URLs return HTTP 200 and their
server-rendered markup is intact on the wire (`<title>Making Human Judgment
Infinitely Scalable — Octolane</title>`, and the landing HTML carries
`class="site-type-350 relative w-full"`). But the client render fails in this
headless Chromium: the hero art is three.js, and the sandbox cannot create a
WebGL context, so the app's error boundary replaces the page with "Something
went wrong". Console: `THREE.WebGLRenderer: Error creating WebGL context`.
**So every decision below is read from source, and none of the rendered
behaviour was observed.** One decision is corroborated by the production HTML,
noted where it applies.

### The five decisions, and where they are in this implementation

| # | Reference decision | Source | Adapted as |
|---|---|---|---|
| 1 | Running text sits a 50-step under regular, at weight 350, scoped by a class on each page root; the static display face is held at 400 so it does not fall to 300. Inter is loaded variable, so 350 is a real weight. | `src/app/styles/globals.scss:803` `.site-type-350`; `src/components/Fonts.tsx` (Inter variable). Corroborated in production HTML: the served landing page carries `class="site-type-350 …"`. | `.story-type-350` on the page root, with `.story-display` pinned to 400. Inter is loaded variable here too. |
| 2 | The display roles are the editorial serif at weight 400, tracking -0.015em, leading 1.04; the measure is set in `ch` so it tracks the clamped font size rather than fighting it. | `globals.scss:1975` `.t-display`; `PostTemplate.tsx` h1 `max-w-[18ch] text-[clamp(46px,9vw,98px)]` with the comment on the ch measure. | `.story-display`; the name at `max-w-[15ch] clamp(3.5rem,8.5vw,5.5rem)`, the work heading at `max-w-[18ch] clamp(1.75rem,3.4vw,2.25rem)`. |
| 3 | Three ink levels inside one lockup, not two greys: 0.875 for the display line, 0.608 for the supporting line, 0.447 for the kicker. | `variables.scss:54-57` (`--core-silver-a12/a11/a9`); used as title/standfirst/kicker in `PostTemplate.tsx`. | `.story-ink` / `.story-mid` / `.story-faint`, the same alphas on this page's warm black. |
| 4 | Small controls are the mono face at 12.5px, uppercase, tracking 0.08em, leading 1.9, moving from muted to full ink over 300ms on the house curve. | `globals.scss:1988` `.t-mono-md`; `ReadManifestoLink.tsx` (the 300ms colour move and its muted rest state, `--site-muted` = rgba(23,24,26,0.66)). | `.story-mono` + `.story-control` on the contact link and the article link. Rest at 0.608 rather than the kicker's 0.447, because the reference's cue rests on 0.66 and something meant to be pressed needs the contrast. |
| 5 | The kicker sits above the display line, and a section turns on a small quiet mark at 0.32 opacity with 4.4em above it and 1.05em to the heading. The display line enters word by word: a 30px rise clearing a 6px blur over 760ms on the house curve, staggered 60ms after a 0.38s beat. | `PostTemplate.tsx` (kicker, then h1, then standfirst); `globals.scss:2109` `.section-mark` and `.section-mark + h2`; `LineReveal.tsx` (the 30px/6px/760ms spec) and `HeroSection.tsx` (0.38s + 0.06s per word). Its ornament is the company emblem, so this uses the reference's other rule, `.rule-dots` (`globals.scss:1998`), a dotted hairline from a radial gradient on a 3px pitch. | Kicker above the name; `.story-rule` as the header rule and, at 56px wide, as the section's mark; `.story-word` with the reference's timings. |

One thing deliberately not copied. The reference holds its entrances at
`opacity: 0` in the stylesheet and lets JavaScript add the class that releases
them (`Reveal.tsx`, `LineReveal.tsx`), so a page whose script never runs keeps
the text invisible. This inverts it: the words' normal state is visible and
`@starting-style` supplies the state they come from, so a browser that does not
know the at-rule, or never runs the transition, still renders the line. That was
not theoretical: an `animation … both` version of this left the name blank in a
preview pane that stalls animations.

### Removed

The 256px accent thread, the three-source diagram, its replay control, its
"Illustration of the product concept" caption, and the space they occupied. The
page is now 900px at 1440x900, one screen, down from 1291px. Nothing was added
to fill it.

### No product artifact

None has been supplied to this project except Octolane's marketing cover, which
stays out of the hero, so the work section is composed from type and the one
link out. For the record, the company repo does contain genuine product
screenshots at `public/assets/images/01-screen-shot.webp`,
`04-screen-shot.webp` and `head-of-sales-screenshot.webp`, and a photograph of
Rafi at `public/assets/images/rafi-halim.jpg`. Copying company assets into the
personal site is his call, not mine, so none was used.

### Verified

54 checks at 1440x900 and 390x844, all passing: the thread, the diagram, its
replay and its caption gone with zero svg and zero images on the page; the
reading weight at 350 with the display face at 400; the serif at -0.015em and
1.04 with both measures authored in `ch`; three distinct ink levels at 0.875,
0.608 and 0.447; controls in the mono face at 12.5px, uppercase, 1px tracking,
300ms transitions, moving 0.608 to 0.875 on hover with a focus ring; the kicker
above the name; two dotted rules with the section's at 56px and 0.32 opacity;
the words carrying 0.38s and 0.44s delays and ending visible; the name keeping
its space between words; the name at twice the work heading; the work section
inside the first screen; no gap over 180px; the page under 1.6 screens; readable
with reduced motion and with JavaScript disabled; the article link opening the
article with its demo and return link intact; Studio still holding its own
opening, photograph and article link; and seven routes returning 200 with the
robots metadata they had. Plus `pnpm lint`, `tsc --noEmit`, `pnpm build` and 16
unit tests.

### Limitations

- **No rendered reference.** WebGL is unavailable in this headless browser, so
  the live pages could not be observed. Anything about how the reference feels
  in motion is unverified.
- **The composition is one screen.** There is no scroll on this route at either
  width, so the recording shows the load and the controls rather than a scroll.
- **The right half of the container is unused** at 1440. The measures are the
  point of decision 2 and the page is left-anchored, but it is the next thing to
  judge if this direction continues.
- No OS-level reduced-motion toggle; emulated per browser context.
- The site-wide favicon 404 remains and predates this work.

## /explorations/story: the comparison becomes the centrepiece, 2026-09-07 (ninth pass)

The route now runs introduction, current work, one observable decision, personal
closing. 2248px at 1440x900, 2896px at 390x844.

**The introduction is one lockup.** Kicker, name, role at 12px and 12px apart
rather than 24 and 28, so the three lines read as one group. It occupies 38% of
the first screen, not a screen of its own.

**The work is two paragraphs.** What it helps people do, then the scope of the
responsibility. No claim that he built the features.

**The decision is the centrepiece.** Heading, question, then the existing
comparison at 752px against a 528px prose measure, which is the rhythm change.
Then the caption, one tradeoff sentence, and the case-study link. The tradeoff's
520ms is the figure a test reads out of the fixture, so the sentence and the
prototype cannot drift apart, and it is described as a property of this script.

**The comparison is reused, not rebuilt.** `CompactComparison` grew two optional
props whose defaults leave its four existing consumers untouched:
`singleControl` drops the Reset button, and `chrome={false}` suppresses its
built-in caption and its explanatory sentence so this page can supply its own.
Verified on the other pages: Editorial and the main homepage still render both
controls, their uppercase caption and their note; Studio and Workbench still
show no comparison on load, as before.

**Ink and measure.** The ladder's bottom step moved from 0.447 to 0.608 because
0.447 measures 3.0:1 on this paper, which is not readable at 12.5px. Measured
from what the browser paints: 11.9:1, 6.5:1, 4.7:1, and the faintest text on the
paper is the 4.7:1 step. Measures now scale with type size: 33rem at 17px, 28rem
at 15px and 14px, which lands the page's prose at 55 to 64 characters a line,
mean 61.

Two focused tests were added for the changed demo behaviour: that one control
covers all four playback states in three words, and that dropping Reset loses no
reachable state because the primary control lands on the same resting frame.

### Verified

71 checks at 1440x900 and 390x844, all passing: the reading order; the
introduction's internal spacing and its share of the first screen; two labelled
panes with exactly one playback control, no scenario selector, no implementation
note, one sentence-case caption; the control never overlapping the response
text; the comparison wider than the prose on desktop and full width on mobile;
prose at 55 to 64 characters; the faintest text at 4.7:1; a modest photograph
with a working gallery link that returns focus; Mainly Coding as one sentence in
the closing; two contact paths; no overflow, no clipped text, no scroll
snapping, no element sized in viewport units, no gap over 160px; the comparison
filling 45% or more of a screen when reached; and the case-study link working.
Playback was driven twice from inside the page: pause shows Resume and holds its
position, replay finishes at the resting answer, and scrollY and document height
were identical before, during and after every run. Plus `pnpm lint`,
`tsc --noEmit`, `pnpm build` and 18 unit tests.

### Could not verify

- **No product artifact.** None has been supplied to this project; the marketing
  cover is not product evidence and is absent. The company repo holds real
  screenshots at `public/assets/images/01-screen-shot.webp`,
  `04-screen-shot.webp` and `head-of-sales-screenshot.webp`; copying company
  assets into the personal site is Rafi's call.
- No OS-level reduced-motion toggle; emulated per browser context.
- No real touch device; 390x844 emulated with `hasTouch`.
- The site-wide favicon 404 remains.

### Four measurement mistakes worth remembering

All four looked like page defects and were not. A backslash lost inside a
template literal turned a transparency test into a capturing group, which
rejected every element and reported the contrast probe as null. Playwright
scrolls a target into view before clicking it, which read as playback moving the
page by 203px; driving the same run from inside the page showed scrollY, figure
height and document height all constant. A tall section was counted as a
viewport-height section. And the comparison's own two-column panes were counted
against the page's prose measure.

## /explorations/story: emphasis pass, 2026-09-07 (tenth pass)

Section order, palette, typography and the embedded comparison all kept. What
changed is where the weight sits. Page height 2008px at 1440x900, down from
2248px.

### The preview got its own fixture

`src/demo/fixtures.ts` now exports `previewEvents()` and `PREVIEW_END` (1240ms):
one sentence, four chunks, one bold span that opens at 360ms and does not close
until 1080ms. For those 720ms the raw side has a live `**` on screen and the
other side has nothing to release yet, which is the whole point of the two
labels. The last chunk closes both the span and the paragraph, so the finished
sentence appears on the right at the same instant, and both sides end identical.

`CompactComparison` took one prop, `variant: 'full' | 'preview'`, replacing the
`singleControl`/`chrome` pair from the previous pass. `full` is the default and
every other consumer is byte-identical in behaviour: Editorial and the main
homepage still render the paragraph, the three list items, the record, both
controls, their uppercase caption, the note and the two footer strips. Verified
in the browser, not assumed.

In `preview` the labels read "Show each piece" and "Wait for a readable unit",
the two footer strips are gone, there is one control, and the component prints
no caption of its own. The demo is 105px tall on desktop and 156px at 390,
against roughly 280px before.

### Copy

- Octolane: "Octolane brings together email, meetings, and account records so
  people can ask what changed." and "As co-founder and CTO, I lead the
  engineering team and technical direction."
- Mainly Coding moved out of the photography closing and into the work as its
  third, quieter line: "Previously, I co-founded Mainly Coding, which was
  acquired by Shikho."
- The takeaway lost its number: "This prototype waits for a readable unit before
  showing it. The tradeoff is a short delay before text appears." The 520ms
  figure stays in the case study, where a test reads it out of the fixture and
  the prose names it as demo configuration.
- "Read the case study" is now a sentence-case link at 15px with an underline
  and the accent on hover, immediately after the takeaway, instead of uppercase
  mono metadata.

The decision section now holds exactly six things: heading, question,
comparison, control, caption, takeaway with its link.

### Contrast, measured rather than eyeballed

Computed from what the browser paints, over #f6f4f1: the role line is 6.5:1 and
the faintest text sitting on the paper is 4.7:1, at all three of 1440x900,
390x844 and 1440x900 at 200% zoom. Nothing was lightened for restraint.

### Verified

90 checks, all passing, at 1440x900, 390x844 and 1440x900 at 200% zoom: the new
labels, the strips gone, one control, the one-sentence fixture with no record or
provenance line, the demo's compact height, one caption and no note, no timing
figure anywhere on the page, the exact takeaway sentence, the link's case, size,
family and position, the section holding only its six parts, the control never
overlapping the panes, the work copy, Mainly Coding in the work and not the
closing, the closing carrying no company history, contrast, no overflow, nothing
clipped, no console errors.

Playback was driven three times from inside the page: each run showed the two
sides actually diverging with the open marker on screen, paused to Resume and
held its position, replayed to a finish with both sides identical and back at
the resting sentence, and left scrollY, page height and demo height unchanged.
A fourth run started playback and then scrolled to the foot of the page: nothing
moved. The case study still has the full example, the scenario controls and the
timing.

Plus `pnpm lint`, `tsc --noEmit`, `pnpm build`, and 24 unit tests, six of them
new for the preview fixture: that it is one sentence with no record or footer,
that it stays under 1500ms and five events, that the span stays open across
chunks for at least 400ms, that raw shows the marker while the other side shows
nothing, that both sides finish identical, and that it rests on the finished
sentence.

### Could not perform

- No OS-level reduced-motion toggle; emulated per browser context.
- No real touch device; 390x844 emulated with `hasTouch`.
- 200% zoom was emulated as a device pixel ratio of 2 over a halved viewport,
  which reproduces the layout but not a real browser zoom's font boosting.
- No product artifact has been supplied; the work section stays typographic.
- The site-wide favicon 404 remains.

### Four checks of mine that were wrong, not the page

Counting `<p>` elements per pane to detect the footer strips (a pane holds its
label, its response and a ghost copy for height). Comparing whole panes to test
that both sides match, when their labels are meant to differ. Treating any
element whose scrollHeight exceeds its clientHeight as clipped, including boxes
that do not clip. And a case-sensitive test for labels that wear an uppercase
class.

## /explorations/story finished, 2026-09-07 (eleventh pass)

Section order, typography, palette, the short comparison and the photography
closing all kept. Page height 1812px at 1440x900, down from 2008px.

### Pacing

The comparison's heading and the top of its panel are now both inside a
1440x900 screen: heading at 717px, panel at 824px, 76px of panel above the
fold, which is its labels row and the top of the first line. Before this the
heading sat at 853px and the panel at 972px.

That came from spacing alone: header padding 28 to 24, its rule 24 to 20, the
introduction 80 to 48, the work and decision sections 112 to 64 each, the
question's margin 20 to 16 and the panel's 36 to 28. The pause before the
photograph stayed longer, at 96px, because that is where the subject changes.
No section carries a height, nothing hides overflow, body text and measures are
untouched, and mobile keeps the same flow.

### Timing, which is demo configuration and not a measurement

The preview's schedule was stretched from 1240ms to 1900ms, every mark by the
same factor, on the one clock both sides share: 0, 500, 1100, 1700, 1900. The
bold marker is now open for 1200ms instead of 720ms. The first schedule finished
before a reader could take it in. No input stream differs between the two sides
and neither side's delay was exaggerated; the right side's wait is what the
fixture's paragraph boundary produces.

### Observed from a fresh page load, not from a screenshot

Loaded the page, scrolled only to the panel, pressed the control once and
sampled both panes every 120ms:

- At rest: both sides identical, control reads "Replay comparison".
- 124ms: the left side holds the first fragment, the right side is empty.
- 609ms to 1699ms: the left side shows `including their **` with the marker
  open, the right side is still empty across fourteen samples.
- 1820ms: both sides show the finished sentence.
- End: identical content, control back to "Replay comparison".

### Supporting elements

The control and the caption now share one row under the panel, and the caption
wraps beneath it on a phone through the row's own flex-wrap rather than a
breakpoint. The caption comes from `PROTOTYPE_CAPTION_SENTENCE` in
`src/demo/labels.ts`, derived from the same constant the other pages use, so
the two wordings cannot drift. Its colour comes from a new `--demo-caption`
token defined per palette, because a caption ink that reads on the live site's
paper is invisible on this one; on this paper it measures 4.7:1 at 13px. The
takeaway and the case-study link sit together below that row.

The closing address is now underlined, normal case, at full ink, with the accent
on hover and a focus ring. Same text, same `mailto:` destination.

### Verified

101 checks at 1440x900, 390x844 and 1440x900 at 200% zoom, all passing,
including the new ones: the control and caption sharing a row on desktop and
wrapping on mobile, the heading and panel inside the fold, no viewport-unit
heights and nothing clipped by an overflow rule, and the address's text,
destination, decoration and case.

Playback ran three times from inside the page: each run showed the sides
diverging with the marker on screen, paused to Resume and held, replayed to a
finish with both sides identical and back at rest, and left scrollY, page
height and demo height unchanged. A fourth run started playback then scrolled to
the foot of the page; nothing moved. Reduced motion leaves the text visible,
every transition stilled and the demo at rest with both sides equal. Keyboard
order runs Email, the play control, the case study, the photograph, the gallery,
the address, and the case-study link takes a visible focus ring. The gallery
opens and returns focus to the link that opened it.

Plus `pnpm lint`, `tsc --noEmit`, `pnpm build` and 24 unit tests. Three of the
preview tests moved with the schedule: the length bound is now 2200ms, the open
span must last at least 900ms, and the mid-run sample reads at 1300ms.

### Could not perform

- No OS-level reduced-motion toggle; emulated per browser context.
- No real touch device; 390x844 emulated with `hasTouch`.
- 200% zoom emulated as a device pixel ratio of 2 over a halved viewport. That
  reproduces the layout at that scale but not a real browser zoom's font
  boosting or its own reflow.
- No product artifact has been supplied, so the work section stays typographic.
- The site-wide favicon 404 remains.

### One more measurement mistake of mine

Reading a pane by dropping the first line of its `innerText` left the considered
side's "Holding" badge in what I was treating as its response, so a trace showed
that side reading "HOLDING" rather than empty while it waited. A pane is a
header and a body; reading the body element directly gives the real answer,
which is that it is empty for fourteen consecutive samples.

## Verification pass across the four routes, 2026-09-07 (twelfth pass)

The story composition was treated as the baseline. Nothing about its typography,
section order, copy, imagery or spacing changed. One thing did change, because a
reproduced problem required it.

### The one fix: quiet text was under AA

`--text-muted` resolves to each palette's step 9, and small text set in it
measured below 4.5:1 in the browser:

| Where | Text | Size | Was | Now |
|---|---|---|---|---|
| Case study rail and labels | "Role", "Contents", "Case study" | 11px | 4.1:1 | 4.6:1 |
| Case study demo pane labels | "Raw arrival" | 13px | 3.8:1 | 4.6:1 |
| About and the live nav | "Work", "About", "Now" | 11 to 13px | 4.3:1 | 5.2:1 |
| Story | "Email" | 13px | 4.7:1 | 4.7:1 (unchanged) |

Step 9 moved down by about 5% of its own value in four palettes, each figure
computed to clear 4.5:1 on the lighter of the two surfaces it sits on and then
re-measured in the browser:

- live `#6e7883` to `#626b75`
- studio `#77716a` to `#6b665f`
- story `#756f66` to `#6a655d`
- workbench `#66707c` to `#5d6671`
- editorial `#6b6b62` already cleared it and was left alone

Same hue, same role, same sizes, nothing else touched. This is a shared token,
so it also lifts the main homepage's and About's quiet text; that is the same
defect in the same place and the change is a colour, not a composition.

### Checks passed

**90 route checks** at 1440x900, 390x844 and 200% zoom across
`/explorations/story`, the case study and `/about`: HTTP 200, no horizontal
overflow, no clipped text, no console errors beyond the site-wide favicon 404,
every image loaded, every mailto exactly `mdabdulhalimrafi@gmail.com`, the case
study's two disclosures starting closed, and text contrast meeting AA
everywhere after the fix above. Every internal link on those three pages was
followed and returned 200.

**Keyboard**, by real Tab traversal rather than by inspection: 6 controls
reachable on the story page, 4 on the case study, and every focused control
showed an outline. The case study's disclosures open and close on Enter.

**The gallery viewer**: opens a labelled modal with `aria-modal`, focuses Close,
shows the frame at over 500px, locks the page, reaches all five photographs with
ArrowRight, keeps focus inside itself across eight Tab presses, and on Escape
closes, returns focus to "More photographs", restores the scroll position and
unlocks the page.

**The case study's full demo**: switching mode at rest leaves the same finished
answer; both the Normal and the Delayed tool result scenarios run to completion
and end with the record and the provenance line and no open markup; switching
mode mid-run leaves one copy of the answer, not two.

**31 comparison-integrity checks** on the story page, all driven inside the page
so nothing scrolled a target into view on our behalf:

- Three seconds on a fresh load change nothing: playback needs the press.
- At rest both columns already show the same finished sentence.
- Across three consecutive replays: the run starts on the press, the two sides
  visibly differ with the open `**` on the left and the right side empty, both
  finish identical and back at rest, one copy of the opening words and not two,
  nothing moves again 2.5s after finishing, and scrollY, page height and panel
  height are unchanged throughout.
- One stream on one clock, checked at every sample of every run: the left
  column's text with its markers removed is always a prefix of the finished
  sentence, and the right column is only ever empty or the whole sentence.
- Pause freezes the run; resume carries on from where it stopped rather than
  restarting.
- Starting playback and scrolling to the foot of the page leaves the reader
  where they put themselves.
- The control never overlaps a column at either width.
- Under reduced motion the comparison still states its two approaches and its
  answer, nothing animates, nothing is hidden, and a deliberate press still
  runs it to the end.

Plus `pnpm lint`, `tsc --noEmit`, `pnpm build`, 24 unit tests, and the 101-check
story composition suite.

### Checks that could not be performed

- **No OS-level reduced-motion toggle.** Emulated per browser context, which
  exercises the media query but not the system setting.
- **No real touch device.** 390x844 was emulated with `hasTouch`; tap targets
  and coarse-pointer rules were exercised, but no finger touched glass.
- **200% zoom was emulated** as a device pixel ratio of 2 over a halved
  viewport. That reproduces the layout at that scale but not a real browser
  zoom's font boosting or its own reflow.
- **No screen reader.** Roles, labels, focus order and the focus trap were
  checked in the accessibility tree and by driving the keyboard; no assistive
  technology was run.
- **The site-wide favicon 404 remains.** `/favicon.ico`, `/icon.png` and
  `/apple-icon.png` all 404, so every page logs one console 404. Fixing it means
  adding an icon to the main site, which is outside this pass.

### Private checklist: evidence still missing

Nothing below is on the website, and no placeholder stands in for any of it.

1. **No Octolane product artifact.** Only the marketing cover was supplied, and
   a brand image is not product evidence, so it is out of the hero and off the
   story page entirely. The company repo at `~/Desktop/Octolane/octolane.com`
   does hold real screenshots at `public/assets/images/01-screen-shot.webp`,
   `04-screen-shot.webp` and `head-of-sales-screenshot.webp`, plus a photograph
   of Rafi at `rafi-halim.jpg`. Copying company assets into the personal site
   is his decision, so none was used.
2. **No contribution evidence beyond the title.** The page says he leads the
   engineering team and the technical direction, which the title supports.
   Anything more specific, a feature he drove, a system he designed, a decision
   he owned, needs a record before it can be written.
3. **No production measurements.** The 520ms in the case study is read out of
   the fixture by a test and named there as demo configuration. Nothing on
   either page states a production latency, adoption figure or outcome, because
   none has been supplied.
4. **No delivery timeline.** No dates for Octolane or Mainly Coding beyond
   "YC W24" and the acquisition, both of which were supplied.
5. **No LinkedIn or other public profile URL.** Rafi named his LinkedIn as the
   public profile but never gave the address, so the pages carry only the email.
6. **The prototype is the only interactive artifact,** and it is simulated. It
   is captioned as such wherever it appears, and the case study carries the
   full disclosure.
7. **No favicon asset** for the site.

### Two measurement mistakes of mine, again worth recording

The contrast probe read `color(srgb 0.98 0.98 0.976 / 0.92)` with a plain
number match, treating 0-1 components as 0-255, which turned the translucent
header into near-black and reported 1.1:1 on ordinary dark text. And a check for
"a deliberate press still runs the comparison" broke out of its loop on the
resting label before playback had started, reporting no change on a run that was
fine.

## Pass: the way back out of the case study

The design of `/explorations/story` is unchanged. One navigation defect was
found and fixed; everything else in this pass was verification.

### The defect

Both exploration routes link to the same article, and the article's two "Back
to Studio" links were hardcoded. A reader who entered from Story was returned
to Studio, a page they had never seen, and Story was then reachable only
through the browser's back button. There is one article, one route and one set
of content; only the way back was wrong.

### The fix

The entry point travels in the query. Story links to
`/explorations/studio/making-a-response-readable?from=story`; the article reads
`searchParams`, looks the value up in a two-entry table and labels both of its
back links accordingly. Studio's own link is untouched, and no query at all,
an empty one, an unknown route or a full URL in the parameter all fall back to
Studio, which is where the article lives. The value indexes a table rather than
becoming an href, so a crafted query cannot point the link off-site.

No second copy of the article, no new route, no change to the content.

One consequence worth recording: reading `searchParams` opts that route into
dynamic rendering, so the build now lists
`/explorations/studio/making-a-response-readable` as `ƒ (Dynamic)`. The live
article at `/work/making-a-response-readable` is still prerendered, and nothing
else in the build changed.

### Checks run against this code

- **Navigation journey, 96/96** at 1440x900, 390x844 and 200% zoom
  (`cap/nav.mjs`). Story carries exactly one case-study link and it names its
  origin; clicking it lands on the article; both back links read "Back to
  Story", point at Story and are painted; the top one, the one under the
  article and the browser's own back button all return to Story with Story
  actually rendered. Entering from Studio still says "Back to Studio" and
  returns to Studio. No query, an empty query, `https://evil.example`,
  `%2F%2Fevil.example` and an unknown route all fall back to Studio. The
  gallery opens as a labelled modal holding focus, and both Escape and the
  Close button return focus to "More photographs", restore the scroll position
  to the pixel and unlock the page. Both email links are exactly
  `mailto:mdabdulhalimrafi@gmail.com`, the closing one shows the address
  underlined, both are 40px tall, and the header link takes a visible ring.
- **Route audit, 90/90 twice** (`cap/audit.mjs`): once as before, and once with
  the article addressed as a reader reaches it from Story, query and all. Same
  result both ways, so the query changes the way back and nothing else.
- **Controls and playback, 67/67** at all three widths plus reduced motion
  (`cap/controls.mjs`). At rest the control offers "Replay comparison" over the
  finished answer; a press plays and the control reads "Pause"; a press freezes
  it, proven by sampling for a further 900ms; "Resume" carries on from the
  freeze rather than starting over; finishing returns the control to "Replay
  comparison" with both columns identical. Both columns read the same incoming
  events, checked at every sample: the left with its markers stripped is always
  a prefix of the finished sentence, the right is only ever empty or whole. The
  difference is observable while it runs, on the order of 30 samples showing
  the open `**` on the left with the right still waiting. Three consecutive
  replays each end identical, duplicate nothing, and leave scroll position,
  document height and panel height untouched; nothing stirs 2.5s after the last
  one. The control never covers a column, measures 180x38, and the labels stay
  at 12px or more beside 13px or more of response text. Scrolling to the foot
  mid-run leaves the reader exactly where they went.
- **Comparison integrity, 31/31** (`cap/integrity.mjs`) and **story
  composition, 101/101** (`cap/verify10.mjs`), both re-run unchanged apart from
  one stale assertion in the composition suite that expected the case-study
  link without its query.
- `pnpm lint` clean, `tsc --noEmit` clean, `pnpm test` 24 passing, `pnpm build`
  compiled.

### Measurement mistakes in this pass

Three, all mine, and each looked at first like a page fault.

1. **`waitForLoadState('load')` after a `next/link` click.** A client-side
   navigation fires no load event, so the wait resolved against the document
   already there and the assertion read the old URL. Twenty-six checks failed
   on a page that was working. `waitForURL` is the right wait.
2. **A case-sensitive comparison against labels wearing an uppercase class.**
   `innerText` reflects `text-transform`, so "Show each piece" came back as
   "SHOW EACH PIECE". This is the second time I have made this exact mistake.
3. **Pressing the control before React had hydrated it.** A probe
   (`cap/hydrate.mjs`) puts the button's first response at 55-60ms after load,
   in both normal and reduced-motion contexts: the first press is inert, the
   second works. My reduced-motion check pressed once inside that window and
   reported that the press did nothing.

And one apparent fault that was an artifact of frame extraction: two stills
pulled out of the desktop recording with `ffmpeg -r 0.5` showed the page at
different scroll offsets, which looked like playback moving the viewport. A
continuous probe (`cap/shiftprobe.mjs`) sampling the exact filmed sequence 74
times returned one distinct `scrollY` (614), one figure top (210) and one
document height (1812). The frames are real but mis-timed by `-r` against a
sparse variable-frame-rate webm; one of them came from during the eased scroll.

### Still not performed

The same four limits as the previous pass, unchanged: no OS-level
reduced-motion toggle, no real touch device, 200% zoom emulated as DPR 2 over a
halved viewport, and no screen reader. The site-wide favicon 404 also remains.

### Private checklist: evidence still missing

Unchanged from the previous pass, all seven items. Nothing below is on the
website and no placeholder stands in for any of it: no Octolane product
artifact (the company repo's real screenshots are still Rafi's to copy or not),
no contribution evidence beyond the title, no production measurements, no
delivery timeline, no public profile URL, a simulated prototype as the only
interactive artifact, and no favicon asset.

## Handoff: where the current evidence lives

No source file changed after the verification suites ran (source last touched
09:58, suites 10:00-10:10, only this document later), so those results stand for
the code as it is. Two artifacts were added afterwards because they had never
been captured: the photography viewer, and a recording that walks the control
through play, pause, resume and replay in that order.

Everything below is in the session scratchpad at
`/private/tmp/claude-501/-Users-rafi-Desktop-halimrafi/471b5ed4-76a6-4ee3-9557-9bc117e62ebc/scratchpad`,
which is temporary. Nothing here is served, and nothing was copied into the
repository.

- `deliver2/story-desktop.png`, `deliver2/story-mobile.png` — full pages,
  1440x1812 and 390x2173 css px at 2x.
- `deliver2/case-study-from-story-{desktop,mobile}.png` — the article as a
  reader reaches it from Story, both back links reading "Back to Story".
- `deliver2/photography-closing-{desktop,mobile}.png` — the closing section in
  the page.
- `deliver2/gallery-viewer-{desktop,mobile}.png` and
  `deliver2/gallery-viewer-next-{desktop,mobile}.png` — the viewer open on the
  first photograph and one step on. `aria-modal="true"`, labelled by the
  photograph's title, focus on Close, frame 515px wide on desktop and 359px on
  mobile.
- `deliver2/film2/{desktop,mobile}/comparison-*-play-pause-resume-replay.webm`
  — initial state, play, a pause held mid-sentence, resume to the end, then a
  full replay back to rest. `scrollY` was 614 on desktop and 682 on mobile at
  every one of the seven stages.
- `deliver2/film/{desktop,mobile}/comparison-*-initial-state-through-playback.webm`
  — the earlier recording, kept.
- Harnesses: `cap/nav.mjs` (96), `cap/audit.mjs` (90, `CASE_PATH` overridable),
  `cap/controls.mjs` (67), `cap/integrity.mjs` (31), `cap/verify10.mjs` (101),
  `cap/hydrate.mjs`, `cap/shiftprobe.mjs`, `cap/galleryshots.mjs`,
  `cap/statefilm.mjs`, `cap/journeyshots.mjs`.

One thing not to read as evidence: the stage trace `statefilm.mjs` prints reads
the control's label immediately after each press, before React has committed
the re-render, so it reports the previous word. The label transitions are
established by `cap/controls.mjs`, which reads after the render.

## Pass: one real product screenshot in the work section

### What was looked at, and how it was sorted

Every supplied asset was opened, not listed. In this project `public/` holds
five photographs and one Octolane file, and that file is the marketing cover.
The company repo at `~/Desktop/Octolane/octolane.com` holds four candidates,
which were converted and viewed:

- `01-screen-shot.webp`, 4074x2727. **Actual product UI.** The application's
  home: a sidebar carrying Overview, Actions, Emails, Messages, Meetings,
  Signals, Accounts, Contacts and Pipelines, a question typed into the ask box
  ("Find deals stuck in negotiation for 14+ days and draft a check-in to each
  champion"), cards for AI Memory and AI Actions, and upcoming meetings with
  their participants.
- `03-screen-shot.webp`, 4074x2727. **Actual product UI, and the strongest
  match for the page's argument**: a "Record updates" panel proposing changes
  field by field with current and new values, over a popover reading "Why
  Octolane suggested this" with a confidence, the evidence ("Call recap + email
  thread") and a detection date. Not used. It names two third-party companies
  as accounts, names a real person as a contact, and prints deal values. That
  is a decision about publishing named customers on a personal site, and it is
  Rafi's to make, not mine.
- `04-screen-shot.webp`, 4074x2727. **Actual product UI.** Meetings: a
  recording with playback and a summary being written. Not used; it shows a
  person's face on camera.
- `head-of-sales-screenshot.webp`. Reviewed, not chosen.

All four are published by the company on octolane.com, so none is private
material. `01` was chosen because it is the sentence above it, on screen, and
because it carries no deal figures and no named third-party contact.

The three kinds are kept apart and each says what it is:

| | What it is | Where it lives |
| --- | --- | --- |
| Product UI | Octolane's own screenshot of the application | the work section on Story |
| Brand artwork | the Revenue Superintelligence cover | `productArtifact`, captioned as a brand image, on the homepage |
| Simulated prototype | the streaming comparison | the decision section, captioned as simulated wherever it appears |

### What changed on the page

`public/octolane/octolane-app-home.webp` was copied in. `STORY.product*` in
`src/explorations/data.ts` carries the path, the real dimensions, the alt text
and one caption; `StoryExploration.tsx` renders it as a figure after the two
Octolane sentences and before the Mainly Coding note, opening into the viewer
the page already has, as a one-item sequence so stepping cannot walk from the
product into the photographs.

The caption is "Octolane, asking one question of a workspace of emails,
meetings and records. Screenshot from octolane.com." It describes what is
visible and where the file came from. It claims nothing about who designed or
built that screen, because no supplied material says. The sentence above it
still carries the only contribution claim the material supports: the team and
the technical direction.

Two notes on what was deliberately not written. The company site uses this same
file as the image for its Salesforce tab and again for its HubSpot tab; the
image shows neither, so the caption names only the workspace and the question.
And nothing was said about the records being examples, because that cannot be
verified from the file.

### A tradeoff to know about

An earlier pass required the comparison heading and the top of its panel to be
inside a 1440x900 screen. That can no longer hold. The figure adds about 500px
and only 76px were free, so the heading moved from 717px to 1224px. No image
size closes that gap. What the first screen shows now is the introduction and
the product, which is the order this pass asked for; the comparison follows
within one screen of scrolling and its panel is still whole. The composition
suite was changed to assert exactly that, and the change is marked in the file
as a tradeoff rather than a relaxed threshold.

### Verification

Re-run against this code, not carried over: route audit 90/90, navigation
96/96, controls and playback 67/67, comparison integrity 31/31, story
composition 103/103 (two assertions rewritten, two added). `pnpm lint` clean,
`tsc --noEmit` clean, 24 tests passing, `pnpm build` compiled.

New: `cap/product.mjs`, 63 checks at 1440x900, 390x844 and 200% zoom. One
figure in the work section pointing at the product file; the image loaded and
served at the real aspect ratio; a supporting width, 640px at desktop and 358px
on a phone; alt text describing the interface; one caption naming the product
and the source and claiming nothing about authorship; the caption at 4.7:1;
a labelled trigger; the product and the prototype in separate figures; the
figure after the two sentences; no horizontal overflow. The viewer opens on the
product, the larger view is big enough to be worth opening, focus moves to
Close, stepping stays on the product, and Escape closes it, returns focus to
the trigger, restores scroll to the pixel and unlocks the page.

### Another measurement mistake

My new contrast probe returned `NaN:1`. `parse` hands back an alpha as a fourth
element, and the luminance function summed over all four against a
three-coefficient array, so every ratio was `undefined`. Fixed by taking only
the three colour channels. The route audit's own probe was checked and does not
share this bug: it keeps `{rgb, a}` apart, so the AA figures reported in
earlier passes stand.

### Private checklist: evidence still missing

Item 1 has moved. There is now one authentic product screenshot on the page.

1. ~~No product artifact.~~ Satisfied for the work section. Still open: whether
   to use `03-screen-shot.webp`, which demonstrates "what changed on an
   account" far better but publishes named customer companies, a named contact
   and deal values.
2. **No contribution evidence.** Unchanged, and the screenshot does not supply
   any: it shows the product, not what Rafi did. A specific feature, system or
   decision he owned, with a record behind it, is still the missing piece.
3. **No production measurements.** Unchanged.
4. **No delivery timeline** beyond YC W24 and the acquisition. Unchanged.
5. **No public profile URL.** Unchanged.
6. **The prototype is still the only interactive artifact,** and it is
   simulated. Unchanged.
7. **No favicon asset.** Unchanged.

The exact thing still wanted, stated plainly: a screenshot or a short recording
of one real Octolane workflow, with enough context to say what Rafi did and
what the team did. Nothing on the page stands in for it.
