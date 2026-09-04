# Code Review

## Bugs Fixed

- Corrected case-sensitive route/controller imports and replaced the misspelled like route with working video, comment, tweet, and liked-video endpoints.
- Added centralized JSON 404/error handling so `asyncHandler` failures consistently return API-shaped errors.
- Fixed missing responses in video listing, undeclared comment pagination variables, the comment schema/controller field mismatch, the video thumbnail check, the video `title` typo, and the publish toggle assignment.
- Corrected dashboard undefined variables and aggregation field names; subscriber totals now come from `Subscription`.
- Standardized `ApiResponse` argument order across controllers and corrected the `fullname` schema field in updates and projections.
- Fixed reversed subscription GET handlers and added target existence checks for likes and playlist additions.
- Hardened JWT bearer parsing, password-change validation, refresh-token cookie access, local cookie behavior, upload filenames, upload size limits, and Cloudinary local-file cleanup.
- Added required ownership/reference fields and unique indexes for likes and subscriptions.

## Potential Issues Found

- No automated test suite or test script exists, so database-backed behavior was not integration-tested.
- Video, comment, tweet, playlist, and dashboard GET routes remain authenticated. This may be intentional, but public browsing would require moving `verifyJWT` to write routes only.
- Cloudinary URLs are stored rather than public IDs, so replacing or deleting media cannot currently remove old Cloudinary assets.
- Watch history is read but there is no endpoint in this codebase that records a watched video.
- Toggle endpoints can still race at the application level; unique indexes prevent duplicates but callers should handle duplicate-key retries gracefully.
- Pagination and sort inputs are only lightly bounded; production deployments should cap page sizes and whitelist sortable fields.

## Security Concerns

- The local `.env` contains database, JWT, and Cloudinary credentials. Treat them as compromised, rotate every credential, and keep the file untracked. Use `.env.example` for documentation.
- JWT secrets should be long, random, environment-specific values and should be validated before startup.
- `CORS_ORIGIN=*` is incompatible with credentialed browser requests in many clients and should be replaced with an explicit allowlist.
- Cookies are HttpOnly and use environment-aware `secure` plus `sameSite=lax`; cross-site frontend deployments may need a deliberate `sameSite=none` and HTTPS configuration.
- Add rate limiting, request validation, security headers, audit logging, and stronger MIME/content validation before public deployment.

## Recommended Improvements

- Add integration tests using a disposable MongoDB instance for auth, refresh-token rotation, ownership checks, uploads, and every route.
- Validate required environment variables at startup and add a graceful shutdown handler for the HTTP server and MongoDB connection.
- Store Cloudinary `public_id` values alongside URLs and remove old assets after successful replacements/deletions.
- Use transactions for multi-document operations such as publishing media and creating dependent records.
- Add schema validation for email format, username format, title/content lengths, and upload MIME types.
- Rename the singular `/playlist` mount to `/playlists` in a versioned API migration if REST naming consistency is a priority.
- Add OpenAPI generation so endpoint contracts stay synchronized with implementation.

## TODOs Remaining

- Rotate all credentials currently present in the local environment.
- Decide whether read endpoints should be public and update route middleware accordingly.
- Implement media deletion from Cloudinary and watch-history writes.
- Add rate limiting, startup environment validation, graceful shutdown, and automated tests.