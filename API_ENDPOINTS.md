# StreamCore API Endpoints

Base URL: `/api/v1`

Successful responses use `{ statusCode, success, message, data }`. Errors use `{ success, message, errors }`.
- **Public & Guest Access:** Read endpoints for videos, trending, search suggestions, related videos, comments, channel profiles, and playlists are accessible publicly without authentication. If an `accessToken` is provided, responses are personalized with user-specific interaction states (`isLiked`, `isSubscribed`, and watch history tracking).
- **Protected Actions:** Write, update, and delete actions require the `accessToken` HttpOnly cookie or `Authorization: Bearer <token>`.

## Security & Resilience

- **Rate Limiting:** Sliding-window rate limiters with `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset` and `Retry-After` (HTTP 429).
  - General API endpoints: 300 requests per 15 minutes.
  - Authentication endpoints (`/users/login`, `/users/register`): 20 requests per 15 minutes.
- **Request Validation & Sanitization:**
  - `username`: 3-30 characters, lowercase alphanumeric and underscores only (`/^[a-z0-9_]{3,30}$/`).
  - `email`: RFC-compliant email address format.
  - `password`: Minimum 6 characters.
  - `bio`: Creator channel biography up to 250 characters.
  - Content length bounding: Tweets (1-280 chars), Comments (1-1000 chars), Playlists (name: 1-100 chars, desc: 1-1000 chars).
  - Route ObjectId validation: Strictly validates 24-character hexadecimal MongoDB ObjectIds before database execution.
- **Security Headers:** Protects against MIME sniffing (`nosniff`), clickjacking (`SAMEORIGIN`), XSS (`1; mode=block`), and referrer leaks.
- **Graceful Shutdown:** Intercepts `SIGINT`/`SIGTERM` to complete in-flight HTTP requests and cleanly terminate database connections.

---

## Healthcheck & Monitoring

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/healthcheck/` | GET | No | None | None | `200`, server status, DB ping/latency, uptime, memory usage, node version | Returns comprehensive service health and metrics. |
| `/healthcheck/ready` | GET | No | None | None | `200`, `{ status: "ready", database: "connected" }` (or `503` if DB down) | Liveness & readiness probe for orchestrators and container health. |

---

## Users

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/users/register` | POST | No | Multipart fields `avatar`, optional `coverImage` | Multipart `fullName`, `email`, `username`, `password` | `201`, created user without password/token | Registers a user and uploads profile images. Validated & rate-limited. |
| `/users/login` | POST | No | None | JSON `email` or `username`, `password` | `200`, user; sets access and refresh cookies | Authenticates a user. Validated & rate-limited. |
| `/users/logout` | POST | Yes | None | None | `200`, empty data; clears cookies | Revokes the stored refresh token. |
| `/users/refresh-token` | POST | No | None | Optional JSON `refreshToken` when not using the cookie | `200`, refreshed token metadata; rotates cookies | Issues a new access/refresh token pair. |
| `/users/change-password` | POST | Yes | None | JSON `oldPassword`, `newPassword` | `200`, empty data | Changes the authenticated user password. |
| `/users/current-user` | GET | Yes | None | None | `200`, current user | Gets the authenticated user. |
| `/users/update-account` | PATCH | Yes | None | JSON `fullName`, `email`, optional `bio` (max 250 chars) | `200`, updated user | Updates account details and channel biography. |
| `/users/avatar` | PATCH | Yes | Multipart field `avatar` | Image upload | `200`, updated user | Replaces avatar and removes old asset from Cloudinary. |
| `/users/cover-image` | PATCH | Yes | Multipart field `coverImage` | Image upload | `200`, updated user | Replaces cover image and removes old asset from Cloudinary. |
| `/users/c/:username` | GET | Optional | Path `username` | None | `200`, channel profile, bio, and subscription counts | Gets a channel profile. Returns `isSubscribed` if authenticated. |
| `/users/history` | GET | Yes | None | None | `200`, watched videos array | Gets the user's chronological watch history. |
| `/users/history` | DELETE | Yes | None | None | `200`, empty data | Clears the authenticated user's entire watch history. |
| `/users/history/:videoId` | POST | Yes | Path `videoId` | None | `200`, `{ videoId }` | Records a video into the user's watch history. |
| `/users/history/:videoId` | DELETE | Yes | Path `videoId` | None | `200`, `{ videoId }` | Removes a specific video from the user's watch history. |

---

