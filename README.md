# VolleyTrack standalone site

Static marketing and support site for `volleytrackapp.com` (GitHub Pages, apex custom domain).

Implements the **VolleyTrack Website Redesign** from Claude Design
(project `ac09ec17-4ed7-408c-a25f-590c65a90238`), built on the VolleyApp design
system — Match Red + Scoreboard Blue, warm neutrals, Archivo display, Roboto Mono
numerals. Published in the **prelaunch** release state.

## Pages

| URL | File |
|---|---|
| `/` | `index.html` |
| `/features/` | `features/index.html` |
| `/for-coaches/` | `for-coaches/index.html` |
| `/spectator-view/` | `spectator-view/index.html` |
| `/volleytrack-and-volleytally/` | `volleytrack-and-volleytally/index.html` |
| `/pricing/` | `pricing/index.html` |
| `/download/` | `download/index.html` |
| `/help/` | `help/index.html` |
| `/help/join-live-match/` | `help/join-live-match/index.html` |
| `/privacy/` | `privacy/index.html` |
| `/terms/` | `terms/index.html` |
| `/delete-account.html` | `delete-account.html` (stable URL for Google Play) |
| `/404.html` | `404.html` |

Shared: `assets/site.css` (design-system tokens + header/nav/button/card/footer
components), `assets/site.js` (form mailto fallback, help-search filter, article
feedback), `assets/volleytrack-ball.svg` / `volleytally-ball.svg` (brand marks).
Screenshots use the responsive AVIF/WebP/PNG set in `assets/images/screenshots/`
(320/640 via `<picture>`).

## Release-state flags (currently baked in)

- **siteState = `prelaunch`** — Home announcement strip, hero + closing CTAs, and the
  header CTA say "Get launch updates"; Download shows the email-capture form, not store
  badges. Flip to launch: swap those to store URLs/CTAs and drop "preparing/upcoming"
  language.
- **volleytallyIntegration = `on`** — the "join VolleyTrack Spectator View from VolleyTally"
  copy is present (Home tally line, Spectator-View "Two ways to follow", comparison
  "Join" row = Yes, plus "or VolleyTally" lines on Features / Download / Help-Article).
  Per the launch checklist this is gated on VolleyTally→VolleyTrack joining being verified
  on iOS + Android release builds — confirm before treating as final.

## Guardrails / outstanding before public launch

- **Forms** (`/download/`, `/delete-account.html`) fall back to a `mailto:` compose to
  `info@volleytrackapp.com` (honeypot-protected). Wire a real endpoint (Formspree-class
  or a Worker) before launch; keep the mailto fallback.
- **Legal** (`/privacy/`, `/terms/`) are **real, substantive policies** (effective
  2026-07-17), owner-authored from the app's actual data practices — Firebase
  (Auth/Firestore/Crashlytics/App Check/Functions), RevenueCat purchases, on-device STT +
  cloud transcript interpretation, cloud AI providers, Google AdMob non-personalized
  banners (Free plan; no ATT/IDFA), and account deletion. Terms governed by **Wisconsin**
  law. Recommend a counsel review and a re-check against the final shipped build; update
  the "Last updated" date if anything changes.
  - **iOS/Play consistency (do before submitting):** the app ships Google AdMob, so the
    App Store **App Privacy** answers and Google Play **Data Safety** form must declare
    AdMob's data collection, and the iOS `PrivacyInfo.xcprivacy` currently has an empty
    `NSPrivacyCollectedDataTypes` — confirm that matches reality with AdMob + Firebase in
    the build.
- **Help Center** ships one real article (`join-live-match`); the other featured titles are
  marked "Soon". Publish the P0 set (see the Help blueprint) and link them.
- **og:images** (1200×630, flat VolleyApp style) are still to be produced; `og:image`/
  `twitter:image` are intentionally omitted until they exist.
- **Fonts** load from Google Fonts; self-host/subset Archivo + Roboto Mono for the
  Lighthouse font-delay finding when convenient.
- `MobileApplication` JSON-LD is intentionally omitted from `/download/` until public
  store URLs exist (per the SEO spec).

## Local preview

`python3 -m http.server 8124 -d .` from this directory, then open
`http://localhost:8124/` (also wired as the `volleytrack-site` launch config).
