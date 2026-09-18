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

## Pass: refining the product figure

Only the figure changed. The rest of the page is as it was.

### Confirmed source

`public/assets/images/01-screen-shot.webp` in Octolane's own website
repository, published on octolane.com as the image for the "Use Native AI CRM"
feature tab. Copied here as `public/octolane/octolane-app-home.webp`, byte for
byte, 4074x2727, the highest resolution that exists. Company material, already
public.

**It is a framed presentation of the application, not a raw screen capture.**
Established by reading the file's own pixels rather than trusting its name: the
outermost pixels along the left, top and bottom edges are `rgba(0,0,0,1)`, the
corners just outside that stroke are fully transparent, and 20px in the surface
is `rgba(248,248,248,0.85)`. So the interface was composited into a dark rounded
frame with translucency, and the frame belongs to the asset.

The interface inside it is the product's own, shown in a demo workspace: the
workspace switcher reads Resend and a meeting participant is at acme.com.
Whether the interior was captured from a running build or assembled in a design
tool cannot be told from the file, so neither is claimed anywhere.

Two corrections to what I wrote in the previous pass. I said this file "carries
no named third-party contact", which is true of contacts but left the wrong
impression: it does name **Resend** as the workspace in the top-left, and it
shows `one@octolane.com` and `elis@acme.com`. And the heavy black outline is
not CSS. `.studio-photo` sets only a hover opacity and a focus ring; it draws
no border. Since the outline is in the asset, the instruction to replace it
does not apply and no CSS frame was added, which would have put a frame on top
of a frame.

### What changed

- **Width.** The figure takes the container's full width, 848px at 1440 and
  640px at the 200% emulation, measured equal to the comparison's figure at
  every width. Paragraphs are untouched at 528px.
- **No border added,** for the reason above.
- **One visible control.** The image and the words "View larger ↗" sit inside
  the same button, so there is a single tab stop rather than two controls
  doing one thing, and the visible label is part of the accessible name:
  `aria-label="View larger: Octolane's home workspace"`, which begins with the
  words on screen so voice control can address what a sighted user reads. The
  earlier version had no visible affordance and an `aria-label` that did not
  match anything on screen.
- **Caption corrected** to "Octolane's home workspace, with a follow-up request
  ready to send.", with `octolane.com` beside it as the source. The suggested
  wording was used because inspection confirms it: the ask box holds the typed
  request "Find deals stuck in negotiation for 14+ days and draft a check-in to
  each champion", the text cursor is still at its end, the round submit button
  sits at its right, and there is no answer anywhere on screen. Nothing has
  been sent, so the caption stops at "ready to send" and implies no completed
  workflow. The previous caption said "asking one question of a workspace",
  which read as though the question had been asked.
- The alt text now describes the frame, the selected Home tab, the heading, the
  unsent request, the cursor and the submit button.

The comparison below is untouched and still says it is a simulated prototype.

### Verification

`cap/product.mjs`, now 75 checks at 1440x900, 390x844 and 200% zoom, all
passing. The figure as wide as the comparison and the paragraphs still at their
measure; the phone's figure inside its column with no overflow; the visible
label painted under the image; the accessible name beginning with it; the
caption at 4.7:1; product and prototype in separate figures. Enlarged view:
opened from the keyboard with Enter, focus on Close, stepping staying on the
product, Escape closing it, focus returning to the trigger, scroll restored to
the pixel, the page unlocked, and no horizontal overflow at either width.

Re-run and passing: route audit 90/90, navigation 96/96, controls 67/67,
integrity 31/31, composition 103/103 (keyboard order updated for the two new
stops, which fall in reading order: email, View larger, octolane.com, then the
comparison). `pnpm lint` clean, `tsc --noEmit` clean, 24 tests, build compiled.

### A measurement mistake I nearly acted on

I measured the enlarged image with `naturalWidth` and read 358px on a phone and
1324px on a 2x desktop, which looked like the viewer serving a badly
under-resolved file. I was about to change the shared viewer's `sizes`, which
would have touched the photography gallery for no reason.

`naturalWidth` is the wrong probe. With a `w`-descriptor srcset the browser
divides the intrinsic size by the density it computed, so it reports the CSS
width straight back and every image looks soft. Fetching the optimizer directly
returned exactly what was asked for: `w=750` gave 750x502, `w=1920` gave
1920x1285, `w=3840` gave 3840x2570. Reading `w=` out of `currentSrc` instead
shows the enlarged view is sharp everywhere: 1920 served for 1153 CSS px at 1x,
3840 for 1153 at 2x, 750 for 359 at 2x, 1080 for 359 at 3x. Nothing was
changed, and `cap/product.mjs` now measures the served candidate.

### Honest limit on a phone

The enlarged view is 359 CSS px wide because that is the whole width of a
390px screen; no viewer can exceed it. It is served 750 device pixels there, and
the page sets `width=device-width, initial-scale=1` with no `user-scalable=no`
and no `maximum-scale`, so pinch zoom is available and reveals real detail
rather than blur. Inspecting a 4074px interface on a phone still means zooming.

### Evidence gap, unchanged

The figure shows the product; it says nothing about what Rafi did. Still wanted:
a screenshot or short recording of one real Octolane workflow, with enough
context to say what he did and what the team did. Also still open: production
measurements, a delivery timeline beyond YC W24 and the acquisition, a public
profile URL, and a favicon. And still Rafi's call: whether to use
`03-screen-shot.webp`, which shows what changed on an account far better but
publishes named customer companies, a named contact and deal values.

## Pass: finishing the "View larger" interaction

The composition is untouched. The figure keeps its width, its aspect ratio, its
caption and its separation from the simulated prototype. What changed is inside
the viewer.

### Provenance, confirmed again

`public/octolane/octolane-app-home.webp` is a byte-for-byte copy of
`public/assets/images/01-screen-shot.webp` in Octolane's own website
repository, published on octolane.com as the image for the "Use Native AI CRM"
feature tab. 4074x2727, the highest resolution that exists; the viewer opens
that same file, which a check now asserts by reading the `url` parameter out of
`currentSrc` rather than trusting the markup.

It is a framed presentation of the application, not a raw screen capture: the
outermost edge pixels are `rgba(0,0,0,1)`, the corners outside that stroke are
transparent, and the surface 20px in is `rgba(248,248,248,0.85)`. The interface
is the product's own, in a demo workspace (the switcher reads Resend, a
participant is at acme.com). Nothing about individual feature ownership or any
production outcome is inferred from it anywhere on the page or here.

### The problem that was reproduced

"View larger" barely enlarged anything except on a desktop. The viewer fits an
image whole inside the viewport less 8rem of chrome, which for a 4074px
interface gives:

| | figure on the page | enlarged | gain |
| --- | --- | --- | --- |
| 1440x900 | 848px | 1153px | usable |
| 390x844 | 342px | 359px | 5%, effectively nothing |
| 200% zoom | 640px | 481px | smaller than the figure |
| 400% zoom | 312px | 145px | a sliver |

Fitting whole is right for a photograph and wrong for a screenshot. So the
product branch now lays the image out at the larger of a 900px floor and the
width that fits, and the frame around it scrolls. Where the fit is already
comfortable the expression resolves to the fit and nothing changes; where it is
not, the interface can be panned, which is how a wide screenshot is read on a
phone. Photographs are untouched and still fitted whole.

Two details that mattered:

- The rule sits outside every layer. Tailwind's utilities are in a later layer
  and won over an earlier attempt regardless of specificity, which is why the
  first version measured as though nothing had changed.
- `sizes` had to be corrected. It still claimed `92vw`, so a 900px box on a 2x
  phone was served a 750px file and the interface came out soft. It now claims
  `(max-width: 1200px) 900px, 92vw`, and both arms err large: over-claiming
  costs bytes, under-claiming costs the legibility the control exists for.

