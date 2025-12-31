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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var components_1 = require("@/app/components");
var skeleton_1 = require("@/app/components/skeleton");
var useProtectedRoute_1 = require("@/lib/hooks/useProtectedRoute");
var activityHook_1 = require("@/lib/hooks/activityHook");
var adminHelpers_1 = require("@/lib/utils/adminHelpers");
function ActivityPage() {
    var _a = react_1.useState(true), isLoading = _a[0], setIsLoading = _a[1];
    var _b = react_1.useState(null), user = _b[0], setUser = _b[1];
    var _c = react_1.useState([]), projects = _c[0], setProjects = _c[1];
    var _d = react_1.useState([]), checkIns = _d[0], setCheckIns = _d[1];
    var _e = react_1.useState([]), risks = _e[0], setRisks = _e[1];
    var _f = react_1.useState([]), feedbacks = _f[0], setFeedbacks = _f[1];
    var _g = react_1.useState([]), activities = _g[0], setActivities = _g[1];
    var _h = react_1.useState(null), selectedProjectId = _h[0], setSelectedProjectId = _h[1];
    var _j = react_1.useState({}), expanded = _j[0], setExpanded = _j[1];
    useProtectedRoute_1.useProtectedRoute(setUser, { setProjects: setProjects, setCheckIns: setCheckIns, setRisks: setRisks, setFeedbacks: setFeedbacks }, "admin", setIsLoading);
    activityHook_1.activityHook(projects, checkIns, risks, feedbacks, setActivities);
    react_1.useEffect(function () {
        if (projects.length && !selectedProjectId) {
            setSelectedProjectId(projects[0]._id);
        }
    }, [projects, selectedProjectId]);
    if (isLoading)
        return React.createElement(skeleton_1.SkeletonList, null);
    if (!user)
        return null;
    var selectedProject = projects.find(function (p) { return p._id === selectedProjectId; });
    var projectActivities = activities
        .filter(function (a) { return a.projectId === selectedProjectId; });
    // .filter(a => !(a.type === "risk_created" ));
    var projectCreated = projectActivities.find(function (a) { return a.type === "project_created"; });
    var restActivities = projectActivities; //.filter(a => a.type !== "project_created");
    var finalActivities = projectCreated ? __spreadArrays([projectCreated], restActivities) : restActivities;
    // Fields mapping for professional display per type
    var displayFields = {
        project_created: ["name", "startDate", "endDate", "adminName", "clientEmail", "employeeList", "description"],
        check_in: ["progressSummary", "completionPercentage", "confidenceLevel", "employeeEmail", "week", "blockers",],
        risk_created: ["title", "severity", "solved", "mitigationPlan", "employeeEmail", "blockers"],
        feedback: ["comment", "satisfactionRating", "communicationClarity", "flaggedIssue", "issueDescription", "clientEmail"]
    };
    // console.log(projectActivities,"fdsadsf")
    var getDisplayValue = function (key, activity) {
        var value = activity[key];
        if ((key === "clientEmail" || key === "employeeEmail") && !value) {
            if (key === "clientEmail")
                value = selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.clientEmail;
            if (key === "employeeEmail")
                value = activity.employeeEmail || "Not Provided";
        }
        if (!value && value !== 0 && value !== false)
            return "Not Provided";
        if (key === "startDate" || key === "endDate") {
            return new Date(value).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
        }
        if (typeof value === "boolean")
            return value ? "Yes" : "No";
        return value;
    };
    return (React.createElement("div", { className: "px-6 md:px-12 py-8" },
        React.createElement("h1", { className: "text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" }, "Activity Timeline"),
        React.createElement("p", { className: "text-gray-600 mb-10" }, "Project-wise activity history"),
        React.createElement("div", { className: "flex gap-3 flex-wrap mb-12" }, projects.map(function (p) { return (React.createElement("button", { key: p._id, onClick: function () {
                setSelectedProjectId(p._id);
                setExpanded({});
            }, className: "px-5 py-2 rounded-xl font-semibold transition-all\n              " + (selectedProjectId === p._id
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-[1.04]"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50") }, p.name)); })),
        selectedProject && (React.createElement("div", { className: "mb-10" },
            React.createElement("h2", { className: "text-3xl font-bold text-gray-900" }, selectedProject.name),
            React.createElement("p", { className: "text-gray-500" }, "Timeline starts from project creation"))),
        React.createElement("div", { className: "relative" },
            React.createElement("div", { className: "absolute left-7 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full" }),
            React.createElement("div", { className: "space-y-12" }, finalActivities.map(function (activity, idx) {
                var _a;
                var isRisk = activity.type === "risk_created";
                var isOpen = expanded[idx];
                return (React.createElement("div", { key: idx, className: "flex gap-6 animate-[fadeUp_0.45s_ease-out]" },
                    React.createElement("div", { className: "w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-md\n                    " + (isRisk
                            ? activity.solved
                                ? "bg-green-100 border border-green-400"
                                : "bg-red-100 border border-red-400 animate-pulse"
                            : "bg-white border border-gray-300") }, adminHelpers_1.getActivityIcon(activity.type)),
                    React.createElement(components_1.Card, { className: "flex-1" },
                        React.createElement(components_1.CardBody, null,
                            React.createElement("div", { className: "flex justify-between items-start gap-4" },
                                React.createElement("h3", { className: "font-extrabold text-lg tracking-wide bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent" }, activity.type.replace(/_/g, " ").toUpperCase()),
                                React.createElement("button", { onClick: function () { return setExpanded(function (prev) {
                                        var _a;
                                        return (__assign(__assign({}, prev), (_a = {}, _a[idx] = !prev[idx], _a)));
                                    }); }, className: "text-sm font-semibold text-blue-600 hover:underline" }, isOpen ? "Collapse" : "Expand")),
                            isOpen && (React.createElement("div", { className: "mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm" }, (_a = displayFields[activity.type]) === null || _a === void 0 ? void 0 : _a.map(function (field) { return (React.createElement("p", { key: field },
                                React.createElement("span", { className: "font-semibold text-gray-800 capitalize" },
                                    field.replace(/([A-Z])/g, " $1"),
                                    ":"),
                                " ",
                                React.createElement("span", { className: "text-gray-600" }, getDisplayValue(field, activity)))); }))),
                            React.createElement("time", { className: "block mt-5 text-xs text-gray-500" }, new Date(activity.timestamp).toLocaleString(undefined, {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            }))))));
            }))),
        React.createElement("style", { jsx: true }, "\n        @keyframes fadeUp {\n          from {\n            opacity: 0;\n            transform: translateY(18px);\n          }\n          to {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n      ")));
}
exports["default"] = ActivityPage;
