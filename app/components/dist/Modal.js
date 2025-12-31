"use client";
"use strict";
exports.__esModule = true;
exports.Modal = void 0;
var react_1 = require("react");
function Modal(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, title = _a.title, children = _a.children, _b = _a.size, size = _b === void 0 ? "md" : _b;
    var _c = react_1.useState(false), mounted = _c[0], setMounted = _c[1];
    react_1.useEffect(function () {
        setMounted(true);
    }, []);
    if (!mounted || !isOpen)
        return null;
    var sizeStyles = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl"
    };
    return (react_1["default"].createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300", role: "dialog", "aria-modal": "true" },
        react_1["default"].createElement("div", { className: "\n          " + sizeStyles[size] + " w-full bg-white rounded-2xl shadow-2xl overflow-hidden\n          transform transition-transform duration-300 scale-95 animate-fadeIn\n        " },
            react_1["default"].createElement("div", { className: "flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white" },
                react_1["default"].createElement("h2", { className: "text-lg font-semibold text-gray-900" }, title),
                react_1["default"].createElement("button", { onClick: onClose, className: "\r\n              text-gray-500 hover:text-gray-700 text-2xl leading-none\r\n              transition-colors duration-200\r\n              rounded-full hover:bg-gray-200 p-1\r\n            ", "aria-label": "Close modal" }, "\u00D7")),
            react_1["default"].createElement("div", { className: "px-6 py-5 text-gray-700" }, children))));
}
exports.Modal = Modal;
