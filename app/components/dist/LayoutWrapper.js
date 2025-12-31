"use client";
"use strict";
exports.__esModule = true;
exports.LayoutWrapper = void 0;
var navigation_1 = require("next/navigation");
var Navigation_1 = require("./Navigation");
function LayoutWrapper(_a) {
    var children = _a.children;
    var pathname = navigation_1.usePathname();
    // Check if current page is auth page
    var isAuthPage = pathname === "/auth/login" || pathname === "/auth/signup";
    console.log("isAuthPage:", isAuthPage);
    return (React.createElement(React.Fragment, null,
        !isAuthPage && React.createElement(Navigation_1.Navigation, null),
        React.createElement("main", { className: "\n          min-h-screen \n          bg-gray-50\n          transition-all duration-300\n          " + (!isAuthPage ? "lg:ml-64" : "") + "\n        " }, isAuthPage ? (
        // Auth pages - full width
        React.createElement("div", { className: "flex items-center justify-center min-h-screen" }, children)) : (
        // Regular pages - centered wrapper
        React.createElement("div", { className: "max-w-7xl mx-auto p-6 lg:p-10 transition-all duration-300" }, children)))));
}
exports.LayoutWrapper = LayoutWrapper;
