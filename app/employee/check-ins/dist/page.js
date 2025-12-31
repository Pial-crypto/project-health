"use client";
"use strict";
exports.__esModule = true;
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var components_1 = require("@/app/components");
var link_1 = require("next/link");
var skeleton_1 = require("@/app/components/skeleton");
var checkInhelpers_1 = require("@/lib/utils/checkInhelpers");
var useProtectedRoute_1 = require("@/lib/hooks/useProtectedRoute");
/* ---------------- Countdown Helper ---------------- */
function getDaysUntilNextWeek() {
    var now = new Date();
    var day = now.getDay(); // Sunday = 0
    return day === 0 ? 1 : 8 - day;
}
function CheckInsList() {
    var router = navigation_1.useRouter();
    var _a = react_1.useState(true), isLoading = _a[0], setIsLoading = _a[1];
    var _b = react_1.useState(null), user = _b[0], setUser = _b[1];
    var _c = react_1.useState([]), projects = _c[0], setProjects = _c[1];
    var _d = react_1.useState([]), checkIns = _d[0], setCheckIns = _d[1];
    useProtectedRoute_1.useProtectedRoute(setUser, { employeeCheckInGet: true, setProjects: setProjects, setCheckIns: setCheckIns }, "employee", setIsLoading);
    if (isLoading)
        return React.createElement(skeleton_1.SkeletonList, null);
    if (!user)
        return null;
    /* ---------------- Weekly logic ---------------- */
    var thisWeekProjectSet = new Set(checkIns.filter(function (c) { return checkInhelpers_1.isCurrentWeek(c.timeStamp); }).map(function (c) { return c.projectId; }));
    var runningProjects = projects.filter(function (p) { return !checkInhelpers_1.hasPassed(p.endDate); });
    var submittedCount = thisWeekProjectSet.size;
    var totalRunning = runningProjects.length;
    var completionPercent = totalRunning === 0
        ? 0
        : Math.round((submittedCount / totalRunning) * 100);
    var daysLeft = getDaysUntilNextWeek();
    return (React.createElement("div", { className: "p-6 space-y-12" },
        React.createElement("div", null,
            React.createElement("h1", { className: "text-4xl font-extrabold text-gray-900 mb-2" }, "Weekly Check-ins"),
            React.createElement("p", { className: "text-gray-600 text-lg" }, "One check-in per project, per week"),
            React.createElement("div", { className: "mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full\r\n                     bg-gradient-to-r from-indigo-500 to-cyan-500\r\n                     text-white text-sm font-semibold shadow-md animate-pulse" },
                "\u23F3 Next check-in in ",
                daysLeft,
                " day",
                daysLeft > 1 && "s")),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
            { label: "Submitted", value: submittedCount },
            { label: "Pending", value: totalRunning - submittedCount },
            { label: "Completion", value: completionPercent + "%" },
        ].map(function (item, i) { return (React.createElement(components_1.Card, { key: i, className: "border-0 bg-gradient-to-br from-white to-indigo-50 shadow-lg" },
            React.createElement(components_1.CardBody, { className: "text-center py-7" },
                React.createElement("div", { className: "text-3xl font-extrabold text-gray-900 mb-1" }, item.value),
                React.createElement("p", { className: "text-sm text-gray-600" }, item.label)))); })),
        React.createElement("div", null,
            React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-5" }, "Submit Check-in"),
            React.createElement("div", { className: "space-y-4" }, projects.map(function (project) {
                var ended = checkInhelpers_1.hasPassed(project.endDate);
                var submitted = thisWeekProjectSet.has(project._id);
                return (React.createElement(components_1.Card, { key: project._id, className: "border-0 bg-white hover:shadow-xl\r\n                           hover:-translate-y-1 transition-all duration-300" },
                    React.createElement(components_1.CardBody, { className: "flex items-center justify-between" },
                        React.createElement("div", null,
                            React.createElement("h3", { className: "font-semibold text-gray-900" }, project.name),
                            React.createElement("p", { className: "text-sm text-gray-600" },
                                "Client: ",
                                project.clientEmail || "N/A")),
                        ended || submitted ? (React.createElement("span", { className: "text-sm font-semibold text-gray-500" }, ended ? "Project Ended" : "Submitted this week")) : (React.createElement(link_1["default"], { href: {
                                pathname: "/employee/check-ins/" + project._id,
                                query: {
                                    id: project._id,
                                    name: project.name,
                                    description: project.description,
                                    clientEmail: project.clientEmail,
                                    startDate: project.startDate,
                                    endDate: project.endDate,
                                    adminId: project.adminId,
                                    adminName: project.adminName,
                                    employeeList: JSON.stringify(project.employeeList || [])
                                }
                            } },
                            React.createElement(components_1.Button, { size: "sm" }, "New Check-in"))))));
            }))),
        React.createElement("div", null,
            React.createElement("h2", { className: "text-2xl font-bold text-gray-900 mb-6" }, "Check-in Timeline"),
            checkIns.length === 0 ? (React.createElement(components_1.Card, { className: "border-0 bg-gray-50" },
                React.createElement(components_1.CardBody, null,
                    React.createElement(components_1.EmptyState, { title: "No Check-ins Yet", description: "Your weekly updates will appear here" })))) : (React.createElement("div", { className: "relative pl-6 space-y-6" },
                React.createElement("div", { className: "absolute left-2 top-0 bottom-0 w-1\r\n                         bg-gradient-to-b from-indigo-400 to-cyan-400 rounded-full" }),
                checkIns.map(function (checkIn, i) { return (React.createElement(components_1.Card, { key: checkIn._id, className: "border-0 bg-white shadow-md\r\n                           hover:shadow-xl hover:-translate-y-1\r\n                           transition-all duration-300" },
                    React.createElement(components_1.CardBody, { className: "relative space-y-4" },
                        React.createElement("div", { className: "absolute -left-8 top-6 w-4 h-4 rounded-full\r\n                               bg-gradient-to-r from-indigo-500 to-cyan-500" }),
                        React.createElement("div", { className: "flex items-start justify-between" },
                            React.createElement("div", null,
                                React.createElement("h3", { className: "text-lg font-bold text-gray-900" }, checkIn.projectName),
                                React.createElement("p", { className: "text-sm text-gray-600" },
                                    "Client: ",
                                    checkIn.clientEmail || "N/A")),
                            React.createElement("div", { className: "text-right text-xs text-gray-500" },
                                React.createElement("div", { className: "font-semibold" },
                                    "Week ",
                                    checkIn.week),
                                React.createElement("div", null, new Date(checkIn.timeStamp).toLocaleDateString()))),
                        React.createElement("div", { className: "rounded-xl p-4\r\n                               bg-gradient-to-br from-indigo-50 to-cyan-50" },
                            React.createElement("p", { className: "text-xs font-semibold text-gray-500 mb-1" }, "\uD83D\uDCCC Progress Summary"),
                            React.createElement("p", { className: "text-sm text-gray-700 leading-relaxed" }, checkIn.progressSummary || "No summary provided")),
                        React.createElement("div", { className: "rounded-xl p-4 bg-gray-50" },
                            React.createElement("p", { className: "text-xs font-semibold text-gray-500 mb-1" }, "\uD83D\uDEA7 Blockers"),
                            React.createElement("p", { className: "text-sm text-gray-700" }, checkIn.blockers || "No blockers reported")),
                        React.createElement("div", { className: "grid grid-cols-2 gap-4 pt-2" },
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-xs font-semibold text-gray-500 mb-1" }, "\u2705 Completion"),
                                React.createElement("div", { className: "flex items-center gap-2" },
                                    React.createElement("div", { className: "w-full h-2 bg-gray-200 rounded-full overflow-hidden" },
                                        React.createElement("div", { className: "h-full rounded-full", style: {
                                                width: checkIn.completionPercentage + "%",
                                                background: checkIn.completionPercentage >= 80
                                                    ? "linear-gradient(to right,#22c55e,#16a34a)"
                                                    : checkIn.completionPercentage >= 50
                                                        ? "linear-gradient(to right,#facc15,#eab308)"
                                                        : "linear-gradient(to right,#fb7185,#e11d48)"
                                            } })),
                                    React.createElement("span", { className: "text-xs font-bold text-gray-700" },
                                        checkIn.completionPercentage || 0,
                                        "%"))),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-xs font-semibold text-gray-500 mb-1" }, "\uD83D\uDD25 Confidence"),
                                React.createElement("div", { className: "flex items-center gap-2" },
                                    React.createElement("div", { className: "w-full h-2 bg-gray-200 rounded-full overflow-hidden" },
                                        React.createElement("div", { className: "h-full rounded-full\r\n                                       bg-gradient-to-r from-indigo-500 to-cyan-500", style: {
                                                width: (checkIn.confidenceLevel / 5) * 100 + "%"
                                            } })),
                                    React.createElement("span", { className: "text-xs font-bold text-gray-700" },
                                        checkIn.confidenceLevel,
                                        "/5"))))))); }))))));
}
exports["default"] = CheckInsList;
