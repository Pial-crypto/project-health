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
exports.Textarea = void 0;
var react_1 = require("react");
function Textarea(_a) {
    var label = _a.label, error = _a.error, _b = _a.className, className = _b === void 0 ? "" : _b, props = __rest(_a, ["label", "error", "className"]);
    return (react_1["default"].createElement("div", { className: "w-full space-y-1" },
        label && (react_1["default"].createElement("label", { className: "block text-sm font-semibold text-gray-800" }, label)),
        react_1["default"].createElement("div", { className: "relative" },
            react_1["default"].createElement("textarea", __assign({}, props, { className: "\n            w-full rounded-xl px-4 py-3\n            bg-white\n            text-gray-900 placeholder-gray-400\n            border\n            shadow-sm\n            transition-all duration-200 ease-out\n            resize-vertical\n\n            focus:outline-none\n            focus:ring-4\n            focus:ring-blue-500/20\n            focus:border-blue-500\n\n            disabled:bg-gray-100\n            disabled:cursor-not-allowed\n\n            " + (error
                    ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                    : "border-gray-300 hover:border-gray-400") + "\n\n            " + className + "\n          " })),
            react_1["default"].createElement("div", { className: "pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/60" })),
        error && (react_1["default"].createElement("p", { className: "text-sm text-red-600 font-medium" }, error))));
}
exports.Textarea = Textarea;