After the fix: 900px panned on the phone, at 200% and at 400%; 1150px fitted on
the desktop, three pixels off the previous 1153 because the expression keeps the
fitted case 2px inside its container so it cannot round into a scrollbar.
Served candidates 1920px at 1440x900, 1920px on the 2x phone, 3840px at 4x.

### Verification

`cap/viewer.mjs`, 90 checks at 1440x900, 390x844, 200% zoom and 400% zoom (the
reflow threshold in WCAG 1.4.10), plus reduced motion. The trigger reached by
Tab from the top of the page; opened by both Space and Enter; a labelled
`aria-modal` dialog; focus starting on Close; the original file at the highest
resolution the layout needs; the enlarged view at least 1.3x the figure; the
picture either fitted whole or pannable inside a frame that itself fits; a
visible Close control fully inside the viewport at every width, 65x34; no dead
next and previous for a one-item sequence; the page locked while open; focus
never leaving the dialog across nine Tab and Shift+Tab presses; Close activated
from the keyboard; focus returning to the trigger; scroll position preserved
exactly, checked from the top of the page and again from 400px down; the page
unlocked afterwards; and no horizontal overflow open or closed.

`cap/galleryregress.mjs`, 12 checks: the shared viewer still fits a photograph
whole with nothing to pan, still offers Previous and Next, still reaches all
five by ArrowRight, and still closes on Escape with focus restored.

Re-run and passing: route audit 90/90, product figure 75/75, composition
103/103, navigation 96/96, controls 67/67, integrity 31/31. `pnpm lint` clean,
`tsc --noEmit` clean, 24 tests, build compiled.

### Two assertions of mine that were wrong

The gallery regression check called a portrait photograph too small at 515px
wide on a 1440px screen. It is height-bound at 772px, which is the whole space
available; a width threshold is the wrong test for a portrait image. And
`cap/viewer.mjs` first asserted only that the enlarged image "fits the screen",
which every one of the four viewports satisfied while three of them were
showing something no bigger than the figure. Passing that check was how the
real problem stayed hidden; it now compares against the figure's own width.

### Not performed

No real touch device, so panning was driven by measuring `scrollWidth` against
`clientWidth` rather than by a finger. 200% and 400% zoom are emulated as a
halved or quartered viewport at a raised pixel ratio, which reproduces the
layout but not a real zoom's font boosting. No screen reader. No OS-level
reduced-motion setting.

One thing I did not add: a visual hint that the enlarged screenshot can be
panned. On a phone the scrollbar appears only during the gesture, so a visitor
may not realise there is more to the right. Adding an affordance would be new
chrome rather than a fix to something reproduced, and it cannot be judged
without a real device.

### Evidence gap, unchanged

The figure shows the product; it says nothing about what Rafi did. Still wanted:
a screenshot or a short recording of one real Octolane workflow, with enough
context to say what he did and what the team did. Still open too: production
measurements, a delivery timeline beyond YC W24 and the acquisition, a public
profile URL, a favicon, and whether to use `03-screen-shot.webp` with its named
customers and deal values.

## Pass: two interaction refinements

No 56-second recording reached me. Nothing was attached to the message and the
longest film in this session is 16.76s, so the two problems were reproduced by
measurement instead, which is firmer evidence than reading a video. Both were
exactly as described.

### 1. The comparison control row

Measured, before: the button carried "Replay comparison" at 180px, "Pause" at
93.1px and "Resume" at 105.7px, so the caption beside it sat at x=500, then
413.1, then 425.7. **An 87px jump on the first press.** On a phone the caption
already wrapped to its own line and never moved, which is why the recording
only shows it on desktop.

The play control now reserves the width of the widest label its own table can
return. `WIDEST_PLAY_LABEL` in `demo/labels.ts` is derived from `playLabel`
rather than written out, so new wording cannot leave the reservation behind,
and `ControlButton` takes an opt-in `reserve` prop. Every other control is
untouched.

The reservation is a CSS `content` string on a hidden pseudo-element, not a
second copy of the text in the DOM. A duplicate sized correctly but put the
ghost into `textContent`, so a button reading "Pause" answered
"PauseReplay comparison" to anything reading it back, my own settle loops
included, and one of them exited a run early because it saw "Replay comparison"
in a button that was still playing. `visibility: hidden` keeps the
pseudo-element out of the accessibility tree while it still takes its width.

The label is left-aligned in the reserved cell. Centring it stranded the icon
at the far edge, which is a different look from the resting state.

After: one width, 180px desktop and 184px mobile, across three full runs
sampled every 70ms; caption at x=500 and x=24 respectively, never moving on
either axis; the phone still wraps; all three labels still appear; the focus
ring is unchanged.

### 2. The photography viewer's controls

Measured, before: stepping from a portrait to the one landscape frame moved
Close's right edge from 977 to 1299 and the arrows with it, **322px**, because
the frame shrank to the picture and the controls rode along.

The frame now spans the overlay and the picture is centred in what is left, so
the controls sit at a fixed distance from the viewport's own corners. They stay
inside the dialog element because the Tab handler contains focus to what is
focusable within it. The caption is centred, since the column is now as wide as
the overlay rather than as wide as the picture.

After: Close at (1416, 24) and the arrows at (1301, 24) on desktop, (374, 16)
and (259, 16) on the phone, identical across all seven steps through the
sequence. Every photograph keeps its own ratio to within 0.02 (portrait 0.667
against a natural 0.666, landscape 1.5 against 1.499) and the frames are still
different sizes, 519x779 beside 1168x779, so nothing was cropped to match.

One thing this exposed: the product screenshot's pan expression had been
rewritten to measure `100%`, which in a width context is the container's width,
not the height I meant. The picture came out wider than the screen with the
overflow unreachable, because a flex box that centres its child does not make
overflow scrollable. It is back to measuring the viewport height, and the
product branch is a plain scrolling block that centres itself with a margin
when it fits.

### 3. The case-study demo, inspected on its own page

Not inferred from the story page's comparison; opened at
`/explorations/studio/making-a-response-readable` and driven there.

**No clipping found.** Text was checked at rest, every 150ms through a run, and
at the end, at 1440x900, 390x844 and 200% zoom, by walking up from each text
element to the nearest ancestor that hides or clips overflow and comparing the
boxes. Nothing lost on any edge, no horizontal overflow, no console errors.
All four combinations, Raw arrival and Considered reveal against Normal and
Delayed tool result, ran to the end with an answer and no unrendered markup.

My first version of that check scanned `document.body.innerText` for `**` and
failed all twelve combinations. The article quotes `**` in `<code>` to explain
the problem it is about, and Next's payload carries it in `<script>`; none of
it was in the demo. Scoped to the demo element, all twelve pass. That is the
same over-broad-scope mistake I have now made three times in different clothes.

**Found but not changed:** the case study's own control row has the identical
defect. Its button goes 180px at rest to 93.1px playing to 105.7px paused, and
the Reset button beside it moves with each change. This pass was scoped to the
story page's comparison, so it is left alone; the fix is one `reserve` prop on
that button whenever it is wanted.

### Verification

New: `cap/stable.mjs`, 91 checks. Three full runs per width with the control
row sampled continuously; the incomplete Markdown still showing on the left and
the right still waiting, both sides finishing identical; the product viewer and
the photography viewer both opened from the keyboard at 1440x900 and 390x844,
each with Close inside the viewport, focus starting on Close, no horizontal
overflow, focus returned to the right trigger and the scroll position restored
to the pixel (233 and 1738 on the phone); portrait-to-landscape stepping at
both widths; and the case-study demo as above.

Re-run and passing: `cap/viewer.mjs` 90/90, `cap/product.mjs` 75/75,
`cap/galleryregress.mjs` 12/12, route audit 90/90, composition 103/103,
navigation 96/96, controls 67/67, integrity 31/31. `pnpm lint` clean,
`tsc --noEmit` clean, 24 unit tests, build compiled.

