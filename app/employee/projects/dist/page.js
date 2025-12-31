"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var components_1 = require("@/app/components");
var link_1 = require("next/link");
var skeleton_1 = require("@/app/components/skeleton");
var useProtectedRoute_1 = require("@/lib/hooks/useProtectedRoute");
var healthScoreCalculator_1 = require("@/lib/utils/healthScoreCalculator");
function EmployeeProjectsPage() {
    var router = navigation_1.useRouter();
    var _a = react_1.useState(null), user = _a[0], setUser = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState([]), projects = _c[0], setProjects = _c[1];
    var _d = react_1.useState([]), risks = _d[0], setRisks = _d[1];
    var _e = react_1.useState([]), feedbacks = _e[0], setFeedbacks = _e[1];
    var _f = react_1.useState([]), checkIns = _f[0], setCheckIns = _f[1];
    useProtectedRoute_1.useProtectedRoute(setUser, { employeeProjects: true, setProjects: setProjects, setCheckIns: setCheckIns, setFeedbacks: setFeedbacks, setRisks: setRisks }, "employee", setIsLoading);
    // console.log("here is the projects", projects);
    var getProjectData = function (projectId) {
        var projectCheckIns = checkIns.filter(function (c) { return c.projectId === projectId; });
        var projectRisks = risks.filter(function (r) { return r.projectId === projectId; });
        var projectFeedbacks = feedbacks.filter(function (f) { return f.projectId === projectId; });
        return { projectCheckIns: projectCheckIns, projectRisks: projectRisks, projectFeedbacks: projectFeedbacks };
    };
    var displayProjects = projects;
    if (isLoading)
        return React.createElement(skeleton_1.SkeletonList, null);
    if (!user)
        return null;
    return (React.createElement("div", { className: "p-4" },
        React.createElement("div", { className: "flex items-center justify-between mb-12" },
            React.createElement("div", null,
                React.createElement("h1", { className: "text-4xl font-extrabold text-gray-900 mb-2" }, "Projects"),
                React.createElement("p", { className: "text-gray-600 text-lg" }, "Monitor all your active projects"))),
        displayProjects.length === 0 ? (React.createElement(components_1.Card, { className: "bg-gradient-to-r from-blue-50 to-blue-100 border-0 shadow-lg" },
            React.createElement(components_1.CardBody, null,
                React.createElement(components_1.EmptyState, { title: "No Projects Yet", description: "Create your first project to get started", action: { label: "Create Project", href: "/admin/projects/new" } })))) : (React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, displayProjects.map(function (project) {
            var _a;
            var _b = getProjectData(project._id), projectCheckIns = _b.projectCheckIns, projectRisks = _b.projectRisks, projectFeedbacks = _b.projectFeedbacks;
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
            // Color logic for health bar
            var healthBarColor = healthColor.replace("text-", "bg-");
            return (React.createElement(link_1["default"], { key: project._id, href: {
                    pathname: "/admin/projects/" + project._id,
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
                React.createElement(components_1.Card, { className: "h-full hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-0 bg-white rounded-xl" },
                    React.createElement(components_1.CardBody, { className: "p-6" },
                        React.createElement("div", { className: "flex items-start justify-between mb-4" },
                            React.createElement("div", { className: "flex-1" },
                                React.createElement("div", { className: "flex items-center gap-3 mb-3" },
                                    React.createElement("h3", { className: "text-xl font-bold text-gray-900" }, project.name),
                                    React.createElement("span", { className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold " + healthBg + " " + healthColor }, healthStatus.replace("_", " ").toUpperCase())),
                                React.createElement("p", { className: "text-gray-700 text-sm leading-relaxed line-clamp-2" }, project.description))),
                        React.createElement("div", { className: "grid grid-cols-2 gap-4 pt-4 border-t border-gray-200" },
                            React.createElement("div", { className: "space-y-1" },
                                React.createElement("p", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wide" }, "Client Email"),
                                React.createElement("p", { className: "text-sm font-medium text-blue-700 truncate" }, project.clientEmail)),
                            React.createElement("div", { className: "space-y-1" },
                                React.createElement("p", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wide" }, "Team Size"),
                                React.createElement("p", { className: "text-sm font-medium text-purple-700" },
                                    ((_a = project.employeeList) === null || _a === void 0 ? void 0 : _a.length) || 0,
                                    " members")),
                            React.createElement("div", { className: "space-y-1" },
                                React.createElement("p", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wide" }, "Start Date"),
                                React.createElement("p", { className: "text-sm font-medium text-green-700" }, new Date(project.startDate).toLocaleDateString())),
                            React.createElement("div", { className: "space-y-1" },
                                React.createElement("p", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wide" }, "End Date"),
                                React.createElement("p", { className: "text-sm font-medium text-red-700" }, new Date(project.endDate).toLocaleDateString())),
                            React.createElement("div", { className: "space-y-1 col-span-2" },
                                React.createElement("p", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wide" }, "Health Score"),
                                React.createElement("div", { className: "flex items-center gap-2" },
                                    React.createElement("div", { className: "w-full h-3 bg-gray-200 rounded-full overflow-hidden" },
                                        React.createElement("div", { className: "h-full rounded-full transition-all duration-500", style: {
                                                width: healthScore + "%",
                                                backgroundColor: healthScore >= 80 ? "#16a34a" : healthScore >= 60 ? "#ca8a04" : "#dc2626" // green, yellow, red
                                            } })),
                                    React.createElement("span", { className: "text-sm font-bold text-gray-900" },
                                        healthScore,
                                        "%"))))))));
        })))));
}
exports["default"] = EmployeeProjectsPage;
