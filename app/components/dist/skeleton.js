"use strict";
exports.__esModule = true;
exports.SkeletonList = void 0;
function SkeletonList() {
    return (React.createElement("div", { className: "rounded-xl border p-4 space-y-3" },
        React.createElement("div", { className: "h-4 w-1/2 rounded shimmer" }),
        React.createElement("div", { className: "h-3 w-3/4 rounded shimmer" }),
        React.createElement("div", { className: "flex justify-between items-center" },
            React.createElement("div", { className: "h-3 w-1/4 rounded shimmer" }),
            React.createElement("div", { className: "h-8 w-24 rounded-md shimmer" }))));
}
exports.SkeletonList = SkeletonList;
