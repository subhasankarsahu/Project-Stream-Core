import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { optionalAuth } from "../src/middlewares/auth.middleware.js";

describe("Optional Authentication Middleware", () => {
    test("sets req.user to null and proceeds when no token is supplied", async () => {
        const req = {
            header: () => undefined,
            cookies: {}
        };
        const res = {};

        let nextCalled = false;
        await optionalAuth(req, res, () => {
            nextCalled = true;
        });

        assert.equal(nextCalled, true);
        assert.equal(req.user, null);
    });

    test("sets req.user to null and proceeds safely when invalid token is provided", async () => {
        const req = {
            header: (name) => (name === "Authorization" ? "Bearer invalid-token-string" : undefined),
            cookies: {}
        };
        const res = {};

        let nextCalled = false;
        await optionalAuth(req, res, () => {
            nextCalled = true;
        });

        assert.equal(nextCalled, true);
        assert.equal(req.user, null);
    });
});
