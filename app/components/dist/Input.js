"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Input = void 0;
var react_1 = require("react");
function Input(_a) {
    var label = _a.label, error = _a.error, helperText = _a.helperText, _b = _a.className, className = _b === void 0 ? "" : _b, props = __rest(_a, ["label", "error", "helperText", "className"]);
    return (react_1["default"].createElement("div", { className: "w-full" },
        label && (react_1["default"].createElement("label", { className: "block text-sm font-medium text-gray-700 mb-1" }, label)),
        react_1["default"].createElement("input", __assign({}, props, { className: "\n          w-full px-4 py-3 rounded-lg \n          text-gray-800 placeholder-gray-400 \n          bg-gradient-to-br from-white to-gray-50\n          border border-gray-300\n          shadow-sm\n          focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400\n          disabled:bg-gray-100 disabled:cursor-not-allowed\n          transition-all duration-200 ease-in-out\n          " + (error ? "border-red-500 focus:ring-red-400" : "") + "\n          " + className + "\n        " })),
        error && (react_1["default"].createElement("p", { className: "text-red-500 text-sm mt-1 font-medium" }, error)),
        helperText && !error && (react_1["default"].createElement("p", { className: "text-gray-500 text-sm mt-1" }, helperText))));
}
exports.Input = Input;
