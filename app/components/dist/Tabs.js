"use client";
"use strict";
exports.__esModule = true;
exports.Tabs = void 0;
var react_1 = require("react");
function Tabs(_a) {
    var _b, _c;
    var tabs = _a.tabs, defaultValue = _a.defaultValue, onChange = _a.onChange;
    var _d = react_1["default"].useState(defaultValue || ((_b = tabs[0]) === null || _b === void 0 ? void 0 : _b.value)), activeTab = _d[0], setActiveTab = _d[1];
    var handleTabChange = function (value) {
        setActiveTab(value);
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "flex border-b border-gray-200 relative" }, tabs.map(function (tab) { return (react_1["default"].createElement("button", { key: tab.value, onClick: function () { return handleTabChange(tab.value); }, className: "\n              px-4 py-2 font-medium text-sm transition-colors relative\n              " + (activeTab === tab.value
                ? "text-blue-600"
                : "text-gray-600 hover:text-gray-900") + "\n            " },
            tab.label,
            react_1["default"].createElement("span", { className: "\n                absolute bottom-0 left-0 w-full h-0.5 rounded-full\n                transition-all duration-300\n                " + (activeTab === tab.value
                    ? "bg-blue-600"
                    : "bg-transparent") + "\n              " }))); })),
        react_1["default"].createElement("div", { className: "mt-4 text-gray-700 transition-opacity duration-300" }, (_c = tabs.find(function (tab) { return tab.value === activeTab; })) === null || _c === void 0 ? void 0 : _c.content)));
}
exports.Tabs = Tabs;