Shared timing untouched: the fixture, the clock and the preview tests are
unchanged, and the integrity suite still proves one stream on one clock.

### Not tested

No real touch device, so the phone was emulated at 390x844 with `hasTouch` and
panning was verified by measuring `scrollWidth` against `clientWidth` rather
than with a finger. 200% and 400% zoom remain emulated as a reduced viewport at
a raised pixel ratio. No screen reader. No OS-level reduced-motion setting. And
I did not review the recording, because it did not arrive.

## Pass: the comparison section removed, and the evidence review

### The removal

`/explorations/story` now holds three sections: Introduction, Octolane, and the
photography closing with both contact paths. The streaming comparison section
is gone in full, heading and question and panel and tradeoff and the
case-study link with it, on the instruction that this supersedes the original
brief's requirement to keep it.

The standalone demo is untouched. `CompactComparison`, `StreamingDemo`, the
fixtures, `labels.ts`, the clock and all 24 unit tests are exactly as they
were, and the case study at `/explorations/studio/making-a-response-readable`
still owns a working demo with both modes and both scenarios.

Removed alongside it: the `CompactComparison` and `Link` imports, and the
`decisionHeading`, `decisionQuestion`, `decisionCaption`, `decisionTradeoff`,
`readLabel` and `readHref` entries in `STORY`, since nothing rendered them any
more.

One consequence to know about: **Story no longer links to the case study.** The
article is still reachable at its own route and from Studio, and its
`?from=story` arm is still correct for a direct visit, so it is left in place
and would work again if the link ever comes back. If a link from Story is
wanted without the panel, it is one line.

Page height fell from 2470px to 1970px at 1440x900, and from 2535px to 1870px
at 390x844.

Verified: new `cap/shape.mjs`, 32 checks at 1440x900, 390x844 and 200% zoom.
Three sections in order; no demo mounted and no playback control anywhere; none
of the seven pieces of comparison text left in the page; no link to the case
study; the introduction, the Octolane figure with its View larger control, the
photograph with its gallery, and both mailto paths all intact; no horizontal
overflow; no console errors. Plus a check on the case study itself that its
demo still runs to a finished answer with no open markup.

Re-run: route audit 89/89 (down one: the story-to-article link it used to
follow is gone), `cap/product.mjs` 75/75, `cap/nav.mjs` 75/75, `cap/viewer.mjs`
90/90, `cap/galleryregress.mjs` 12/12. `pnpm lint` clean, `tsc --noEmit`
clean, 24 tests, build compiled.

Retired, because what they measured no longer exists on this page:
`cap/controls.mjs`, `cap/integrity.mjs`, `cap/stable.mjs`'s control-row arm and
`cap/verify10.mjs`'s comparison arm. The demo's behaviour is still covered by
the 24 unit tests, by the route audit's mode and scenario runs on the case
study, and by `cap/stable.mjs`'s case-study arm.

Two of my harnesses referred to the removed section and were re-scoped, not
deleted: `cap/product.mjs` measured the figure against the comparison's width
and now measures it against the container it was asked to match, and
`cap/nav.mjs`'s story-origin arm now asserts the link's absence and tests
`?from=story` as a direct visit.

## Evidence review: which product flow to feature

Asked for one substantial existing flow, supported by implementation history I
can actually reach and by Rafi's own contribution, with Ask Octolane completing
a useful action given priority. This is the answer, with the references.

### Recommendation: the long-horizon agent run behind Ask Octolane

A question typed into Ask Octolane becomes a durable agent run: it is
dispatched, worked by sub-agents whose progress the reader can watch, judged
for grounding and convergence before it is allowed to finish, and continued or
reactivated if it is interrupted. That is Ask Octolane completing a useful
action rather than answering a question, and it is the flow where Rafi's own
contribution is clearest in the record.

### His contribution, as the repositories record it

Design first, in his own hand, before the code existed:

- `docs/rfcs/agentic-background-jobs.md`, 225 lines, his commits from
  2026-05-12.
- `docs/rfcs/long-horizon-agent-runs.md`, 288 lines, 2026-06-07 — the same week
  the module below begins.
- `apps/aiChat/plans/oct-4074-stream-live-usage-continuation-reactivation.md`,
  154 lines, 2026-08-26, matching the continuation code shipped that day.
- `apps/aiChat/docs/AI_CHAT_INTERNALS.md`, 14,380 lines, largely his.

The implementation, in `octolane-org/octolane-backend`:

- `apps/aiChat/src/modules/agentRun` — 71 files, 14,403 lines, **100 of 115
  commits his**, spanning 2026-06-07 to 2026-08-26. The Temporal workflow,
  worker and activities; `dischargeHandler` and `dischargeContinuation`; the
  judge (`convergence`, `grounding`, `rubricPrompt`, `runJudge`); sub-agent
  runs and their output envelope; `railResolver`; `pinnedMemoryExtractor`;
  `gateItemStatus`. Tests sit beside most services, plus
  `__integration__/dischargeLoop.contract.test.ts`.
- Named commits of his, by SHA: `09d3e1ca7` (2026-06-07, discharge handler and
  queue infrastructure), `335ccd68f` (2026-07-04, Temporal Phase 1 with a
  crash-resume proof), `25373eabe` (2026-07-05, Phase 2 durable sub-agent
  discharge), `4d3e698dc` (2026-07-05, workflow loop coverage), `61877252c`
  (2026-07-08, durable reactivation idempotency and reflect-retry judge),
  `643093ef4` (2026-07-18, converging futile judge retries).
- Merged pull requests he authored: **#3731** "Long-horizon v0.4: sub-agent
  discharge loop + Phase 2 CSV imports", 33 commits, +19,454/-2,820 across 433
  files, merged 2026-06-10. **#3958** "aiChat: progress rail, sub-agent crash
  reaper, v7 SSE shim + Temporal pilot", 37 commits, +21,061/-336 across 97
  files, merged 2026-07-14. **#3985**, merged 2026-07-18. **#4224**
  (OCT-4074, live usage across continuation and reactivation), merged
  2026-08-26.
- The visible half, in `octolane-org/octolane.com`:
  `src/app/(app)/chat/components/RunProgressRail` — 9 files, 1,364 lines, **13
  of 19 commits his**, 2026-07-11 to 2026-07-26. This is what a reader would
  actually see working.

Context, so the above is not read as more than it is: `apps/aiChat` overall is
773 of 1,227 commits his; the backend repository is 12,960 of 17,828 (73%) and
`octolane.com` 11,822 of 20,271 (58%). He is still shipping in it — six open
PRs of his today, including OCT-4122 and OCT-4139.

### What to be careful about when writing this up

- **The two large PRs bundle other work.** #3731 also carries Phase 2 CSV
  imports and #3958 an SSE shim, so their diff totals are not all this flow.
  The module-level figure, 100 of 115 commits in `agentRun`, is the honest
  measure of the flow itself.
- **The Ask-question overlay is not his.** `AskUserQuestionOverlay` on the
  front end is 29 commits Yash Sehgal against 13 of his, so the clarifying
  question interaction should not be described as his work.
- **Some commits are AI-assisted.** `Claude` appears as an author on 59
  commits in `apps/aiChat` and 5 in `agentRun`, on his branches. Small, but
  worth knowing before writing "built by hand" anywhere.
- The team built the product. The RFCs, the durable execution work and the
  judge are the parts the history attributes to him specifically.

### What is still missing, precisely

1. **No capture of this flow.** Nothing in the supplied or company assets shows
   a run completing: no screenshot of the progress rail mid-run, no recording
   of a question turning into a finished action. The one product image on the
   site shows the ask box with an unsent request and stops there. **The exact
   thing wanted: a screenshot or short screen recording of one Ask Octolane run
   from the typed request through the progress rail to the completed action,
   with demo data he is willing to publish.**
