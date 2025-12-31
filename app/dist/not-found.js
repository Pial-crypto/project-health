"use client";
"use strict";
exports.__esModule = true;
var components_1 = require("@/app/components");
var material_1 = require("@mui/material");
var link_1 = require("next/link");
var react_1 = require("react");
function NotFound() {
    var _a = react_1.useState(null), user = _a[0], setUser = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    // useProtectedRoute(setUser,{},"a")
    isLoading && React.createElement(material_1.Skeleton, null);
    return (React.createElement("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800 p-4" },
        React.createElement("div", { className: "text-center" },
            React.createElement("h1", { className: "text-6xl font-bold text-white mb-4" }, "404"),
            React.createElement("h2", { className: "text-3xl font-semibold text-gray-100 mb-2" }, "Page Not Found"),
            React.createElement("p", { className: "text-gray-300 text-lg mb-8 max-w-md mx-auto" }, "The page you're looking for doesn't exist or has been moved."),
            React.createElement("div", { className: "flex gap-4 justify-center" },
                React.createElement(link_1["default"], { href: "/" },
                    React.createElement(components_1.Button, { size: "lg" }, "Go Home"))))));
}
exports["default"] = NotFound;
