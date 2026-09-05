# StreamCore Frontend

Production-oriented React/Vite client for the StreamCore REST API.

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

Set `VITE_API_URL` to the backend `/api/v1` URL. The client sends cookies with every request because the backend issues HttpOnly access and refresh cookies. The Axios interceptor refreshes once on a 401 and queues concurrent requests during refresh.

## Architecture

```text
src/
  api/          resource clients and shared Axios instance
  app/          application-level providers and query configuration
  components/   reusable layout and UI primitives
  hooks/        TanStack Query hooks composed from API clients
  pages/        route-level screens
  routes/       auth-aware route boundaries
  stores/       Zustand client state (auth session and UI state)
  styles/       Tailwind entrypoint and global CSS
```

## Route map

- `/` authenticated video feed
- `/watch/:videoId` authenticated video player
- `/studio` authenticated video publishing workflow
- `/login` public login
- `/register` public registration

Add future authenticated screens inside the `ProtectedRoute` branch in `src/App.jsx`; keep server state in TanStack Query and ephemeral client state in Zustand.

## API modules

Resource modules mirror the backend endpoints: users/auth, videos, comments, likes, subscriptions, tweets, playlists, and dashboard. Each module returns unwrapped `data` so pages do not know the response envelope.

## Design tokens

Tailwind tokens map directly to the requested dark YouTube-inspired system: `ink #0F0F0F`, `surface #181818`, `line #303030`, `accent #FF0000`, `accent-hover #CC0000`, and `muted #AAAAAA`. There are no blue, purple, neon, glass, or gradient-heavy tokens.
