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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var components_1 = require("@/app/components");
var useProtectedRoute_1 = require("@/lib/hooks/useProtectedRoute");
var employee_1 = require("@/lib/hooks/employee");
var adminHelpers_1 = require("@/lib/utils/adminHelpers");
var skeleton_1 = require("@/app/components/skeleton");
function EmployeeManagementPage() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState(true), isLoading = _a[0], setIsLoading = _a[1];
    var _b = react_1.useState(false), isSubmitting = _b[0], setIsSubmitting = _b[1];
    var _c = react_1.useState(false), showAddForm = _c[0], setShowAddForm = _c[1];
    var _d = react_1.useState([]), projects = _d[0], setProjects = _d[1];
    var _e = react_1.useState([]), employeeList = _e[0], setEmployeeList = _e[1];
    var _f = react_1.useState(null), user = _f[0], setUser = _f[1];
    var _g = react_1.useState({
        name: "",
        email: "",
        assignedProjects: []
    }), newEmployee = _g[0], setNewEmployee = _g[1];
    var _h = react_1.useState({}), errors = _h[0], setErrors = _h[1];
    useProtectedRoute_1.useProtectedRoute(setUser, { userAdmin: true, setProjects: setProjects, setEmployeeList: setEmployeeList }, "admin", setIsLoading);
    var handleAddEmployee = function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            if (!adminHelpers_1.validateEmployeeForm(newEmployee, setErrors))
                return [2 /*return*/];
            setIsSubmitting(true);
            employee_1.createEmployeeHook(newEmployee, setErrors, user, setProjects, setEmployeeList, setShowAddForm, setNewEmployee, setIsSubmitting);
            return [2 /*return*/];
        });
    }); };
    var getEmployeeProjects = function (email) {
        return projects.filter(function (p) { var _a; return (_a = p.employeeList) === null || _a === void 0 ? void 0 : _a.includes(email); });
    };
    if (isLoading)
        return React.createElement(skeleton_1.SkeletonList, null);
    return (React.createElement("div", { className: "space-y-10" },
        React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("div", null,
                React.createElement("h1", { className: "text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent" }, "Employee Management"),
                React.createElement("p", { className: "text-gray-500 mt-1" }, "Assign employees to projects and track involvement")),
            React.createElement(components_1.Button, { onClick: function () { return setShowAddForm(!showAddForm); }, size: "lg", className: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md" }, showAddForm ? "Cancel" : "+ Add Employee")),
        showAddForm && (React.createElement(components_1.Card, { className: "border-0 shadow-xl bg-gradient-to-br from-white to-blue-50" },
            React.createElement(components_1.CardBody, null,
                React.createElement("form", { onSubmit: handleAddEmployee, className: "space-y-5" },
                    React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
                        React.createElement(components_1.Input, { label: "Employee Name *", value: newEmployee.name, onChange: function (e) {
                                return setNewEmployee(__assign(__assign({}, newEmployee), { name: e.target.value }));
                            }, error: errors.name }),
                        React.createElement(components_1.Input, { label: "Email Address *", type: "email", value: newEmployee.email, onChange: function (e) {
                                return setNewEmployee(__assign(__assign({}, newEmployee), { email: e.target.value }));
                            }, error: errors.email })),
                    React.createElement("div", null,
                        React.createElement("label", { className: "block text-sm font-semibold text-gray-700 mb-2" }, "Assign Projects"),
                        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 bg-white rounded-lg border p-4" }, projects.map(function (project) { return (React.createElement("label", { key: project._id, className: "flex items-center gap-3 text-sm cursor-pointer hover:bg-blue-50 p-2 rounded" },
                            React.createElement("input", { type: "checkbox", className: "w-4 h-4 accent-blue-600", checked: newEmployee.assignedProjects.includes(project._id), onChange: function () {
                                    return setNewEmployee(function (prev) { return (__assign(__assign({}, prev), { assignedProjects: prev.assignedProjects.includes(project._id)
                                            ? prev.assignedProjects.filter(function (id) { return id !== project._id; })
                                            : __spreadArrays(prev.assignedProjects, [project._id]) })); });
                                } }),
                            React.createElement("span", { className: "font-medium text-gray-800" }, project.name))); })),
                        errors.projects && (React.createElement("p", { className: "text-sm text-red-600 mt-1" }, errors.projects))),
                    React.createElement(components_1.Button, { type: "submit", disabled: isSubmitting, className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white" }, isSubmitting ? "Adding..." : "Add Employee"))))),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, employeeList.length === 0 ? (React.createElement(components_1.Card, null,
            React.createElement(components_1.CardBody, null,
                React.createElement(components_1.EmptyState, { title: "No Employees", description: "Add your first employee to get started" })))) : (employeeList.map(function (emp) {
            var assignedProjects = getEmployeeProjects(emp.email);
            return (React.createElement(components_1.Card, { key: emp.email, className: "border-0 shadow-lg hover:shadow-xl transition bg-gradient-to-br from-white to-gray-50" },
                React.createElement(components_1.CardBody, { className: "space-y-4" },
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-lg font-bold text-gray-900" }, emp.email),
                        React.createElement("p", { className: "text-sm text-gray-500" },
                            "Assigned to",
                            " ",
                            React.createElement("span", { className: "font-semibold text-blue-600" }, assignedProjects.length),
                            " ",
                            "project",
                            assignedProjects.length !== 1 && "s")),
                    React.createElement("div", { className: "flex flex-wrap gap-2" }, assignedProjects.length === 0 ? (React.createElement("span", { className: "text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-500" }, "No projects assigned")) : (assignedProjects.map(function (p) { return (React.createElement("span", { key: p._id, className: "text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700" }, p.name)); }))))));
        })))));
}
exports["default"] = EmployeeManagementPage;
