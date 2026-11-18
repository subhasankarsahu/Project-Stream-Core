import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter } from "../src/middlewares/rateLimiter.middleware.js";
import { ApiError } from "../src/utils/ApiError.js";

describe("Rate Limiter Middleware", () => {
    const createMockReqRes = (ip = "127.0.0.1") => {
        const headers = {};
        const req = { ip, headers: {}, socket: { remoteAddress: ip } };
        const res = {
            setHeader: (key, value) => {
                headers[key] = value;
            },
            getHeader: (key) => headers[key],
            removeHeader: (key) => {
                delete headers[key];
            },
            headers
        };
        return { req, res };
    };

    test("sets RateLimit headers and passes under limit", () => {
        const limiter = createRateLimiter({ windowMs: 60000, max: 5 });
        const { req, res } = createMockReqRes("192.168.1.1");

        let nextCalled = false;
        limiter(req, res, (err) => {
            assert.equal(err, undefined);
            nextCalled = true;
        });

        assert.equal(nextCalled, true);
        assert.equal(res.headers["RateLimit-Limit"], 5);
        assert.equal(res.headers["RateLimit-Remaining"], 4);
        assert.equal(typeof res.headers["RateLimit-Reset"], "number");
    });

    test("blocks requests with 429 when max is exceeded", () => {
        const limiter = createRateLimiter({ windowMs: 60000, max: 2, message: "Limit reached" });
        const { req, res } = createMockReqRes("192.168.1.2");

        // 1st request
        limiter(req, res, () => {});
        assert.equal(res.headers["RateLimit-Remaining"], 1);

        // 2nd request
        limiter(req, res, () => {});
        assert.equal(res.headers["RateLimit-Remaining"], 0);

        // 3rd request (exceeded)
        let caughtError = null;
        limiter(req, res, (err) => {
            caughtError = err;
        });

        assert.notEqual(caughtError, null);
        assert.equal(caughtError instanceof ApiError, true);
        assert.equal(caughtError.statusCode, 429);
        assert.equal(caughtError.message, "Limit reached");
        assert.equal(typeof res.headers["Retry-After"], "number");
    });
});
