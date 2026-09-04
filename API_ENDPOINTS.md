# StreamCore API Endpoints

Base URL: `/api/v1`

Successful responses use `{ statusCode, success, message, data }`. Errors use `{ success, message, errors }`. Protected endpoints accept the `accessToken` HttpOnly cookie or `Authorization: Bearer <token>`.

## Healthcheck

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/healthcheck/` | GET | No | None | None | `200`, server status, uptime, timestamp | Checks API availability. |

## Users

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/users/register` | POST | No | Multipart fields `avatar`, optional `coverImage` | Multipart `fullName`, `email`, `username`, `password` | `201`, created user without password/token | Registers a user and uploads profile images. |
| `/users/login` | POST | No | None | JSON `email` or `username`, `password` | `200`, user; sets access and refresh cookies | Authenticates a user. |
| `/users/logout` | POST | Yes | None | None | `200`, empty data; clears cookies | Revokes the stored refresh token. |
| `/users/refresh-token` | POST | No | None | Optional JSON `refreshToken` when not using the cookie | `200`, refreshed token metadata; rotates cookies | Issues a new access/refresh token pair. |
| `/users/change-password` | POST | Yes | None | JSON `oldPassword`, `newPassword` | `200`, empty data | Changes the authenticated user password. |
| `/users/current-user` | GET | Yes | None | None | `200`, current user | Gets the authenticated user. |
| `/users/update-account` | PATCH | Yes | None | JSON `fullName`, `email` | `200`, updated user | Updates account details. |
| `/users/avatar` | PATCH | Yes | Multipart field `avatar` | Image upload | `200`, updated user | Replaces the avatar. |
| `/users/cover-image` | PATCH | Yes | Multipart field `coverImage` | Image upload | `200`, updated user | Replaces the cover image. |
| `/users/c/:username` | GET | Yes | Path `username` | None | `200`, channel profile and subscription counts | Gets a channel profile. |
| `/users/history` | GET | Yes | None | None | `200`, watched videos | Gets the authenticated user's watch history. |

## Videos

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/videos/` | GET | Yes | Query `page`, `limit`, `query`, `sortBy`, `sortType`, optional `userId` | None | `200`, aggregate pagination result | Lists published videos. |
| `/videos/` | POST | Yes | Multipart fields `videoFile`, `thumbnail` | Multipart `title`, `description`, video and thumbnail files | `201`, created video | Publishes a video. |
| `/videos/:videoId` | GET | Yes | Path `videoId` | None | `200`, video with owner | Gets one video. |
| `/videos/:videoId` | PATCH | Yes | Path `videoId`, multipart `thumbnail` optional | Optional JSON `title`, `description` and thumbnail | `200`, updated video | Updates an owned video. |
| `/videos/:videoId` | DELETE | Yes | Path `videoId` | None | `200`, empty data | Deletes an owned video record. |
| `/videos/toggle/publish/:videoId` | PATCH | Yes | Path `videoId` | None | `200`, updated video | Toggles publication status for an owned video. |

## Comments

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/comments/:videoId` | GET | Yes | Path `videoId`; query `page`, `limit` | None | `200`, comments | Lists comments for a video. |
| `/comments/:videoId` | POST | Yes | Path `videoId` | JSON `content` | `201`, created comment | Adds a comment to a video. |
| `/comments/c/:commentId` | PATCH | Yes | Path `commentId` | JSON `content` | `200`, updated comment | Updates an owned comment. |
| `/comments/c/:commentId` | DELETE | Yes | Path `commentId` | None | `200`, empty data | Deletes an owned comment. |

## Likes

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/likes/videos` | GET | Yes | None | None | `200`, liked videos | Lists videos liked by the user. |
| `/likes/video/:videoId` | POST | Yes | Path `videoId` | None | `200`, like or empty data | Toggles a video like. |
| `/likes/comment/:commentId` | POST | Yes | Path `commentId` | None | `200`, like or empty data | Toggles a comment like. |
| `/likes/tweet/:tweetId` | POST | Yes | Path `tweetId` | None | `200`, like or empty data | Toggles a tweet like. |

## Subscriptions

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/subscriptions/c/:channelId` | GET | Yes | Path `channelId` | None | `200`, subscriber list | Lists subscribers of a channel. |
| `/subscriptions/c/:channelId` | POST | Yes | Path `channelId` | None | `200`, subscription or empty data | Toggles the current user's subscription to a channel. |
| `/subscriptions/u/:subscriberId` | GET | Yes | Path `subscriberId` | None | `200`, subscribed channels | Lists channels followed by a user. |

## Tweets

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/tweets/` | POST | Yes | None | JSON `content` | `201`, created tweet | Creates a tweet. |
| `/tweets/user/:userId` | GET | Yes | Path `userId` | None | `200`, tweets | Lists tweets owned by a user. |
| `/tweets/:tweetId` | PATCH | Yes | Path `tweetId` | JSON `content` | `200`, updated tweet | Updates an owned tweet. |
| `/tweets/:tweetId` | DELETE | Yes | Path `tweetId` | None | `200`, empty data | Deletes an owned tweet. |

## Playlists

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/playlist/` | POST | Yes | None | JSON `name`, `description` | `201`, created playlist | Creates a playlist. |
| `/playlist/:playlistId` | GET | Yes | Path `playlistId` | None | `200`, playlist with videos and owner | Gets a playlist. |
| `/playlist/:playlistId` | PATCH | Yes | Path `playlistId` | Optional JSON `name`, `description` | `200`, updated playlist | Updates an owned playlist. |
| `/playlist/:playlistId` | DELETE | Yes | Path `playlistId` | None | `200`, empty data | Deletes an owned playlist. |
| `/playlist/add/:videoId/:playlistId` | PATCH | Yes | Path `videoId`, `playlistId` | None | `200`, updated playlist | Adds an existing video to an owned playlist. |
| `/playlist/remove/:videoId/:playlistId` | PATCH | Yes | Path `videoId`, `playlistId` | None | `200`, updated playlist | Removes a video from an owned playlist. |
| `/playlist/user/:userId` | GET | Yes | Path `userId` | None | `200`, playlists | Lists a user's playlists. |

## Dashboard

| Endpoint | Method | Auth | Parameters | Body | Success response | Description |
|---|---|---|---|---|---|---|
| `/dashboard/stats` | GET | Yes | None | None | `200`, video, subscriber, view, and like totals | Gets channel statistics for the authenticated user. |
| `/dashboard/videos` | GET | Yes | None | None | `200`, owned videos | Lists the authenticated user's videos. |