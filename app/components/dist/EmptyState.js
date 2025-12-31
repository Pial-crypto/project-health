"use client";
"use strict";
exports.__esModule = true;
exports.EmptyState = void 0;
var react_1 = require("react");
var link_1 = require("next/link");
function EmptyState(_a) {
    var title = _a.title, description = _a.description, action = _a.action, icon = _a.icon;
    return (react_1["default"].createElement("div", { className: "flex flex-col items-center justify-center py-16 px-4 text-center" },
        icon && (react_1["default"].createElement("div", { className: "text-indigo-400 text-8xl mb-6 animate-bounce" }, icon)),
        react_1["default"].createElement("h3", { className: "text-2xl font-bold text-gray-900 mb-3" }, title),
        react_1["default"].createElement("p", { className: "text-gray-600 mb-6 max-w-md leading-relaxed" }, description),
        action && (react_1["default"].createElement(link_1["default"], { href: action.href, className: "\r\n            relative inline-flex items-center justify-center px-6 py-3\r\n            bg-gradient-to-r from-blue-500 to-indigo-500 text-white\r\n            rounded-xl font-medium shadow-md\r\n            transition-all duration-300 ease-out\r\n            hover:-translate-y-1 hover:shadow-xl\r\n            active:scale-[0.97]\r\n          " }, action.label))));
}
exports.EmptyState = EmptyState;
