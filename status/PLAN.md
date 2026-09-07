# volleytrackapp.com — plan

Updated: 2026-09-07 by Claude Code (Fable 5.1)

## Intentions

Prelaunch until the app is in the store. The site stays a dependency-free
static GitHub Pages site with no analytics or tracking. (The code agrees with
this; the only third-party call today is Google Fonts, which step 3 removes.)

## Now (current needs)

- Make the two forms honest before the store submission (steps 1 and 2).
- Prepare the launch flip so store approval day is a merge, not a rewrite
  (step 5).

## Next (in order)

- Accepted 2026-09-07: a Cloudflare Worker posting to Resend with an origin allowlist and Turnstile; keep the mailto fallback (from: Where do form submissions go)
- Accepted 2026-09-07: no; keep the no-tracking position (from: Any analytics at launch)
- Accepted 2026-09-07: prune to referenced files plus the two store badges (from: Keep the unused screenshot derivatives in this repo)
- Accepted 2026-09-07: yes, and re-check against the shipped build (from: Counsel review of privacy and terms before submission)
1. **Reword the form confirmations (S).** Files: `delete-account.html`
   (`#del-confirm` panel), `download/index.html` (add a small confirmation
   panel and `data-confirm` attribute), `assets/site.js` (no logic change
   needed). Copy: "Your email app should have opened with the request ready
   to send. If it did not, email info@volleytrackapp.com." Acceptance: submit
   each form in a browser with no mail client configured; the page never
   claims the request was received.
2. **Wire a real form endpoint (M).** Build a small Cloudflare Worker
   (`volleytrack-forms` or extend the shared HarpElle feedback-relay) that
   accepts JSON from `https://volleytrackapp.com` only, validates the
   honeypot and a Turnstile token, and emails `info@volleytrackapp.com` via
   Resend. Update `assets/site.js` to `fetch()` the Worker and fall back to
   `mailto:` on failure or when JS is off. Acceptance: a test deletion
   request and a test launch-updates signup both arrive in the inbox within a
   minute; a cross-origin POST is rejected; the no-JS path still opens mail.
3. **Self-host the fonts (S).** Download and subset Archivo 700/800 and
   Roboto Mono 300/400/500/700 (latin) as woff2 into `assets/fonts/`, add
   `@font-face` rules with `font-display: swap` to `assets/site.css`, remove
   the Google Fonts `<link>` and both `preconnect` tags from all 13 pages,
   delete the `tokens/` directory (unreferenced), and add a short "This
   website" paragraph to `privacy/index.html` stating the site sets no
   cookies and makes no third-party requests. Acceptance: DevTools network
   panel on the home page shows zero requests outside `volleytrackapp.com`;
   headings still render in Archivo.
4. **Prune unused images (S).** Delete the 141 unreferenced files in
   `assets/images/screenshots/` and the 10 unreferenced top-level images in
   `assets/images/`, keeping `app-store-badge.svg` and
   `google-play-badge.png` for step 5. Acceptance: the internal-link and
   asset check in `status/REVIEW_2026-09-04.md` passes with no MISSING
   lines; repo size drops by roughly 9 MB.
5. **Prepare the launch flip on a branch (M).** Branch `launch`: replace
   "Get launch updates" CTAs on `index.html` (header, hero, closing),
   `download/index.html`, and `for-coaches/index.html` with store buttons
   using the two badges; add `MobileApplication` JSON-LD to `/download/`;
   remove the prelaunch announcement strip and "preparing/upcoming" wording
   (grep `soon|preparing|upcoming|launch updates`); update README's
   release-state flags to `launch`. Leave the PR open and unmerged until the
   store URLs exist. Acceptance: the branch previews cleanly with
   `python3 -m http.server 8124 -d .`; every CTA links to a real store URL;
   `sitemap.xml` is unchanged.
6. **Publish the P0 help articles (M).** Write four articles under `help/`
   following `help/join-live-match/index.html`: Quick Start, Just Score vs
   detailed scoring, Start and share Spectator View, Correct a score or match
   entry. Turn their `help/index.html` cards into links and remove the three
   remaining "Soon" cards; add the new URLs to `sitemap.xml`. Acceptance:
   the help search finds each new title; no "Soon" badges remain.
7. **Produce og:images (S).** One 1200x630 site-wide image and one for
   `/spectator-view/`, flat VolleyApp style, saved under `assets/images/`;
   add `og:image` and `twitter:image` meta to every page. Acceptance: a
   social-card debugger shows the image for `/` and `/spectator-view/`.
8. **Copy pass for brand rules (S).** Replace the 22 em-dashes across 10
   pages with commas, periods, or colons; confirm American spelling.
   Acceptance: `grep -rc '—' --include='*.html' .` returns zero for every
   page.
9. **Verify or remove the VolleyTally cross-join copy (S).** Before the
   launch PR merges, confirm on iOS and Android release builds that a
   VolleyTally user can join a VolleyTrack Spectator View code. If not
   verified, remove the "or VolleyTally" lines in `download/index.html`,
   `help/join-live-match/index.html`, `spectator-view/index.html`, and the
   comparison "Join" row. Acceptance: every cross-app claim on the site has
   a tested build behind it.

## Later (not scheduled)

- Fold the repeated inline `style=""` patterns (768 total) into
  `assets/site.css` classes. Trigger: the next page-wide copy edit.
- Add a `workflow_dispatch`-only link checker (`lychee`) so broken links can
  be caught on demand without recurring CI cost. Trigger: the launch PR.
- Share the form Worker with `volleytallyapp.com`. Trigger: step 2 shipped.
- Retire or rewrite `docs/CLAUDE_DESIGN_HANDOFF_REQUIRED.md` (it describes
  the VolleyTally site and points at an SMB path). Trigger: any docs pass.
- Counsel review of `/privacy/` and `/terms/` and a re-check against the
  final shipped build. Trigger: store submission date chosen.

## How this plan is maintained

Any agent may reorder Next or add to Later with a `LOG.md` entry. Intentions
change only with Jason. Items move from Later to Next when they have a
trigger (a date, a shipped dependency, or a decision) written next to them.
