# Moodify

**Music discovery for your mood and the weather.**

Moodify is a collaborative web project that brings Spotify music discovery into a custom interface. It combines a listener's selected mood, favorite artists, and current weather conditions with track recommendations, search, artist exploration, and playback controls.

Built as a student team project in 2024, Moodify is preserved here as an early end-to-end web development project.

> **Project status:** Historical portfolio project. The original implementation uses Spotify Web API functionality whose availability has changed since the app was built. Some features may require updates or special API access to work today.

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

## Running the original project locally

Install dependencies and start the Next.js development server:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

The application also requires a configured Spotify developer application, OAuth callback, NextAuth configuration, and OpenWeather API credentials. Check [`pages/api/auth/[...nextauth].js`](./pages/api/auth/%5B...nextauth%5D.js), [`lib/spotify.js`](./lib/spotify.js), and [`components/organisms/Welcome.jsx`](./components/organisms/Welcome.jsx) for the original integration points.

**Security note:** The original code references some secrets using `NEXT_PUBLIC_` environment-variable names. In Next.js, that prefix is for values that may be exposed to the browser. **Do not configure real client secrets or signing secrets under those names.** Refactor the OAuth configuration to use server-only secret variables before deploying or reconnecting real credentials. Never commit a populated `.env` file.

## API compatibility

Spotify changed developer access to certain Web API endpoints after this project was built, including **Recommendations** and **Related Artists**. The original API-dependent screens may not function for an app without the required access. See Spotify's [2024 Web API changes](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api) and [2026 development-mode migration guide](https://developer.spotify.com/documentation/web-api/tutorials/february-2026-migration-guide).

## Contributors

This was a collaborative project with **Oscar Jiro Harlison**, **I Kadek Rio Arta Putra**, **Khanza Azzahra Putrida S.**, and **Vanessa Dwi Lestari**, as credited in the original application's About Us section.

---

*An early project worth preserving for its custom interface, third-party integrations, and the learning that went into building it.*
