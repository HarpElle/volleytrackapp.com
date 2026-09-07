# volleytrackapp.com — current state

Updated: 2026-09-07 by Claude Code (Fable 5.1)
Stage: **live** · Health: **attention**

VolleyTrack prelaunch site from the Claude Design redesign. Live and healthy;
both forms are mailto-only and need an endpoint or honest copy before the
store submission. Full review: `status/REVIEW_2026-09-04.md`.

## What is live / where main stands

- Live on GitHub Pages from `main` (`c25e410`), 13 pages, custom 404, HTTPS
  enforced, Cloudflare in front. All URLs return 200; internal links and
  assets resolve.
- Prelaunch state baked in: launch-updates CTAs, no store badges, no
  og:images, one real help article.
- Zero open PRs, one branch, zero Dependabot alerts, no CI.
- Review found 0 P0, 3 P1, 7 P2.
- The sweep noted one dirty local file; the checkout was not found on the
  Primary Mac (unverified).

## In flight

- Nothing in flight.

## Blockers

- None.

## Decisions for Jason

- None waiting (queue cleared 2026-09-07; accepted items are at the top of PLAN.md Next).
  Resend with an origin allowlist and Turnstile; keep the mailto fallback.
- Any analytics at launch? Recommended: no; keep the no-tracking position.
- Keep the unused screenshot derivatives in this repo? Recommended: prune to
  referenced files plus the two store badges.
- Counsel review of privacy and terms before submission? Recommended: yes,
  and re-check against the shipped build.

## Links

- [Repo](https://github.com/HarpElle/volleytrackapp.com)
- [Live](https://volleytrackapp.com)
- [Review 2026-09-04](REVIEW_2026-09-04.md)
