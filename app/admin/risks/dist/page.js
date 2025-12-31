"use client";
"use strict";
exports.__esModule = true;
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var components_1 = require("@/app/components");
var skeleton_1 = require("@/app/components/skeleton");
var useProtectedRoute_1 = require("@/lib/hooks/useProtectedRoute");
var RiskColumn_1 = require("@/app/components/RiskColumn");
function AdminRisksPage() {
    var router = navigation_1.useRouter();
    var _a = react_1.useState(true), isLoading = _a[0], setIsLoading = _a[1];
    var _b = react_1.useState(null), user = _b[0], setUser = _b[1];
    var _c = react_1.useState([]), risks = _c[0], setRisks = _c[1];
    var _d = react_1.useState([]), projects = _d[0], setProjects = _d[1];
    // Modal state
    var _e = react_1.useState(null), selectedRisk = _e[0], setSelectedRisk = _e[1];
    // Protected route hook
    useProtectedRoute_1.useProtectedRoute(setUser, { adminRisk: true, setProjects: setProjects, setRisks: setRisks }, "admin", setIsLoading);
    if (isLoading)
        return React.createElement(skeleton_1.SkeletonList, null);
    if (!user)
        return null;
    var projectMap = {};
    projects.forEach(function (project) {
        projectMap[project._id.toString()] = true;
    });
    var criticalRisks = risks.filter(function (r) { return r.severity === "high" && projectMap[r.projectId]; });
    var mediumRisks = risks.filter(function (r) { return r.severity === "medium" && projectMap[r.projectId]; });
    var lowRisks = risks.filter(function (r) { return r.severity === "low" && projectMap[r.projectId]; });
    var closeModal = function () { return setSelectedRisk(null); };
    return (React.createElement("div", { className: "space-y-8" },
        React.createElement("div", { className: "flex flex-col gap-2" },
            React.createElement("h1", { className: "text-3xl font-semibold text-gray-900" }, "Risk Management"),
            React.createElement("p", { className: "text-gray-600" }, "Monitor and track all project risks across the organization")),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" },
            React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: " flex flex-col items-center justify-center py-8 text-center" },
                    React.createElement("div", { className: "h-14 w-14 ml-3 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl" }, "\u03A3"),
                    React.createElement("p", { className: "mt-2 text-sm text-gray-500" }, "Total Risks"),
                    React.createElement("p", { className: "mt-1 text-3xl font-bold text-gray-900" }, risks.length))),
            React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "flex flex-col items-center justify-center py-8 text-center" },
                    React.createElement("div", { className: " ml-3  h-14 w-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-2xl" }, "!"),
                    React.createElement("p", { className: "mt-3 text-sm text-gray-500" }, "High Severity"),
                    React.createElement("p", { className: "mt-1 text-3xl font-bold text-red-600" }, criticalRisks.length))),
            React.createElement(components_1.Card, null,
                React.createElement(components_1.CardBody, { className: "flex flex-col items-center justify-center py-8 text-center" },
                    React.createElement("div", { className: "h-14 ml-3 w-14 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-2xl" }, "\u23F3"),
                    React.createElement("p", { className: "mt-3 text-sm text-gray-500" }, "Open Risks"),
                    React.createElement("p", { className: "mt-1 text-3xl font-bold text-yellow-600" }, risks.filter(function (r) { return !r.solved; }).length)))),
        criticalRisks.length > 0 && (React.createElement("div", { className: "flex items-start gap-4 rounded-lg border border-red-200 bg-red-50 p-4" },
            React.createElement("div", { className: "text-red-600 text-xl" }, "\u26A0"),
            React.createElement("div", null,
                React.createElement("h3", { className: "font-semibold text-red-900" },
                    criticalRisks.length,
                    " Critical Risk(s) Require Immediate Action"),
                React.createElement("p", { className: "text-sm text-red-700" }, "These risks are high severity and must be reviewed urgently.")))),
        risks.length === 0 ? (React.createElement(components_1.Card, null,
            React.createElement(components_1.CardBody, null,
                React.createElement(components_1.EmptyState, { title: "No Risks Reported", description: "No risks have been reported for any projects yet." })))) : (React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" },
            React.createElement(RiskColumn_1.RiskColumn, { title: "Critical", count: criticalRisks.length, color: "red", risks: criticalRisks, onViewDetails: setSelectedRisk }),
            React.createElement(RiskColumn_1.RiskColumn, { title: "Medium", count: mediumRisks.length, color: "yellow", risks: mediumRisks, onViewDetails: setSelectedRisk }),
            React.createElement(RiskColumn_1.RiskColumn, { title: "Low", count: lowRisks.length, color: "green", risks: lowRisks, onViewDetails: setSelectedRisk }))),
        selectedRisk && (React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" },
            React.createElement("div", { className: "bg-white rounded-xl max-w-lg w-full p-6 relative" },
                React.createElement("button", { className: "absolute top-4 right-4 text-gray-500 hover:text-gray-900", onClick: closeModal }, "\u2715"),
                React.createElement("h2", { className: "text-xl font-semibold mb-2" }, selectedRisk.title),
                React.createElement("p", { className: "text-sm text-gray-600 mb-2" },
                    React.createElement("strong", null, "Project:"),
                    " ",
                    selectedRisk.projectName),
                React.createElement("p", { className: "text-sm text-gray-600 mb-2" },
                    React.createElement("strong", null, "Description:"),
                    " ",
                    selectedRisk.description || "—"),
                React.createElement("p", { className: "text-sm text-gray-600 mb-2" },
                    React.createElement("strong", null, "Employee:"),
                    " ",
                    selectedRisk.employeeEmail),
                React.createElement("p", { className: "text-sm text-gray-600 mb-2" },
                    React.createElement("strong", null, "Severity:"),
                    " ",
                    selectedRisk.severity),
                React.createElement("p", { className: "text-sm text-gray-600 mb-2" },
                    React.createElement("strong", null, "Mitigation:"),
                    " ",
                    selectedRisk.mitigationPlan),
                React.createElement("p", { className: "text-sm text-gray-600" },
                    React.createElement("strong", null, "Solved:"),
                    " ",
                    selectedRisk.solved ? "Yes" : "No"))))));
}
exports["default"] = AdminRisksPage;
