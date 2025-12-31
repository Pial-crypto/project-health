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
exports.Button = void 0;
var react_1 = require("react");
function Button(_a) {
    var _b = _a.variant, variant = _b === void 0 ? "primary" : _b, _c = _a.size, size = _c === void 0 ? "md" : _c, _d = _a.isLoading, isLoading = _d === void 0 ? false : _d, children = _a.children, disabled = _a.disabled, _e = _a.className, className = _e === void 0 ? "" : _e, props = __rest(_a, ["variant", "size", "isLoading", "children", "disabled", "className"]);
    var baseStyles = "relative inline-flex items-center justify-center gap-2 " +
        "font-semibold rounded-xl " +
        "transition-all duration-300 ease-out " +
        "focus:outline-none focus:ring-4 focus:ring-offset-1 " +
        "disabled:opacity-70 disabled:cursor-not-allowed " +
        "active:scale-[0.97] " +
        "shadow-sm hover:shadow-lg";
    var variantStyles = {
        primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white " +
            "hover:from-blue-700 hover:to-indigo-700 " +
            "focus:ring-blue-500/30",
        secondary: "bg-white text-gray-800 border border-gray-300 " +
            "hover:bg-gray-50 hover:border-gray-400 " +
            "focus:ring-gray-400/30",
        danger: "bg-gradient-to-r from-red-600 to-rose-600 text-white " +
            "hover:from-red-700 hover:to-rose-700 " +
            "focus:ring-red-500/30",
        success: "bg-gradient-to-r from-green-600 to-emerald-600 text-white " +
            "hover:from-green-700 hover:to-emerald-700 " +
            "focus:ring-green-500/30",
        warning: "bg-gradient-to-r from-yellow-500 to-amber-500 text-white " +
            "hover:from-yellow-600 hover:to-amber-600 " +
            "focus:ring-yellow-400/30"
    };
    var sizeStyles = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3 text-lg"
    };
    return (react_1["default"].createElement("button", __assign({}, props, { disabled: disabled || isLoading, className: baseStyles + " " + variantStyles[variant] + " " + sizeStyles[size] + " " + className }),
        react_1["default"].createElement("span", { className: "absolute inset-0 rounded-xl opacity-0 hover:opacity-20 transition bg-white" }),
        isLoading ? (react_1["default"].createElement("span", { className: "flex items-center gap-2 relative z-10" },
            react_1["default"].createElement("svg", { className: "animate-spin h-5 w-5", viewBox: "0 0 24 24" },
                react_1["default"].createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4", fill: "none" }),
                react_1["default"].createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })),
            children)) : (react_1["default"].createElement("span", { className: "relative z-10 tracking-wide" }, children))));
}
exports.Button = Button;
