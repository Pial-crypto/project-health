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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var components_1 = require("@/app/components");
var link_1 = require("next/link");
var api_1 = require("@/lib/utils/api");
var skeleton_1 = require("@/app/components/skeleton");
var useProtectedRoute_1 = require("@/lib/hooks/useProtectedRoute");
function RisksPage() {
    var _this = this;
    var _a = react_1.useState(null), user = _a[0], setUser = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState([]), risks = _c[0], setRisks = _c[1];
    useProtectedRoute_1.useProtectedRoute(setUser, { employeeRisks: true, setRisks: setRisks }, "employee", setIsLoading);
    if (isLoading)
        return React.createElement(skeleton_1.SkeletonList, null);
    if (!user)
        return null;
    var openRisks = risks.filter(function (r) { return !r.solved; });
    var resolvedRisks = risks.filter(function (r) { return r.solved; });
    var markAsSolved = function (riskId) { return __awaiter(_this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api_1.solveRisk(riskId)];
                case 1:
                    res = _a.sent();
                    if (res.ok) {
                        setRisks(function (prevRisks) {
                            return prevRisks.map(function (risk) {
                                return risk._id === riskId || risk.id === riskId
                                    ? __assign(__assign({}, risk), { solved: true }) : risk;
                            });
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", null,
        React.createElement("div", { className: "mb-8" },
            React.createElement("h1", { className: "text-4xl font-bold text-gray-900 mb-2" }, "Risk Management"),
            React.createElement("p", { className: "text-gray-600 text-lg" }, "Track and manage project risks")),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" },
            React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-red-600 mb-1" }, openRisks.length),
                    React.createElement("p", { className: "text-sm text-gray-600" }, "Open Risks"))),
            React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-blue-600 mb-1" }, openRisks.filter(function (r) { return r.severity === "high"; }).length),
                    React.createElement("p", { className: "text-sm text-gray-600" }, "High Severity"))),
            React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "text-center" },
                    React.createElement("div", { className: "text-3xl font-bold text-green-600 mb-1" }, resolvedRisks.length),
                    React.createElement("p", { className: "text-sm text-gray-600" }, "Resolved")))),
        React.createElement("div", { className: "mb-8" },
            React.createElement(link_1["default"], { href: "/employee/risks/new" },
                React.createElement(components_1.Button, null, "+ Report New Risk"))),
        React.createElement("div", { className: "mb-8" },
            React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-4" }, "Open Risks"),
            openRisks.length === 0 ? (React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, null,
                    React.createElement(components_1.EmptyState, { title: "No Open Risks", description: "Great! All identified risks have been resolved" })))) : (React.createElement("div", { className: "space-y-3" }, openRisks.map(function (risk) { return (React.createElement(components_1.Card, { key: risk._id, className: "border-l-4 border-red-600" },
                React.createElement(components_1.CardBody, null,
                    React.createElement("div", { className: "flex items-start justify-between" },
                        React.createElement("div", { className: "flex-1" },
                            React.createElement("div", { className: "flex items-center gap-2 mb-1" },
                                React.createElement("h3", { className: "font-semibold text-gray-900" }, risk.title),
                                React.createElement("span", { className: "text-xs font-semibold px-2 py-1 rounded " + (risk.severity === "high"
                                        ? "bg-red-100 text-red-800"
                                        : risk.severity === "medium"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-green-100 text-green-800") }, risk.severity.toUpperCase())),
                            React.createElement("p", { className: "text-sm text-gray-600 mb-2" }, risk.description),
                            React.createElement("p", { className: "text-sm text-gray-600 mb-2" },
                                "Project: ",
                                risk.projectName),
                            React.createElement("p", { className: "text-sm text-gray-700 mb-2" },
                                React.createElement("strong", null, "Mitigation:"),
                                " ",
                                risk.mitigationPlan),
                            React.createElement("p", { className: "text-xs text-gray-500" },
                                "Created: ",
                                new Date(risk.timeStamp).toLocaleDateString())),
                        React.createElement("div", { className: "flex items-center gap-2" }, !risk.solved ? (React.createElement(components_1.Button, { size: "sm", className: "border-gray-300 hover:border-green-500 hover:bg-green-50 text-green-700 hover:text-green-800 px-3 py-1 text-xs font-medium flex items-center gap-1 transition-all", onClick: function () { return markAsSolved(risk._id); } },
                            React.createElement("span", null, "Solved"),
                            React.createElement("span", { className: "text-lg" }, "?"))) : (React.createElement("div", { className: "flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-md text-xs font-medium" },
                            React.createElement("span", { className: "text-xl" }, "\u2705"),
                            React.createElement("span", null, "SOLVED")))))))); })))),
        resolvedRisks.length > 0 && (React.createElement("div", { className: "space-y-3 mt-6" }, resolvedRisks.map(function (risk) { return (React.createElement(components_1.Card, { key: risk._id, className: "border-l-4 border-green-600 opacity-70" },
            React.createElement(components_1.CardBody, null,
                React.createElement("div", { className: "flex items-start justify-between" },
                    React.createElement("div", { className: "flex-1" },
                        React.createElement("div", { className: "flex items-center gap-2 mb-1" },
                            React.createElement("h3", { className: "font-semibold text-gray-900 line-through" }, risk.title),
                            React.createElement("span", { className: "text-xs bg-green-100 text-green-800 px-2 py-1 rounded" }, "RESOLVED")),
                        "    ",
                        React.createElement("div", { className: "flex items-center gap-2 mb-1" },
                            React.createElement("p", { className: "text-sm text-gray-600 mb-2" }, risk.description),
                            React.createElement("span", { className: "text-xs font-semibold px-2 py-1 rounded " + (risk.severity === "high"
                                    ? "bg-red-100 text-red-800"
                                    : risk.severity === "medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800") }, risk.severity.toUpperCase())),
                        React.createElement("p", { className: "text-sm text-gray-600" },
                            "Project: ",
                            risk.projectName),
                        React.createElement("p", { className: "text-sm text-gray-700 mb-2" },
                            React.createElement("strong", null, "Mitigation:"),
                            " ",
                            risk.mitigationPlan),
                        React.createElement("p", { className: "text-xs text-gray-500" },
                            "Created: ",
                            new Date(risk.timeStamp).toLocaleDateString())))))); })))));
}
exports["default"] = RisksPage;
