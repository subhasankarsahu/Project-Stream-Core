import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { extractPublicId } from "../src/utils/cloudinary.js";

describe("Cloudinary Utilities", () => {
    test("extracts public ID from standard image URL", () => {
        const url = "https://res.cloudinary.com/demo/image/upload/v1570979139/sample.jpg";
        assert.equal(extractPublicId(url), "sample");
    });

    test("extracts public ID with nested folders", () => {
        const url = "https://res.cloudinary.com/cloud/image/upload/v12345/streamcore/thumbnails/photo.png";
        assert.equal(extractPublicId(url), "streamcore/thumbnails/photo");
    });

    test("extracts public ID from URL without version prefix", () => {
        const url = "https://res.cloudinary.com/cloud/video/upload/streamcore/videos/clip.mp4";
        assert.equal(extractPublicId(url), "streamcore/videos/clip");
    });

    test("returns raw ID without extension when non-URL string is provided", () => {
        assert.equal(extractPublicId("sample_avatar.jpg"), "sample_avatar");
        assert.equal(extractPublicId("raw_public_id"), "raw_public_id");
    });

    test("handles null or undefined safely", () => {
        assert.equal(extractPublicId(null), null);
        assert.equal(extractPublicId(undefined), null);
        assert.equal(extractPublicId(""), null);
    });
});
