import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { securityHeaders } from "../src/middlewares/security.middleware.js";

describe("Security Headers Middleware", () => {
    test("sets essential security headers and strips X-Powered-By", () => {
        const headers = { "x-powered-by": "Express" };
        const req = {};
        const res = {
            setHeader: (key, value) => {
                headers[key.toLowerCase()] = value;
            },
            removeHeader: (key) => {
                delete headers[key.toLowerCase()];
            },
            headers
        };

        let nextCalled = false;
        securityHeaders(req, res, () => {
            nextCalled = true;
        });

        assert.equal(nextCalled, true);
        assert.equal(headers["x-powered-by"], undefined);
        assert.equal(headers["x-content-type-options"], "nosniff");
        assert.equal(headers["x-frame-options"], "SAMEORIGIN");
        assert.equal(headers["x-xss-protection"], "1; mode=block");
        assert.equal(headers["referrer-policy"], "strict-origin-when-cross-origin");
        assert.equal(typeof headers["content-security-policy"], "string");
        assert.equal(headers["content-security-policy"].includes("res.cloudinary.com"), true);
    });
});