2. **The evidence is private.** Every reference above is checkable by anyone
   with access to the two repositories and by nobody else. To make the claim
   public he would need either a capture he approves or a public write-up of
   his own; PR numbers and file paths cannot be verified by a visitor and
   should not be printed on the site as if they could.
3. **No production outcomes.** No latency, reliability, adoption or cost
   figures for this flow, so the write-up can describe what it does and what he
   built, and must not claim what it achieved.

Nothing was added to any page as a result of this review. The recommendation is
a recommendation.

## Evidence review, completed: which flow to feature

Written deliverable, not a page change. Nothing was added to any route.

### The three candidates, measured

Ownership is counted by commits touching the path, against Rafi's three git
identities, in `octolane-org/octolane-backend`.

| Candidate | Path | Size | His share | Active |
| --- | --- | --- | --- | --- |
| **Ask Octolane completing an action** | `apps/aiChat/src/modules/agentRun` | 71 files, 14,403 lines | **100 / 115 = 86%** | 2026-06-07 .. 08-26 |
| Meeting intelligence, capture | `apps/meetingRecorder` | 146 files, 18,298 lines | 140 / 212 = 66% | 2026-02-06 .. 09-08 |
| Meeting intelligence, summarisation | `apps/aiChat/src/modules/meeting` | 58 files, 9,808 lines | **3 / 62 = 4%** | 2026-05-17 .. 08-13 |
| Automations | `apps/workflowService` | 169 files, 12,363 lines | 21 / 73 = 28% | 2026-01-30 .. 09-04 |

Adjacent, for context: `apps/mcp` 118/180 (65%), `packages/ai` 145/253 (57%),
`src/modules/tasks` 36/50 (72%) but only 1,974 lines,
`apps/aiChat/src/modules/dreamMode` 2/82 (2%).

**Selected: the long-horizon agent run behind Ask Octolane.** It has the
highest ownership share of any substantial surface, it is the only one with a
design document in his own hand predating the code, and it is the only
candidate that is itself a user-visible flow rather than infrastructure.

Meeting intelligence was the closest rival and is worth knowing about, because
it splits: he owns two thirds of the recorder that captures a meeting, and
almost none of the AI that summarises it. Featuring "meeting intelligence"
without that split would attribute the summarisation to him. Automations is a
team surface at 28% and should not be presented as his.

### The flow

A request typed into Ask Octolane becomes a durable agent run. When the agent
fans out, the parent discharges its own LLM context, persists its intent as an
`agent_runs` row and exits. Sub-agents run as independent jobs. When their
completion criteria are met an orchestrator reactivates the parent in a fresh
LLM call with their results merged in, and the cycle repeats until the goal is
reached. Completion is gated by a judge that scores convergence and grounding
before the run is allowed to finish.

### His contribution

- **The design, before the code.** `docs/rfcs/long-horizon-agent-runs.md`,
  288 lines, authored `rafi@octolane.com`, dated 2026-06-06, with
  `docs/rfcs/agentic-background-jobs.md` (225 lines) from 2026-05-12 as the
  companion. `apps/aiChat/plans/oct-4074-stream-live-usage-continuation-reactivation.md`
  (154 lines, 2026-08-26). `apps/aiChat/docs/AI_CHAT_INTERNALS.md`, 14,380
  lines, largely his.
- **The implementation.** `apps/aiChat/src/modules/agentRun`, 100 of 115
  commits: the Temporal workflow, worker and activities; `dischargeHandler`
  and `dischargeContinuation`; the judge (`convergence.ts`, `grounding.ts`,
  `rubricPrompt.ts`, `runJudge.ts`); `SubAgentRunsService` and
  `subAgentOutputEnvelope`; `railResolver`; `pinnedMemoryExtractor`;
  `gateItemStatus`; `AgentRunSourcesService`. Tests sit beside most services,
  plus `__integration__/dischargeLoop.contract.test.ts`.
- **The visible half.** `octolane.com`,
  `src/app/(app)/chat/components/RunProgressRail`, 9 files, 1,364 lines, 13 of
  19 commits his, 2026-07-11 .. 07-26.

Commits, by SHA, all his: `09d3e1ca7` (2026-06-07, discharge handler,
chat integration, queue infrastructure) · `335ccd68f` (07-04, Temporal Phase 1
scaffold with a crash-resume proof) · `25373eabe` (07-05, Phase 2 durable
sub-agent discharge and the Docker worker) · `4d3e698dc` (07-05, workflow loop
coverage) · `61877252c` (07-08, durable reactivation idempotency and the
reflect-retry judge) · `643093ef4` (07-18, converging futile judge retries).

Pull requests, all authored by him, all merged into `dev`:

| PR | Title | Scale | Merged | Reviewed by |
| --- | --- | --- | --- | --- |
| #3731 | Long-horizon v0.4: sub-agent discharge loop + Phase 2 CSV imports | 33 commits, +19,454/-2,820, 433 files | 2026-06-10 | coffeewithone, approved |
| #3958 | aiChat: progress rail, sub-agent crash reaper, v7 SSE shim + Temporal pilot | 37 commits, +21,061/-336, 97 files | 2026-07-14 | coffeewithone, approved |
| #4224 | OCT-4074: stream live usage during continuation and reactivation cycles | 9 commits, +1,108/-75, 17 files | 2026-08-27 | coffeewithone, approved |

### Collaborators, named

- **One Chowdhury** (`coffeewithone`), co-founder: the approving reviewer on
  all three pull requests, and two commits inside the module.
- **Yash Sehgal**: 6 of the 19 commits on the progress rail on the front end.
- **Raonak** (3 commits), **Tariqul Islam** (2), **Shahriar Shabbir** (1),
  **Vitor Viesi** (1) inside `agentRun`.
- **`Claude`** appears as the commit author on 5 commits in `agentRun` and 59
  across `apps/aiChat`, on his branches. Worth knowing before writing anything
  that implies every line was typed by hand.

Two caveats on the PR numbers. #3731 also carries Phase 2 CSV imports and
#3958 an SSE shim and a crash reaper, so their diff totals are not all this
flow; the module figure, 100 of 115 commits, is the honest measure. And a
single approving reviewer is a two-founder review culture, not an absence of
review.

### One engineering decision, and its tradeoff

**Decision D3 in the RFC: replay by default, with pinned memory built but not
yet injected.**

On every reactivation the parent replays the full conversation rather than a
summary of it. The `pinned_memory` side index for load-bearing facts is written
from day one but deliberately not fed into the prompt.

The reasoning, in the RFC's own terms: replay preserves the model's natural
grounding turn to turn, where summarisation silently drops the identifiers a
later phase depends on. Building the pinned-memory plumbing immediately means
that when conversation length eventually forces truncation, pinned memory
becomes the floor and no architectural change is needed.

The cost is real and stated: every reactivation pays the full history in tokens
and latency, so the design trades money and time now against correctness, and
accepts carrying code that does nothing yet. The forcing incident behind the
whole RFC shows the scale of what it is buying: a 178 KB spreadsheet of 947
rows against a sub-agent offload budget of 5 x 4,000 characters, a turn that
burned 442K input tokens and four and a half minutes before falling back.

### Implemented, versus verified as released

This distinction matters and the repository answers only half of it.

**Implemented and deployed as code.** `09d3e1ca7`, `25373eabe` and `61877252c`
are all ancestors of `origin/ai-chat/main`, the production deploy branch for
the aiChat service, and prod promotion PRs into that branch continue through
2026-09-09.

**Not verified as switched on.** Both paths are gated, and the repository
defaults are off:

- `AI_CHAT_DISCHARGE_ORG_ALLOWLIST` defaults to `""`, commented in
  `config.ts` as "Empty default = no orgs run discharge = safe rollout".
