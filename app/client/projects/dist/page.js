"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var components_1 = require("@/app/components");
var skeleton_1 = require("@/app/components/skeleton");
var link_1 = require("next/link");
var useProtectedRoute_1 = require("@/lib/hooks/useProtectedRoute");
var healthScoreCalculator_1 = require("@/lib/utils/healthScoreCalculator");
function ClientProjectsPage() {
    var router = navigation_1.useRouter();
    var _a = react_1.useState(null), user = _a[0], setUser = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState([]), projects = _c[0], setProjects = _c[1];
    var _d = react_1.useState([]), risks = _d[0], setRisks = _d[1];
    var _e = react_1.useState([]), feedbacks = _e[0], setFeedbacks = _e[1];
    var _f = react_1.useState([]), checkIns = _f[0], setCheckIns = _f[1];
    useProtectedRoute_1.useProtectedRoute(setUser, { clientProject: true, setProjects: setProjects, setRisks: setRisks, setFeedbacks: setFeedbacks, setCheckIns: setCheckIns }, "client", setIsLoading);
    if (isLoading)
        return React.createElement(skeleton_1.SkeletonList, null);
    if (!user)
        return null;
    var hasProjects = projects && projects.length > 0;
    var getProjectData = function (projectId) {
        var projectCheckIns = checkIns.filter(function (c) { return c.projectId === projectId; });
        var projectRisks = risks.filter(function (r) { return r.projectId === projectId; });
        var projectFeedbacks = feedbacks.filter(function (f) { return f.projectId === projectId; });
        return { projectCheckIns: projectCheckIns, projectRisks: projectRisks, projectFeedbacks: projectFeedbacks };
    };
    return (React.createElement("div", { className: "container mx-auto px-4 py-8" },
        React.createElement("div", { className: "mb-8" },
            React.createElement("h1", { className: "text-3xl font-bold text-gray-900 mb-2" }, "My Projects"),
            React.createElement("p", { className: "text-gray-600" }, "Monitor your projects and provide feedback to your team.")),
        !hasProjects ? (React.createElement(components_1.Card, { className: "rounded-xl border border-gray-200 shadow-sm" },
            React.createElement(components_1.CardBody, { className: "p-8" },
                React.createElement(components_1.EmptyState, { title: "No Projects", description: "You don't have any assigned projects at the moment." })))) : (React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, projects.map(function (project) {
            var _a = getProjectData(project._id), projectCheckIns = _a.projectCheckIns, projectRisks = _a.projectRisks, projectFeedbacks = _a.projectFeedbacks;
            var daysElapsed = (new Date().getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24);
            var totalDays = (new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24);
            var avgCompletion = projectCheckIns.length > 0 ? projectCheckIns.reduce(function (sum, c) { return sum + c.completionPercentage; }, 0) / projectCheckIns.length : 0;
            var healthScore = healthScoreCalculator_1.calculateHealth({
                clientFeedbacks: projectFeedbacks,
                employeeCheckIns: projectCheckIns,
                risks: projectRisks,
                completionPercentage: avgCompletion,
                daysElapsed: daysElapsed,
                totalDays: totalDays
            });
            var healthStatus = healthScoreCalculator_1.getHealthStatus(healthScore);
            var healthColor = healthScoreCalculator_1.getHealthColor(healthScore);
            var healthBg = healthScoreCalculator_1.getHealthBgColor(healthScore);
            return (React.createElement(link_1["default"], { key: project._id, href: {
                    pathname: "/client/projects/" + project._id,
                    query: { name: project.name, id: project._id }
                } },
                React.createElement(components_1.Card, { className: "rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:scale-105 transition-all cursor-pointer" },
                    React.createElement(components_1.CardBody, { className: "p-6" },
                        React.createElement("div", { className: "flex flex-col gap-4" },
                            React.createElement("div", { className: "flex items-center justify-between" },
                                React.createElement("h3", { className: "text-lg font-semibold text-gray-900" }, project.name),
                                React.createElement("span", { className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold " + healthBg + " " + healthColor }, healthStatus.replace("_", " ").toUpperCase())),
                            project.description && (React.createElement("p", { className: "text-sm text-gray-600 line-clamp-2" }, project.description)),
                            React.createElement("div", { className: "grid grid-cols-2 gap-3 text-sm text-gray-700 mt-2" },
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-xs font-semibold uppercase text-gray-500" }, "Start date"),
                                    React.createElement("p", null, project.startDate ? new Date(project.startDate).toLocaleDateString() : "-")),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-xs font-semibold uppercase text-gray-500" }, "End date"),
                                    React.createElement("p", null, project.endDate ? new Date(project.endDate).toLocaleDateString() : "-")),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-xs font-semibold uppercase text-gray-500" }, "Admin"),
                                    React.createElement("p", null, project.adminName || "—")),
                                React.createElement("div", null,
                                    React.createElement("p", { className: "text-xs font-semibold uppercase text-gray-500" }, "Your email"),
                                    React.createElement("p", { className: "truncate" }, project.clientEmail || user.email)),
                                React.createElement("div", { className: "col-span-2" },
                                    React.createElement("p", { className: "text-xs font-semibold uppercase text-gray-500" }, "Health Score"),
                                    React.createElement("div", { className: "flex items-center gap-2" },
                                        React.createElement("div", { className: "w-full h-3 bg-gray-200 rounded-full overflow-hidden" },
                                            React.createElement("div", { className: "h-full rounded-full transition-all duration-500", style: {
                                                    width: healthScore + "%",
                                                    backgroundColor: healthScore >= 80 ? "#16a34a" : healthScore >= 60 ? "#ca8a04" : "#dc2626"
                                                } })),
                                        React.createElement("span", { className: "text-sm font-bold text-gray-900" },
                                            healthScore,
                                            "%")))))))));
        })))));
}
exports["default"] = ClientProjectsPage;
