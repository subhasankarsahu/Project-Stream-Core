import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { ApiResponse } from "../src/utils/ApiResponse.js";

describe("ApiResponse Utility", () => {
    test("sets success to true for 2xx and 3xx status codes", () => {
        const response200 = new ApiResponse(200, "OK", { id: 1 });
        assert.equal(response200.statusCode, 200);
        assert.equal(response200.message, "OK");
        assert.deepEqual(response200.data, { id: 1 });
        assert.equal(response200.success, true);

        const response201 = new ApiResponse(201, "Created", "new-resource");
        assert.equal(response201.success, true);
    });

    test("sets success to false for status codes 400 and above", () => {
        const response400 = new ApiResponse(400, "Bad Request", null);
        assert.equal(response400.success, false);

        const response500 = new ApiResponse(500, "Error", null);
        assert.equal(response500.success, false);
    });

    test("defaults message to 'Success' when omitted", () => {
        const res = new ApiResponse(200);
        assert.equal(res.message, "Success");
    });
});
