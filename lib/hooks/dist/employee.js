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
exports.initialRiskHook = exports.createRiskHook = exports.createCheckInHook = exports.initailFormHook = exports.createEmployeeHook = void 0;
var react_1 = require("react");
var api_1 = require("../utils/api");
var passWord_1 = require("../utils/passWord");
exports.createEmployeeHook = function (newEmployee, setErrors, user, setProjects, setEmployeeList, setShowAddForm, setNewEmployee, setIsSubmitting) { return __awaiter(void 0, void 0, void 0, function () {
    var creationResponse, data, _i, _a, projectId, res, result, data, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 14, 15, 16]);
                return [4 /*yield*/, api_1.createUser({
                        name: newEmployee.name,
                        email: newEmployee.email,
                        password: passWord_1.generateRandomPassword(),
                        role: "employee"
                    })];
            case 1:
                creationResponse = _b.sent();
                if (!creationResponse.ok) return [3 /*break*/, 11];
                return [4 /*yield*/, creationResponse.json()];
            case 2:
                data = _b.sent();
                if (!!data.success) return [3 /*break*/, 3];
                setErrors({ email: data.message || "Employee creation failed" });
                return [3 /*break*/, 10];
            case 3:
                _i = 0, _a = newEmployee.assignedProjects;
                _b.label = 4;
            case 4:
                if (!(_i < _a.length)) return [3 /*break*/, 8];
                projectId = _a[_i];
                return [4 /*yield*/, api_1.updateProject({
                        projectId: projectId,
                        employeeEmail: newEmployee.email
                    })];
            case 5:
                res = _b.sent();
                return [4 /*yield*/, res.json()];
            case 6:
                result = _b.sent();
                if (!res.ok) {
                    setErrors({ email: (result === null || result === void 0 ? void 0 : result.message) || "Assign failed" });
                    return [2 /*return*/];
                }
                _b.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 4];
            case 8: return [4 /*yield*/, api_1.fetchEmployee(user, setProjects, setEmployeeList)];
            case 9:
                _b.sent();
                setShowAddForm(false);
                setNewEmployee({ name: "", email: "", assignedProjects: [] });
                setErrors({});
                _b.label = 10;
            case 10: return [3 /*break*/, 13];
            case 11: return [4 /*yield*/, creationResponse.json()];
            case 12:
                data = _b.sent();
                setErrors({ email: (data === null || data === void 0 ? void 0 : data.message) || "Employee creation failed" });
                _b.label = 13;
            case 13: return [3 /*break*/, 16];
            case 14:
                err_1 = _b.sent();
                setErrors({ email: "Failed to add employee" });
                return [3 /*break*/, 16];
            case 15:
                setIsSubmitting(false);
                return [7 /*endfinally*/];
            case 16: return [2 /*return*/];
        }
    });
}); };
exports.initailFormHook = function (user, projectId, setFormData) {
    react_1.useEffect(function () {
        if (user && projectId) {
            var now = new Date();
            var weekNumber_1 = "2025-W" + String(Math.ceil((now.getDate() + (now.getDay() === 0 ? -6 : now.getDay() - 1)) / 7)).padStart(2, "0");
            setFormData(function (prev) { return (__assign(__assign({}, prev), { projectId: projectId, employeeId: user._id || user.id || "", week: weekNumber_1 })); });
        }
    }, [user, projectId]);
};
exports.createCheckInHook = function (formData, projectId, projectName, clientEmail, employeeEmail, setShowSuccess, setErrors, setIsSubmitting, router) { return __awaiter(void 0, void 0, void 0, function () {
    var res, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                return [4 /*yield*/, api_1.createCheckIn(__assign(__assign({}, formData), { projectId: projectId, projectName: projectName, clientEmail: clientEmail, employeeEmail: employeeEmail }))];
            case 1:
                res = _a.sent();
                // const response=res.json();
                if (res.ok) {
                    setShowSuccess(true);
                    setTimeout(function () {
                        router.push("/employee/check-ins");
                    }, 1500);
                }
                else {
                    //throw new Error(response.message || "Failed to submit");
                }
                return [3 /*break*/, 4];
            case 2:
                error_1 = _a.sent();
                setErrors({
                    submit: error_1 instanceof Error ? error_1.message : "Failed to submit check-in"
                });
                return [3 /*break*/, 4];
            case 3:
                setIsSubmitting(false);
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createRiskHook = function (formData, projects, router, user, setErrors, setIsSubmitting) { return __awaiter(void 0, void 0, void 0, function () {
    var selectedProject, res, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                selectedProject = projects.find(function (p) { return p._id === formData.projectId; });
                return [4 /*yield*/, api_1.createRisk({
                        title: formData.title,
                        projectId: formData.projectId,
                        projectName: selectedProject === null || selectedProject === void 0 ? void 0 : selectedProject.name,
                        description: formData.description,
                        severity: formData.severity,
                        mitigationPlan: formData.mitigationPlan,
                        employeeEmail: user.email
                    })];
            case 1:
                res = _a.sent();
                if (res.ok)
                    router.push("/employee/risks");
                return [3 /*break*/, 4];
            case 2:
                error_2 = _a.sent();
                setErrors({
                    submit: error_2 instanceof Error ? error_2.message : "Failed to create risk"
                });
                return [3 /*break*/, 4];
            case 3:
                setIsSubmitting(false);
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.initialRiskHook = function (projects, formData, setFormData) {
    react_1.useEffect(function () {
        if (projects.length > 0 && !formData.projectId) {
            setFormData(function (prev) { return (__assign(__assign({}, prev), { projectId: projects[0]._id })); });
        }
    }, [projects, formData.projectId]);
};