## Videos

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/videos/` | GET | Optional | Query `page`, `limit` (max 50), `query`, `sortBy`, `sortType`, `userId`, `category`, `duration` (`short` \| `medium` \| `long`) | None | `200`, aggregate pagination result | Lists published videos with category, duration, and query filters. |
| `/videos/trending` | GET | Optional | Query `page`, `limit` | None | `200`, aggregate pagination result | Lists trending videos ranked by views and recency. |
| `/videos/search/suggestions` | GET | Optional | Query `q` (min 2 chars) | None | `200`, suggestions array | Fast autocomplete suggestions matching video titles and creator channels. |
| `/videos/:videoId/related` | GET | Optional | Path `videoId` | None | `200`, recommended videos array | Returns contextual related videos matching owner, category, or title keywords. |
| `/videos/` | POST | Yes | Multipart fields `videoFile`, `thumbnail` | Multipart `title`, `description`, optional `category`, video and thumbnail files | `201`, created video | Publishes a video with category metadata. |
| `/videos/:videoId` | GET | Optional | Path `videoId` | None | `200`, enriched video object with `likesCount`, `commentsCount`, `isLiked`, `owner.subscribersCount`, and `owner.isSubscribed` | Gets enriched video details, increments view count, and auto-records watch history if authenticated. |
| `/videos/:videoId` | PATCH | Yes | Path `videoId`, multipart `thumbnail` optional | Optional JSON `title`, `description`, `category` and thumbnail | `200`, updated video | Updates an owned video and purges superseded thumbnails from Cloudinary. |
| `/videos/:videoId` | DELETE | Yes | Path `videoId` | None | `200`, empty data | Deletes an owned video and purges media files from Cloudinary. |
| `/videos/toggle/publish/:videoId` | PATCH | Yes | Path `videoId` | None | `200`, updated video | Toggles publication status for an owned video. |

---

## Comments

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/comments/:videoId` | GET | Optional | Path `videoId`; query `page`, `limit` | None | `200`, comments array with `likesCount` and `isLiked` | Lists comments for a video with like metrics. |
| `/comments/:videoId` | POST | Yes | Path `videoId` | JSON `content` (1-1000 chars) | `201`, created comment | Adds a comment to a video. |
| `/comments/c/:commentId` | PATCH | Yes | Path `commentId` | JSON `content` (1-1000 chars) | `200`, updated comment | Updates an owned comment. |
| `/comments/c/:commentId` | DELETE | Yes | Path `commentId` | None | `200`, empty data | Deletes an owned comment. |

---

## Likes

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/likes/videos` | GET | Yes | None | None | `200`, liked videos array with populated owner | Lists videos liked by the user with creator profiles. |
| `/likes/video/:videoId` | POST | Yes | Path `videoId` | None | `200`, like or empty data | Toggles a video like. |
| `/likes/comment/:commentId` | POST | Yes | Path `commentId` | None | `200`, like or empty data | Toggles a comment like. |
| `/likes/tweet/:tweetId` | POST | Yes | Path `tweetId` | None | `200`, like or empty data | Toggles a tweet like. |

---

## Subscriptions

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/subscriptions/c/:channelId` | GET | Optional | Path `channelId` | None | `200`, subscriber list with safe projections | Lists subscribers of a channel. |
| `/subscriptions/c/:channelId/status` | GET | Optional | Path `channelId` | None | `200`, `{ isSubscribed, subscribersCount }` | Checks subscription state for caller and retrieves subscriber total. |
| `/subscriptions/c/:channelId` | POST | Yes | Path `channelId` | None | `200`, `{ isSubscribed, subscription? }` | Toggles subscription to a channel. |
| `/subscriptions/u/:subscriberId` | GET | Optional | Path `subscriberId` | None | `200`, subscribed channels list | Lists channels followed by a user. |

---

## Tweets

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/tweets/` | POST | Yes | None | JSON `content` (1-280 chars) | `201`, created tweet | Creates a tweet. |
| `/tweets/user/:userId` | GET | Optional | Path `userId` | None | `200`, tweets | Lists tweets owned by a user publicly. |
| `/tweets/:tweetId` | PATCH | Yes | Path `tweetId` | JSON `content` (1-280 chars) | `200`, updated tweet | Updates an owned tweet. |
| `/tweets/:tweetId` | DELETE | Yes | Path `tweetId` | None | `200`, empty data | Deletes an owned tweet. |

---

## Playlists

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/playlist/` | POST | Yes | None | JSON `name` (1-100 chars), `description` (1-1000 chars) | `201`, created playlist | Creates a playlist. |
| `/playlist/:playlistId` | GET | Optional | Path `playlistId` | None | `200`, playlist with videos and owner | Gets a playlist publicly. |
| `/playlist/:playlistId` | PATCH | Yes | Path `playlistId` | Optional JSON `name`, `description` | `200`, updated playlist | Updates an owned playlist. |
| `/playlist/:playlistId` | DELETE | Yes | Path `playlistId` | None | `200`, empty data | Deletes an owned playlist. |
| `/playlist/add/:videoId/:playlistId` | PATCH | Yes | Path `videoId`, `playlistId` | None | `200`, updated playlist | Adds an existing video to an owned playlist. |
| `/playlist/remove/:videoId/:playlistId` | PATCH | Yes | Path `videoId`, `playlistId` | None | `200`, updated playlist | Removes a video from an owned playlist. |
| `/playlist/user/:userId` | GET | Optional | Path `userId` | None | `200`, playlists | Lists a user's playlists publicly. |

---

## Dashboard

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/dashboard/stats` | GET | Yes | None | None | `200`, videos, published count, subscribers, views, likes, and comments totals | Gets comprehensive channel performance metrics. |
| `/dashboard/videos` | GET | Yes | None | None | `200`, owned videos | Lists the authenticated user's uploaded videos. |
| `/dashboard/top-videos` | GET | Yes | None | None | `200`, top 5 performing videos | Returns creator's top 5 videos ranked by views and engagement. |
