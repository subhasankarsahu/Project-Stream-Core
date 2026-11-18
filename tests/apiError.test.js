import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { ApiError } from "../src/utils/ApiError.js";

describe("ApiError Utility", () => {
    test("creates an instance of ApiError with correct properties", () => {
        const error = new ApiError(400, "Bad Request", ["Field is required"]);

        assert.equal(error instanceof Error, true);
        assert.equal(error instanceof ApiError, true);
        assert.equal(error.statusCode, 400);
        assert.equal(error.message, "Bad Request");
        assert.equal(error.success, false);
        assert.deepEqual(error.errors, ["Field is required"]);
        assert.equal(typeof error.stack, "string");
    });

    test("defaults message to 'Something went wrong' if empty", () => {
        const error = new ApiError(500);

        assert.equal(error.statusCode, 500);
        assert.equal(error.message, "Something went wrong");
        assert.deepEqual(error.errors, []);
    });

    test("preserves custom stack trace when provided", () => {
        const customStack = "CustomStackError: at Object.<anonymous>";
        const error = new ApiError(404, "Not Found", [], customStack);

        assert.equal(error.stack, customStack);
    });
});