- `AI_CHAT_TEMPORAL_ENABLED` defaults to `false`, and
  `apps/aiChat/.env.example` says "Ships DARK: leave
  AI_CHAT_TEMPORAL_ENABLED=false and the durable path is a no-op".

Those are repository defaults, not production values. **I cannot see the
production environment configuration, so I cannot confirm whether any
organisation has the discharge allowlist populated or Temporal enabled.**
Until that is confirmed, the honest claim is that the flow is built, reviewed,
merged and deployed behind a flag, with a documented rollout gate. It is not
"in production for customers" on the strength of anything I can read.

### The exact captures needed

Five, in one sitting, on a demo workspace he is willing to publish:

1. **The request.** Ask Octolane with a typed request that will genuinely fan
   out. The existing marketing screenshot already shows this state and could
   stand in.
2. **The run working.** The progress rail mid-run, with more than one sub-agent
   visible: `RunProgressRail` — `DesktopDock`, `RailPanels`, `SubAgentDetail`.
   This is the frame that shows a run rather than a chat, and nothing in the
   supplied assets shows it.
3. **A reactivation.** The moment the parent comes back with sub-agent results
   merged in, which is the whole point of the design and is invisible in a
   still of the finished answer.
4. **The finished answer with its sources**, from `AgentRunSourcesService`.
5. **The action's effect in the CRM** — the records the run actually changed,
   so "completing an action" is shown rather than asserted.

A single screen recording of one run, thirty to sixty seconds, would cover 1
through 4; 5 needs one more frame after it. Since the flag state cannot be
verified from here, the recording should be captured from whatever environment
actually has the path enabled, and the write-up should say which.

### Not on the site

Nothing above has been added to any page. Every reference here is checkable by
someone with access to the two repositories and by nobody else, so PR numbers,
SHAs and file paths must not appear on the website as if a visitor could verify
them. What can be written publicly, once a capture exists, is what the flow
does and what he designed and built; not what it achieved, since no production
measurements have been supplied.

## Corrections to the evidence notes

Five corrections, each re-checked against the code rather than reasoned from
the earlier notes. Where a correction changes what may be said publicly, the
draft follows the corrected version.

### 1. Commit counts are authorship clues, not contribution percentages

The earlier tables printed things like "100 of 115 commits = 86%" in a column
headed "his share". That reads as a share of the contribution, which a commit
count cannot measure. Commit counts say who touched a path and how often. They
say nothing about how much of the thinking, review, debugging or design each
person did, they reward committing in small increments, and they credit an
author for merges and mechanical edits alongside substantial work.

Restated: **Rafi is the dominant author of `agentRun` by commit count, and the
sole author of its design documents.** That is the claim the evidence supports.
The numbers stay in these notes as the trail behind that sentence, not as a
percentage of contribution. Nothing derived from them appears on the site.

### 2. Three separate states, not two

The earlier note collapsed deployment and availability. There are three:

1. **Merged.** The commits are on `dev` through pull requests #3731, #3958 and
   #4224. Verified by reading the merge state.
2. **Deployed as code.** `09d3e1ca7`, `25373eabe` and `61877252c` are
   ancestors of `origin/ai-chat/main`, the aiChat service's deploy branch.
   Verified with `git merge-base --is-ancestor`.
