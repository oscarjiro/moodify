# Moodify

**Music discovery for your mood and the weather.**

> [!NOTE]
> **Built in 2024 · Original version preserved**
>
> Moodify is an early portfolio project, shared as it was originally built. I haven't recently tested its dependencies, Spotify integrations, or deployment against current services, so some features may need updates before they work again.

Moodify is a music-discovery web app developed by **Oscar Jiro Harlison**. It combines a listener's selected mood, favorite artists, and current weather conditions with track recommendations, search, artist exploration, and playback controls.

Built in 2024, Moodify documents one of my first full web development projects. The features below describe the original implementation, rather than a currently tested release.

## Features

- **Spotify sign-in:** Authentication through Spotify OAuth and NextAuth.js.
- **Mood-based discovery:** Positive, neutral, and negative mood presets mapped to audio-feature ranges, using Spotify's recommendations endpoint and the listener's top artists where available.
- **Weather-based discovery:** Current conditions from OpenWeather, with an optional browser location request and a default city fallback, used to select music recommendation criteria.
- **Music exploration:** Search for tracks and artists, browse new releases, inspect artist profiles, and see recently played music.
- **Playback experience:** A custom player interface with Spotify playback integration and controls, subject to Spotify account and API availability.
- **Interactive interface:** Responsive pages, carousels, transitions, and animations.

## Tech stack

| Area | Technologies |
| --- | --- |
| Web app | Next.js 13 (Pages Router), React 18, JavaScript |
| UI | Tailwind CSS, Framer Motion, Headless UI, React Three Fiber |
| State | Recoil, React hooks |
| Authentication | NextAuth.js, Spotify OAuth |
| Music data and playback | Spotify Web API, Spotify Web Playback integration |
| Weather | OpenWeather API |
| Deployment | Vercel (original deployment) |

## How it works

1. A listener connects their Spotify account.
2. Moodify reads permitted Spotify data to power discovery and browsing.
3. Selecting a mood applies a predefined set of audio-feature criteria to a Spotify recommendation request.
4. With location permission, the weather experience requests local conditions; otherwise it falls back to a default city.
5. The interface displays matching tracks, artist information, and playback controls.

The mood and weather matching is **rule-based**, not a trained machine-learning model. The criteria live in [`lib/moodCriteria.js`](./lib/moodCriteria.js).

## Repository guide

- [`pages/`](./pages): Next.js pages and the Spotify authentication route
- [`components/pages/`](./components/pages): Main application views
- [`components/organisms/`](./components/organisms): Player, navigation, carousels, and larger UI components
- [`components/molecules/`](./components/molecules): Smaller reusable interface components
- [`lib/`](./lib): Spotify configuration and mood/weather criteria
- [`hooks/`](./hooks): Spotify and track-information hooks
- [`atoms/`](./atoms): Shared Recoil state

## Running locally

These are the original development commands; compatibility with current dependencies and APIs has not been verified:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

The application also requires a configured Spotify developer application, OAuth callback, NextAuth configuration, and OpenWeather API credentials. Check [`pages/api/auth/[...nextauth].js`](./pages/api/auth/%5B...nextauth%5D.js), [`lib/spotify.js`](./lib/spotify.js), and [`components/organisms/Welcome.jsx`](./components/organisms/Welcome.jsx) for the original integration points.

**Security note:** The original code references some secrets using `NEXT_PUBLIC_` environment-variable names. In Next.js, that prefix is for values that may be exposed to the browser. **Do not configure real client secrets or signing secrets under those names.** Refactor the OAuth configuration to use server-only secret variables before deploying or reconnecting real credentials. Never commit a populated `.env` file.

## Spotify API compatibility

This project predates significant Spotify API changes. The following methods are used by Moodify:

| Code method | Spotify endpoint | What changed |
| --- | --- | --- |
| `getRecommendations()` | `GET /recommendations` | Restricted for new and many Development Mode apps since November 2024; affects mood- and weather-based discovery |
| `getArtistRelatedArtists()` | `GET /artists/{id}/related-artists` | Restricted under the same November 2024 policy |
| `getNewReleases()` | `GET /browse/new-releases` | Removed under the February 2026 rules for newly created Development Mode apps |
| `getArtistTopTracks()` | `GET /artists/{id}/top-tracks` | Removed under those February 2026 rules |
| `getUserPlaylists()` | `GET /me/playlists` | Still supported for the current user |
| `searchTracks()` / `searchArtists()` | `GET /search` | Still supported, with tighter result limits for affected apps |

**Important nuance:** Spotify postponed the March 2026 *endpoint-access* changes for existing Development Mode apps. The applicability of each change therefore depends on the original Spotify developer app's mode and registration date; this repository has not been tested with live credentials. Spotify has also introduced six-month refresh-token expiration, and the original `spotify-web-api-node` SDK is now archived. Artist follower and popularity metadata may be unavailable in newer API responses.

Official references: [November 2024 restrictions](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api), [February 2026 policy and postponement](https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security), [February 2026 migration guide](https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide), [June 2026 refresh-token changes](https://developer.spotify.com/blog/2026-06-18-refresh-token-expiration).

## Project credits

**Created and developed by Oscar Jiro Harlison.**

The original application retains its historical About Us screen, but that roster should not be treated as an attribution of software development work.

---

*An early project worth preserving for its custom interface, third-party integrations, and the learning that went into building it.*
