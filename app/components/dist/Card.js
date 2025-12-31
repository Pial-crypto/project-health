"use client";
"use strict";
exports.__esModule = true;
exports.CardFooter = exports.CardBody = exports.CardHeader = exports.Card = void 0;
var react_1 = require("react");
function Card(_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.hover, hover = _c === void 0 ? true : _c;
    return (react_1["default"].createElement("div", { className: "\n        group relative overflow-hidden rounded-2xl\n        bg-gradient-to-br from-white via-white to-indigo-50/60\n        border border-indigo-100/60\n        shadow-md\n        transition-all duration-300 ease-out\n        " + (hover ? "hover:-translate-y-1 hover:shadow-2xl" : "") + "\n        " + className + "\n      " },
        react_1["default"].createElement("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" }),
        react_1["default"].createElement("div", { className: "pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition" }),
        react_1["default"].createElement("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-indigo-400/60 via-blue-400/40 to-transparent opacity-0 group-hover:opacity-100 transition" }),
        children));
}
exports.Card = Card;
function CardHeader(_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b;
    return (react_1["default"].createElement("div", { className: "\n        px-6 py-4\n        border-b border-indigo-100/60\n        bg-gradient-to-r from-indigo-50/60 via-white to-white\n        font-semibold text-gray-900\n        " + className + "\n      " }, children));
}
exports.CardHeader = CardHeader;
function CardBody(_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b;
    return (react_1["default"].createElement("div", { className: "\n        relative px-6 py-5\n        text-gray-700\n        leading-relaxed\n        " + className + "\n      " },
        react_1["default"].createElement("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-indigo-50/30 to-transparent opacity-60" }),
        react_1["default"].createElement("div", { className: "relative z-10" }, children)));
}
exports.CardBody = CardBody;
function CardFooter(_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b;
    return (react_1["default"].createElement("div", { className: "\n        px-6 py-4\n        border-t border-indigo-100/60\n        bg-gradient-to-r from-white to-indigo-50/40\n        " + className + "\n      " }, children));
}
exports.CardFooter = CardFooter;
