# Moodify

**Music discovery for your mood and the weather.**

> [!WARNING]
> **Legacy project · Unmaintained · Not verified to work today**
>
> This is a preserved 2024 project, **not an actively maintained or production-ready application**. Its older Next.js/React dependencies, Spotify Web API integrations, OAuth configuration, and deployment setup have not been updated or retested against current services. Installation, sign-in, music recommendations, or playback may fail. The original implementation is kept primarily as a portfolio and learning reference.

Moodify is a music-discovery web app developed by **Oscar Jiro Harlison**. It combines a listener's selected mood, favorite artists, and current weather conditions with track recommendations, search, artist exploration, and playback controls.

Built in 2024, Moodify documents an early end-to-end web development project. Its functionality is described below as originally implemented, **not as a guarantee of current compatibility**.

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

## Running the original project locally (historical instructions)

**These commands are unverified against current dependencies and API access.** In a safe local environment, the original workflow was to install dependencies and start the Next.js development server:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

The application also requires a configured Spotify developer application, OAuth callback, NextAuth configuration, and OpenWeather API credentials. Check [`pages/api/auth/[...nextauth].js`](./pages/api/auth/%5B...nextauth%5D.js), [`lib/spotify.js`](./lib/spotify.js), and [`components/organisms/Welcome.jsx`](./components/organisms/Welcome.jsx) for the original integration points.

**Security note:** The original code references some secrets using `NEXT_PUBLIC_` environment-variable names. In Next.js, that prefix is for values that may be exposed to the browser. **Do not configure real client secrets or signing secrets under those names.** Refactor the OAuth configuration to use server-only secret variables before deploying or reconnecting real credentials. Never commit a populated `.env` file.

## API compatibility

Spotify restricted developer access to parts of the Web API used here, including **Recommendations** and **Related Artists**, in November 2024. In 2026, Spotify also introduced additional Development Mode limits, though it **postponed the March 2026 endpoint-access changes for existing Development Mode integrations**. Actual behavior depends on the Spotify app's access level and age; this repository has not been retested. See Spotify's [2024 Web API changes](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api), [2026 developer-access update](https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security), and [migration guide](https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide).

## Project credits

**Created and developed by Oscar Jiro Harlison.**

The original application retains its historical About Us screen, but that roster should not be treated as an attribution of software development work.

---

*An early project worth preserving for its custom interface, third-party integrations, and the learning that went into building it.*