3. **Enabled for customers.** **Not established.** Two gates stand in front of
   it and both default off in the repository:
   `AI_CHAT_DISCHARGE_ORG_ALLOWLIST` defaults to `""` ("Empty default = no orgs
   run discharge = safe rollout") and `AI_CHAT_TEMPORAL_ENABLED` defaults to
   `false` ("Ships DARK ... the durable path is a no-op"). Those are repository
   defaults. I cannot read the production environment, so I cannot say whether
   any organisation has either gate opened. The allowlist's existence tells us
   the intended rollout is per-organisation, which is not the same as knowing
   any organisation is on it.

The draft says merged and deployed behind a rollout gate, and says the
customer-facing state is not established here.

### 3. The delegated path does not change CRM records

The earlier note implied the flow ends in a record change, and put "the CRM
records the run changed" on the capture list. Tracing the code says otherwise.

`apps/aiChat/src/modules/agentRun/worker/runSubAgentLLM.ts` resolves the same
tool set the parent uses and then removes every side-effecting tool before the
child model ever sees it. Its own comment: "children are read-only by default.
A future v2 may add an explicit `delegated_side_effect_tools` schema field on
spawn_sub_agent; v1 ships strict." Searching the source for
`delegated_side_effect_tools` returns that comment and nothing else, so
delegating a write is not implemented.

The reactivated parent is different. `runReactivation.ts` builds
`reactivationTools` as the resolved tool set plus widget and agent-control
tools, with no side-effect strip, so the parent keeps write-capable tools on
every cycle.

So the accurate statement, and the one the draft uses: **the delegated work is
read-only; any record change belongs to the parent turn.** A long-running run
can end in a write, but the delegation this case study is about is not what
performs it. The CRM-record frame is removed from the capture scenario, because
showing it would illustrate a claim this trace does not support.

### 4. Decision D3 checked against the current implementation

The RFC is dated 2026-06-06 and marked Draft. Intent and current behaviour
happen to agree here, and I checked rather than assumed.

`pinnedMemoryExtractor.ts` states its own status in its header: "Phase 1 of
long-horizon-agent-runs: WRITE-ONLY side index ... Reactivation today replays
the FULL chat history with sub-agent results substituted in. Pinned memory
isn't injected into the rebuilt prompt yet - it just accumulates." Grepping the
reactivation path for `pinned_memory` returns nothing, which matches. The
extractor is also explicitly heuristic, keyed on write-shaped tool-name
prefixes, and returns nothing at all for decisions.

So D3 holds today: replay the full history, write pinned memory, do not inject
it. Two things to keep separate anyway. The RFC is historical intent and still
says Draft; the header comment is the current behaviour. And the Phase 2 that
would make pinned memory load-bearing has not happened, so the cost described
in D3 is being paid now while the benefit is still deferred.

### 5. The spreadsheet incident is one incident

The earlier note used it as though it demonstrated the improvement. It does
not. It is a single documented failure, recorded in the RFC as the reason to
start, with no before-and-after measurement attached to it and nothing
comparing the old path to the new one. It motivates the work; it does not
evidence its result.

It also contains a customer's file, its size, its row count and the token and
time cost of their request. That is operational detail about a customer, so
none of those figures goes on the site. The draft describes the shape of the
task and stops there.

## The case-study draft, and the one capture to make

### What was written

`src/content/work/helping-an-agent-finish-longer-tasks.mdx`, registered in
`src/lib/work.ts`, with a homepage entry added ahead of the existing one in
`src/components/site/content.ts`. Nothing else on the site changed and nothing
was deployed, so the draft is reviewable only at the local URL.

The reading path is 433 words across the five sections asked for: the task that
did not fit, what I did, handing work out and picking it up, one decision and
what it costs, and where this stands. Three disclosures carry the technical
detail and all start closed: what survives a resume, what the helpers can and
cannot do, and how far the status can actually be verified. The homepage entry
is 42 words including its title and its read link.

`artifact: { kind: 'none' }`. There is no image, figure, canvas or demo
container on the page, empty or otherwise, because no authentic capture of this
path exists. The marketing screenshot stays where it is, on the story
exploration, as company context.

Kept off the page and only in these notes: commit and line counts, repository
and pull-request references, SHAs, and the incident's file size, row count,
token cost and duration.

### The capture to make, once

One screen recording of a single run, plus one still. Four beats, in order:

1. **The request.** Ask Octolane, with a request that will genuinely fan out.
   Type it live so the reader sees it entered rather than pre-filled.
2. **Visible progress.** The run panel with more than one helper working at
   once, long enough to read what each is doing. This is the frame that shows a
   run rather than a chat, and nothing supplied shows it today.
3. **The resume.** The moment the agent comes back with the helpers' results
   folded in and carries on. This is the whole point of the design and it is
   invisible in a still of the finished answer, so the recording has to cover
   it rather than cutting to the end.
4. **The final result.** The finished answer with its sources shown.

**No CRM record frame.** The earlier version of this list had one. Tracing the
code removed it: the delegated helpers run with every data-changing tool
stripped before the model sees them, so the delegated work cannot produce a
record change. The parent turn keeps write-capable tools, so a run can end in
one, but that is the parent acting, not the delegation this piece is about.
Showing a record change here would illustrate a claim the trace does not
support. If a record change is wanted later it needs its own trace of the
parent's write path and its own framing.

**Environment label.** The recording must carry, on the page or in the caption,
which environment it came from and that the data is a demo workspace. Since the
rollout gates cannot be read from outside production, the capture has to be
taken wherever the path is actually enabled, and the label has to say which
that was. "Recorded in a demo workspace with the durable path enabled" is
accurate if true; "in production" is not sayable on current evidence.

**Waiting time.** A real run waits, sometimes for minutes. If the recording is
sped up or if dead time is cut, the caption must say so and say roughly how
much, for example "shortened from about four minutes; the waiting between the
helpers finishing and the agent resuming is cut". An unlabelled speed-up would
misrepresent the latency, which is exactly the kind of claim there is no
measurement for.

**A suggested task**, chosen so the delegated half is read-only and honest: ask
for a comparison across several named accounts that requires reading email,
meetings and records for each, and a written summary at the end. It fans out,
it needs a resume, and nothing it delegates writes anything.

### Verification

`cap/draft.mjs`, 60 checks at 1440x900, 390x844 and 200% zoom. The homepage
entry present, first in the list, under 80 words, focusable with a visible ring
and opening the article by keyboard. The article's title matching the working
title; the five sections present and in order; three disclosures all closed and
all opening on activation and revealing content; no media container; no leak of
repository paths, PR numbers, SHAs, commit counts or the incident's figures; no
em dashes; all four collaborators named; the status stated as merged and
deployed but off by default; the delegated work described as read only; no
horizontal overflow; all text at AA; no console errors. Plus the story
exploration, the existing case study with its demo, and the studio exploration
all still rendering.

One caveat on my own probe: the word count it prints for the homepage entry is
unreliable, because at some widths the selector matched a shorter link. The
entry's copy was counted directly from the source at 42 words.

## Pass: connecting the case study to Story

The draft already existed from the previous pass. It was reviewed rather than
rewritten, one section was corrected against the code, and the page it was
missing from now links to it.

### The decision section was wrong, and the code said so

The instruction to confirm the implementation before describing the decision
earned its place. The draft said the agent "replays its whole conversation" and
that the index of load-bearing facts exists "so there is already a floor of
facts to keep when history has to be trimmed", implying the trimming was still
ahead.

Reading `runReactivation.ts` says otherwise. The resumed call rebuilds the
history up to and including the parent message, capped at 500 rows, and then
runs `trimHistoricalToolResults` over it. Trimming is happening now, and the
code's own comment gives the reason: a single tool result "can be 100K+ chars",
and without the guard a long chat's continuation "re-sends megabytes of dead
tool output and can blow the provider's prompt limit outright - the cycle dies
on a 400 and the user sees an empty failed continuation". In one mode the
stubbing is deterministic and age-keyed so the prompt prefix stays byte-stable
across cycles and the provider's cache still hits.

What remains true: the conversation is replayed rather than summarised, and the
pinned-memory index is written and still not read back, so it is not what
decides which tool results survive. Size budget and age decide that.

The article now says that. The decision reads as replay rather than summarise,
and where history must shed weight it sheds the bulkiest thing rather than the
narrative. The disclosure carries the deterministic stubbing and the fact that
the index is written but not yet consulted.

Re-confirmed at the same time, unchanged: helpers still have side-effecting
tools stripped, both rollout gates still default off, and the two commits are
still ancestors of the deploy branch.

### What was added

- `src/explorations/data.ts`: a `case*` block, three parts and a link.
- `src/components/explorations/story/StoryExploration.tsx`: a section between
  Octolane and photography, using the page's existing classes. Heading measured
  at the same face and size as the Octolane heading, Instrument Serif at 28px,
  and the same 64px section padding on desktop, 56px on mobile. 89 words. No
  artifact, no placeholder, no comparison.
- `src/app/explorations/studio/[slug]/page.tsx`: the preview route, previously
  a folder for one slug, now serves any published case study. One shell for
  both, so they cannot drift. Unknown slugs 404.

The link carries `?from=story`, which makes the article's existing origin table
useful again: entering from Story gives "Back to Story", entering from Studio
still gives "Back to Studio".

### Verification

`cap/connect.mjs`, 52 checks at 1440x900 and 390x844. The entry between
Octolane and photography in that order; headed with the working title; problem
and contribution both present; 89 words; the link descriptive and carrying its
origin; heading typography identical to the section above; section padding
identical; no artifact in the entry; the comparison still absent; no overflow.
Then the journey: the link focused and followed by keyboard, the article
opening under the exploration shell with its five sections and three closed
disclosures, no media container, the decision text matching what the code does,
the rollout status still hedged, no invented metric, both ways back pointing at
Story and landing on Story rendered. Then the other case study, still
previewing with its demo and still returning to Studio, and the live homepage
entry still first with its article still rendering.

`pnpm lint` clean, `tsc --noEmit` clean, 24 tests, build compiled with
`/explorations/studio/[slug]` dynamic and both work routes prerendered.

Two notes on the harness. The scratchpad had been cleared between sessions, so
`playwright-core` was reinstalled and only the new script exists; the earlier
suites' results stand for the code as it was when they ran, and this pass's
changes are covered by the new one. And my first spacing check measured the gap
between two section boxes and read 0px, because the gap lives inside the next
section's top padding. Comparing computed padding instead gives 64px against
Octolane's 64px. That is the same mistake recorded earlier in these notes,
measuring a box rather than its padded content.

## Editorial pass on the case study

### "Deployed" is now supported, and here is what supports it

The instruction was to say deployed only if a successful deployment record
identifies the revision. The earlier note's basis was weaker than that: it was a
branch-ancestry check against `origin/ai-chat/main`, which shows code reached a
branch, not that a deploy ran.

There is a stronger record. The aiChat service deploys through a Porter
workflow triggered on pushes to `ai-chat/main`, and its runs are visible:
`porter-app-3283-chat.yml` has a run with conclusion **success** on 2026-09-17
against head revision `ede2c95b1`. All four of the named agent-run commits are
ancestors of that revision, and all 71 files of the module are present in its
tree. So a successful deployment record identifies a revision containing this
work, and "deployed" is now the accurate word.

Worth noting what is not evidence: the 30 GitHub deployment records on the
repository are all `environment=staging` at a single revision. Production
deployment goes through Porter, whose own record I cannot read; the workflow run
is the part that is visible from here.

Customer access stays separate and still unestablished, for the same reason as
before.

### The incident, stated without the contradiction

The draft said both "the agent could not do it" and "finished by a slower
route", which cannot both be true as written. The record resolves it:

- The delegation path failed outright. The agent split the file sensibly and
  every attempt was rejected for exceeding the per-handoff size limit.
- The turn then fell back to working through the file inside the same
  conversation.
- The record notes the fallback beginning. It does not say whether the fallback
  completed the request, and the second failure it documents, a working set that
  only grows, is the reason that route is bounded too.

The article now says exactly that, including the part we do not know. It also no
longer implies that a few hundred rows inherently exceeds a model's context: the
cause was a handoff limit far smaller than the work, plus a context that only
grows.

### Other edits

- Both entries, on Story and on the live homepage, now carry the same two
  sentences: the problem and the contribution. Rollout status is out of them
  and lives in the article's status section, where three separate
  qualifications have room to stay apart. The link reads "Read the case study".
- "the resume" became "resuming execution" and "the machinery that resumes a
  run with results in hand". "Runs out of room before it runs out of task" is
  gone; the limit is described as what it is, a fixed amount of context per
  call. Section titles follow: "The request that failed", "Delegating, saving
  progress, resuming".
- The reading path is about 500 words, up from 433, because spelling out what
  failed, what the fallback did, and what remains unknown takes words. The
  decision, its cost, and all four collaborators are unchanged.

### Verification

`cap/connect.mjs`, 62 checks at 1440x900 and 390x844, including six new ones:
the entry as a single paragraph, rollout status absent from it, the link
wording, the opening specific to the incident rather than to row counts, the
fallback and the unknown both stated, "deployed" accompanied by its basis with
customer access kept separate, and the awkward phrasings gone. Plus everything
from the previous pass: section order, typography and padding matched to the
section above, no artifact, return navigation to Story, the other case study
still previewing and returning to Studio, the live homepage entry and article.

`pnpm lint` clean, `tsc --noEmit` clean, 24 tests, build compiled.

Two harness mistakes, both mine. The entry's paragraph count included the
link's own paragraph, because the filter still matched the old link wording;
it now excludes any paragraph containing a link. And two status checks read
`document.body.innerText`, which omits the contents of a closed `details`
element, so text that was present read as missing. Reading `textContent`
fixes it. That is a new one to remember: innerText is a rendering-aware
projection and disclosures are exactly where it differs.

## Evidence behind "deployed", recorded

Re-checked rather than carried forward, because the word does real work in the
article.

**Backend, the execution path.** `.github/workflows/porter-app-3283-chat.yml`
is the production deploy for the aiChat service: it triggers on pushes to
`ai-chat/main` and runs `porter apply` against Porter project 9381, cluster
3283, app `chat`, deployment target `0434ae77-601e-49b4-87c7-fe498ac523c9`,
with `PORTER_TAG` set to the short SHA of the revision being deployed. The run
for `ede2c95b1` finished with the job at `success` and, specifically, the
"Deploy stack" step at `success`. All four named commits are ancestors of that
revision and all 71 files of the module are in its tree.

So the record is: a production deploy command ran to success for an image
tagged with a revision that contains this work. That is more than a merge and
more than branch ancestry, which is why the article says deployed. What it does
not establish is the state of the running system, and the article says so.

**Front end, the progress panel.** `octolane.com` carries two GitHub
deployments to the `Production` environment, `8d33f8460` (2026-09-15) and
`9758900f1` (2026-09-14), both with status `success`, and both revisions
contain the panel's first commit `387b672dc`. So the panel has production
deployment evidence too.

Even so, "and shipped it" came out of the article. The record shows the work
reached production; it does not show who released it, and the sentence is about
contribution. "I introduced the panel" is the part the record supports.

**Still not established, unchanged:** whether either rollout gate is open for
any organisation. The gates' defaults live in an example configuration file;
the real values live in an environment I cannot read.

## Deployment evidence: closed

This has been re-opened three times. Settling it here so it is not re-litigated.

**The record, with identifiers.** Workflow `porter-app-3283-chat.yml`, named
"Deploy to chat", triggers on pushes to `ai-chat/main` and runs `porter apply`
against Porter project 9381, cluster 3283, app `chat`, deployment target
`0434ae77-601e-49b4-87c7-fe498ac523c9`, tagging the image with the revision's
short SHA. Run `35172914574`, 2026-09-17T02:03, revision
`ede2c95b1ad06bd01a4153edff206457aaf725ce`, conclusion **success**, with the
"Deploy stack" step itself at success. That revision's tree carries all 71
files of `apps/aiChat/src/modules/agentRun`, and `09d3e1ca7`, `335ccd68f`,
`25373eabe` and `61877252c` are all ancestors of it.

**The front end**, for the progress panel: two GitHub deployments to the
`Production` environment, `8d33f8460` and `9758900f1`, both with status
`success`, both containing the panel's first commit `387b672dc`.

**What that establishes.** A production deploy command ran to success for an
artifact built from a revision that contains this work. That is strictly more
than a merge and strictly more than branch ancestry, which is the test the word
"deployed" has to pass, so the article says deployed.

**What it does not establish, and the article says so.** The state of the
running system. A successful apply is a successful apply; I cannot query the
cluster, read the serving revision, or watch a request go through it.

**Separately unestablished: customer access.** Two gates,
`AI_CHAT_TEMPORAL_ENABLED` and `AI_CHAT_DISCHARGE_ORG_ALLOWLIST`, both off in
`apps/aiChat/.env.example`. That file is an example, not the production
environment, so its values say what the repository ships and nothing about what
production runs. The article keeps these as two different questions and claims
only the first.

**Closed.** Nothing further to check from here without access to the production
environment or the cluster. If either becomes available, the question worth
asking is narrow: is the allowlist non-empty for any organisation, and is
Temporal enabled.

## Mobile verification, 87 checks

Story and the case study at 320x568, 360x800, 390x844 and 430x932. No
horizontal overflow and nothing painting past the edge on either page at any of
them. Body copy at 13px or larger with leading at 1.4 or more; the measure
never exceeds 75 characters and tops out at 46 on the article. Every tap target
clears 24px; the disclosure summaries measure 55 to 77px.

Disclosures at 390 and 320, by keyboard and by touch: all four open and close
with Enter, all four open and close by tap, and none introduces overflow while
open.

Reading position, at both a phone and a desktop width. The reader leaves from
the case entry at scrollY 877 on the phone and 1178 on the desktop. The way
back returns them to 875 and 1168, with the heading 156px and 172px from the
top. The browser's own Back returns them to exactly the same place, since Next
restores the scroll position for a history navigation. Both routes land within
a couple of pixels of where the reader was.

Destinations confirmed on both pages, including that the article offers only
the way back and no other link.

### One assertion of mine was wrong again

I asserted that every section after the introduction shares one top padding,
and the page returned 40, 56, 56, 80. The 80 is the photography closing, given
a longer pause on purpose because that is where the subject changes, a decision
recorded earlier in these notes. The check now expresses the actual rule: the
two middle sections share a rhythm and the closing is deliberately longer. The
page was right and the test was encoding a rule nobody had made.

## Corner radius: one ladder, and three square corners fixed

Asked whether the radius was on a system everywhere. It was not, and one of the
gaps was a live defect.

### The defect

Three elements used `rounded-[var(--radius)]`, and `--radius` was never defined
in this project. An unknown custom property inside `var()` with no fallback
makes the declaration invalid at computed-value time, so `border-radius` fell
back to `0`. Measured in the browser: **0px, square corners**, on the homepage's
product artifact frame and on the case study's demo panes, sitting beside cards
at 14px and controls at 999px. An arbitrary Tailwind value cannot fail loudly,
which is why nobody saw it.

### What the product's own front end does

Read rather than guessed at. `octolane.com` keeps an absolute ladder in
`src/app/styles/variables.scss`, `--radius-1: 0px` through `--radius-20: 40px`
plus `--radius-full`, exposes it to Tailwind through `RADIUS_TOKENS` in
`tailwind.config.js`, and components ask for a rung by name
(`rounded-radius-8`, which is 221 of the uses, then `radius-7` and `radius-9`).
It also carries `cornerSuperellipse` for squircle corners, with a rule stated
in `Favicon.tsx` worth keeping in mind: corner-shape and border-radius are
independent, and round is the correct shape for a round radius.

### What this project has now

The same ladder, same numbers, same names, so a corner described in one
repository means the same thing in the other. Over it, four semantic names,
because a component should ask for a meaning rather than a rung:

    --r-xs  -> --radius-4   3px
    --r-sm  -> --radius-5   4px
    --r-md  -> --radius-8   8px
    --r-lg  -> --radius-11  14px
    --r-pill -> --radius-full

Only the semantic names become Tailwind utilities, so components read
`rounded-md`, not `rounded-[var(--r-md)]`. That is the point of the change: an
arbitrary value silently resolves to nothing, a missing utility does not. The
workbench palette still retunes `--r-md` and `--r-lg` to squarer rungs, which
is why the semantic layer stays rather than the ladder being used directly.

Superellipse corners were not adopted. They would change every corner on the
site, which is a redesign and was not asked for.

### What actually changed on screen

Every computed radius on the homepage, the case study, Story, About and Studio
was captured before and after. The only differences are the three that were
broken: the artifact frame is 14px again and the four demo panes are 8px again.
Everything else is identical in effect. Pills read 9999px rather than 999px
because the ladder's full rung is 9999px; the tallest pill on the site is 40px,
so both clamp to the same shape.

One deliberate 1px change: inline code was `rounded-[3px]` in the prose
components and `rounded-[2px]` in the demo, two values for the same element.
Both are `--r-xs` now, which is 3px.

### A regression I introduced and caught

Moving the strays onto the ladder, I wrote `rounded-4` and `rounded-3` in the
components. Those rungs are variables, not Tailwind theme keys, so no utility
was generated and inline code computed to 0px: precisely the failure I was
fixing, reintroduced within the same edit. The answer was not to expose twenty
numeric utilities but to give the smallest corner a name, `--r-xs`, like the
other three. Caught by the check that asserts no element with a rounded class
computes to 0px, which is now part of the suite.

## Writing: the structure, with no articles in it

Built to receive articles; nothing invented to fill it. The registry is empty,
so the section on the story page is absent, the archive says it has nothing,
and the sitemap does not mention it.

### How it works

`src/lib/writing.ts` is the same shape as `work.ts`: an MDX file exports `meta`,
one line registers it, no page changes. Fields are slug, title, description,
date, optional `updated`, status, and optional `sections` for the reading rail.
Two content types with two conventions would be one convention too many, which
is why this mirrors the existing one rather than inventing a second.

Everything public reads `publishedWriting()`, which filters to published and
sorts newest first. A draft is therefore absent from the story list, the
archive and the sitemap for the same reason its own URL 404s, rather than
because three separate places each remembered to exclude it.

- `/writing` is the archive: title, sentence, date, newest first. No cards, no
  thumbnails, no categories, no search.
- `/writing/[slug]` reuses the case study's reading shell, the 82rem grid with
  its 10rem rail and the 58rem column, and drops the case-study metadata block.
  A case study has a role and an artifact; an article has a date. The rail is
  only rendered when the article declares sections.
- The story page shows the three newest between the case study and the
  photography closing, and "All writing" only when there are more than three.
  The section is not rendered at all while there are none.
- The navigation gains a Writing link when the first article is published, for
  the same reason: a link to an empty archive is a dead end.
- `src/app/sitemap.ts` is new, built from the same sources the pages read, and
  takes its host from `site.url`. It lists the homepage, About and the case
  studies; it adds the archive and the articles once there are any; it excludes
  the exploration routes, which are noindex.
- Articles carry a canonical URL, an OpenGraph article type with
  `publishedTime` and `modifiedTime`, and the author.

`formatArticleDate` is new alongside `formatDate`. A case study is dated to the
month, which suits a stretch of work; an article is published on a day and a
reader scanning a list wants to know which one. The `datetime` attribute is the
ISO date either way.

### Verified with fixtures, then verified empty

Five throwaway fixtures were registered, four published and one draft, the whole
path was checked at desktop and mobile, and then they were deleted. 52 checks
passed with them present: the section between the case study and photography,
three entries newest first, the draft absent, each entry a linked title with a
sentence and a date, no cards or images, "All writing" appearing at four, the
heading and section padding measured identical to the section above, titles
carrying the in-page link style, the article rendering without role or artifact
metadata inside the reading width, canonical URLs on the article and the
archive, the archive listing all four with the draft absent, Writing joining the
navigation, the draft URL returning 404, and the sitemap listing the archive and
the four articles, excluding the draft and the explorations, on the configured
host.

Then 9 checks with the registry empty again: no writing section, story back to
its four sections, nothing linking to the archive, no Writing in the navigation,
`/writing` still resolving and saying plainly that nothing is published, an
unknown slug 404ing, and the sitemap back to its four public URLs.

The fixtures are gone. `src/content/writing/` holds only a README describing
the convention.

### Waiting on

The article itself. Nothing in the structure names or dates anything, and the
first entry needs one MDX file and one line in the registry.

## The first article, added as a draft

The supplied artifact was read in full and converted to MDX at
`src/content/writing/your-agents-knowledge-base-is-not-a-retrieval-problem.mdx`.
Title, standfirst, every section heading, every subhead, the comparison table,
the three callouts, the three pull quotes, the ten-point checklist, the credit
note and the endnote are the article's own words. Nothing was summarised,
reordered or added.

### Why it is a draft

**The article carries no publication date.** Its byline is "Octolane
Engineering" and "~15 min read", and no date appears anywhere in the source. So
the date field is empty and the status is draft, which keeps the piece off the
story page, out of the archive, out of the navigation and out of the sitemap,
and makes its own URL 404. Nothing invented a date to get around this.

A guard was added to `publishedWriting` for the same reason: an entry marked
published without a valid ISO date is withheld and logged, rather than
rendering "Invalid Date" in the list and carrying a broken `lastModified` into
the sitemap.

**It is bylined to a team, not to a person.** A `byline` field now exists on the
model and is rendered on the article and in the archive when present, and feeds
the OpenGraph author. Putting a company engineering post under a personal
Writing section without saying whose it is would misattribute it.

### What the article needed from the pipeline

- **remark-gfm**, for the comparison table. Named as a string in
  `next.config.ts` rather than imported: Turbopack passes loader options across
  a boundary that only takes serialisable values, and handing it the imported
  function fails the build outright.
- **Table components** in the prose map. The table breaks out wider than the
  reading column and scrolls inside its own box, so a 34rem table is readable
  on a 320px screen without the page itself scrolling sideways.
- **A `Callout` component** for the article's three labelled asides. Not a
  Disclosure: a disclosure hides detail the reader may skip, and these are
  lines the reader should not skip, so they are always open.

### Verified by publishing it temporarily, then reverting

46 checks at 1440x900, 390x844 and 320x568 with the article published under a
temporary date, before restoring the draft: the title and standfirst are the
article's own, the byline names Octolane Engineering, all ten sections and all
eighteen subheads render, the table renders whole at nine rows by three columns,
three callouts, three pull quotes, the ten-point checklist, the contents rail
listing every section, the canonical URL, no horizontal overflow at any width,
and no console errors. Then the story page showing it between the case study and
the photography closing, one entry with no "All writing" link since there is
only one, and the sitemap carrying the archive and the article.

Then reverted to draft and re-checked: 9 checks confirming the story section is
absent, nothing links to the archive, Writing is not in the navigation, the
archive says nothing is published, the article's URL 404s, and the sitemap is
back to its four public URLs.

### Three assertions of mine were wrong, not the page

I guessed fifteen subheads; the source has eighteen. I counted `ol > li` across
the document, which swept in the contents rail's ten items alongside the
checklist's ten. And I flagged thirty-three elements as painting past the edge
when all thirty-three were table cells inside the box that scrolls, which is
exactly how a wide table is meant to behave on a phone.

### Waiting on

**The publication date.** One line, and the article publishes itself: the story
page lists it, the archive fills, Writing joins the navigation, and the sitemap
gains two URLs.
