"use strict";
exports.__esModule = true;
exports.verifyJWT = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var SECRET = process.env.JWT_WEB_TOKEN || "secret123";
function verifyJWT(token) {
    try {
        return jsonwebtoken_1["default"].verify(token, SECRET);
    }
    catch (_a) {
        return null;
    }
}
exports.verifyJWT = verifyJWT;
