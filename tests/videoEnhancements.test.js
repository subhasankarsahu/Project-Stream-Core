import { test, describe } from "node:test";
import assert from "node:assert/strict";

describe("Video Recommendation & Search Utilities", () => {
    test("extracts significant keywords from video title for recommendations", () => {
        const title = "Building a Full-Stack React & Node.js Application 2026!";
        const keywords = title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .split(/\s+/)
            .filter((w) => w.length >= 3);

        assert.equal(keywords.includes("building"), true);
        assert.equal(keywords.includes("fullstack"), true);
        assert.equal(keywords.includes("react"), true);
        assert.equal(keywords.includes("nodejs"), true);
        assert.equal(keywords.includes("application"), true);
        assert.equal(keywords.includes("a"), false); // filtered short word
    });

    test("formats category query regex safely", () => {
        const category = "Tech";
        const regex = new RegExp(`^${category.trim()}$`, "i");

        assert.equal(regex.test("tech"), true);
        assert.equal(regex.test("Tech"), true);
        assert.equal(regex.test("TECH"), true);
        assert.equal(regex.test("Gaming"), false);
    });

    test("handles search suggestion input threshold", () => {
        const checkQuery = (q) => {
            if (!q || typeof q !== "string" || q.trim().length < 2) {
                return [];
            }
            return ["valid-query"];
        };

        assert.deepEqual(checkQuery(""), []);
        assert.deepEqual(checkQuery("a"), []);
        assert.deepEqual(checkQuery(null), []);
        assert.deepEqual(checkQuery("  b  "), []);
        assert.deepEqual(checkQuery("react"), ["valid-query"]);
    });

    test("formats channel bio length constraints", () => {
        const MAX_BIO = 250;
        const shortBio = "Full-stack developer building open source streaming tools.";
        const longBio = "a".repeat(300);

        assert.equal(shortBio.length <= MAX_BIO, true);
        assert.equal(longBio.length <= MAX_BIO, false);
        assert.equal(longBio.slice(0, MAX_BIO).length, 250);
    });
});
