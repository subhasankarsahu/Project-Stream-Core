import { test, describe } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import {
    validateObjectId,
    validateRegisterInput,
    validateLoginInput,
    validateContent
} from "../src/middlewares/validation.middleware.js";
import { ApiError } from "../src/utils/ApiError.js";

describe("Validation Middlewares", () => {
    describe("validateObjectId", () => {
        test("passes when param is a valid MongoDB ObjectId", () => {
            const validId = new mongoose.Types.ObjectId().toString();
            const middleware = validateObjectId("videoId");
            const req = { params: { videoId: validId } };

            let nextCalled = false;
            middleware(req, {}, (err) => {
                assert.equal(err, undefined);
                nextCalled = true;
            });
            assert.equal(nextCalled, true);
        });

        test("returns 400 ApiError when param is an invalid ObjectId", () => {
            const middleware = validateObjectId("videoId");
            const req = { params: { videoId: "not-an-objectid" } };

            let caughtError = null;
            middleware(req, {}, (err) => {
                caughtError = err;
            });

            assert.notEqual(caughtError, null);
            assert.equal(caughtError instanceof ApiError, true);
            assert.equal(caughtError.statusCode, 400);
            assert.equal(caughtError.message.includes("is not a valid ObjectId"), true);
        });
    });

    describe("validateRegisterInput", () => {
        test("rejects invalid usernames and emails", () => {
            const req1 = { body: { fullName: "User", username: "bad user!", email: "test@example.com", password: "password123" } };
            let err1 = null;
            validateRegisterInput(req1, {}, (e) => { err1 = e; });
            assert.equal(err1?.statusCode, 400);

            const req2 = { body: { fullName: "User", username: "validuser", email: "not-an-email", password: "password123" } };
            let err2 = null;
            validateRegisterInput(req2, {}, (e) => { err2 = e; });
            assert.equal(err2?.statusCode, 400);

            const req3 = { body: { fullName: "User", username: "validuser", email: "user@example.com", password: "123" } };
            let err3 = null;
            validateRegisterInput(req3, {}, (e) => { err3 = e; });
            assert.equal(err3?.statusCode, 400);
        });

        test("normalizes and accepts valid registration input", () => {
            const req = {
                body: {
                    fullName: " Jane Doe ",
                    username: "Jane_Doe123",
                    email: "Jane.Doe@EXAMPLE.COM ",
                    password: "strongpassword"
                }
            };

            let nextCalled = false;
            validateRegisterInput(req, {}, (err) => {
                assert.equal(err, undefined);
                nextCalled = true;
            });

            assert.equal(nextCalled, true);
            assert.equal(req.body.username, "jane_doe123");
            assert.equal(req.body.email, "jane.doe@example.com");
        });
    });

    describe("validateLoginInput", () => {
        test("rejects missing username and email", () => {
            const req = { body: { password: "password123" } };
            let err = null;
            validateLoginInput(req, {}, (e) => { err = e; });
            assert.equal(err?.statusCode, 400);
        });

        test("rejects missing password", () => {
            const req = { body: { username: "user" } };
            let err = null;
            validateLoginInput(req, {}, (e) => { err = e; });
            assert.equal(err?.statusCode, 400);
        });

        test("accepts valid credentials", () => {
            const req = { body: { username: "User1", password: "secretpassword" } };
            let nextCalled = false;
            validateLoginInput(req, {}, (e) => {
                assert.equal(e, undefined);
                nextCalled = true;
            });
            assert.equal(nextCalled, true);
            assert.equal(req.body.username, "user1");
        });
    });

    describe("validateContent", () => {
        test("enforces length bounds and trims text", () => {
            const middleware = validateContent({ field: "content", min: 2, max: 10 });
            const req = { body: { content: "  hello  " } };

            let nextCalled = false;
            middleware(req, {}, (err) => {
                assert.equal(err, undefined);
                nextCalled = true;
            });

            assert.equal(nextCalled, true);
            assert.equal(req.body.content, "hello");
        });

        test("rejects content exceeding maximum limit", () => {
            const middleware = validateContent({ field: "content", min: 1, max: 5 });
            const req = { body: { content: "This is too long" } };

            let err = null;
            middleware(req, {}, (e) => { err = e; });
            assert.equal(err?.statusCode, 400);
        });
    });
});
