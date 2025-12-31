"use strict";
// API client for backend communication
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
exports.solveRisk = exports.fetchRisk = exports.createRisk = exports.fetchCheckIns = exports.createCheckIn = exports.fetchFeedback = exports.createFeedback = exports.fetchEmployee = exports.fetchProjects = exports.updateProject = exports.createUser = exports.createProject = void 0;
var API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
exports.createProject = function (formData, user) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/projects", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(__assign(__assign({}, formData), { adminId: user.id, adminName: user.name }))
                })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
function createUser(params) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/api/auth/signUp', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: params.name,
                            email: params.email,
                            password: params.password,
                            role: params.role
                        })
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.createUser = createUser;
exports.updateProject = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var projectId, employeeEmail, projectVar, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                projectId = data.projectId;
                employeeEmail = data.employeeEmail;
                projectVar = data.projectVar;
                console.log("Updating project with data:", data);
                return [4 /*yield*/, fetch("/api/projects", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            projectId: projectId,
                            employeeEmail: employeeEmail,
                            projectVar: projectVar
                        })
                    })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
function fetchProjects(user, setProjects, setIsLoading) {
    return __awaiter(this, void 0, void 0, function () {
        var params, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    console.log("Fetching projects for user:", user);
                    params = new URLSearchParams();
                    params.append("role", user.role);
                    if (user.role === "admin") {
                        params.append("adminId", user.id);
                    }
                    else if (user.role === "client") {
                        params.append("clientEmail", user.email);
                    }
                    else if (user.role === "employee") {
                        params.append("employeeEmail", user.email);
                    }
                    console.log("Fetching projects with params:", params.toString());
                    return [4 /*yield*/, fetch("/api/projects?" + params.toString())];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch projects");
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    if (data && Array.isArray(data)) {
                        setProjects(data);
                    }
                    else {
                        setProjects([]);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error("Failed to fetch projects:", error_1);
                    setProjects([]);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading && setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.fetchProjects = fetchProjects;
exports.fetchEmployee = function (user, setProjects, setEmployeeList) { return __awaiter(void 0, void 0, void 0, function () {
    var res, data, emailSet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/projects?adminId=" + user.id + "&role=" + user.role)];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                setProjects(Array.isArray(data) ? data : []);
                emailSet = new Set();
                data.forEach(function (p) {
                    var _a;
                    (_a = p.employeeList) === null || _a === void 0 ? void 0 : _a.forEach(function (email) { return emailSet.add(email); });
                });
                setEmployeeList(Array.from(emailSet).map(function (email) { return ({ email: email }); }));
                return [2 /*return*/];
        }
    });
}); };
exports.createFeedback = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/feedback", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.fetchFeedback = function (projectId, clientId, setFeedbacks) { return __awaiter(void 0, void 0, void 0, function () {
    var res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/feedback?projectId=" + projectId + "&clientId=" + clientId, {
                    method: "GET"
                })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                //console.log("Fetched feedback response:", await res.json());
                setFeedbacks(data.data);
                return [2 /*return*/, res];
        }
    });
}); };
exports.createCheckIn = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/checkIn", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.fetchCheckIns = function (data, setCheckIns, setIsLoading) { return __awaiter(void 0, void 0, void 0, function () {
    var queryParams, response, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                setIsLoading && setIsLoading(true);
                queryParams = new URLSearchParams();
                if (data.employeeEmail)
                    queryParams.append("employeeEmail", data.employeeEmail);
                if (data.projectIds && data.projectIds.length > 0)
                    queryParams.append("projectIds", data.projectIds.join(","));
                return [4 /*yield*/, fetch("/api/checkIn?" + queryParams.toString(), {
                        method: "GET"
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok)
                    throw new Error("Failed to fetch check-ins");
                return [4 /*yield*/, response.json()];
            case 2:
                result = _a.sent();
                setCheckIns(result.checkIns || []);
                return [3 /*break*/, 5];
            case 3:
                error_2 = _a.sent();
                console.error("Error fetching check-ins:", error_2);
                setCheckIns([]);
                return [3 /*break*/, 5];
            case 4:
                setIsLoading && setIsLoading(false);
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
function createRisk(data) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(data);
                    return [4 /*yield*/, fetch("/api/risk", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(data)
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
exports.createRisk = createRisk;
exports.fetchRisk = function (data, setRisks) { return __awaiter(void 0, void 0, void 0, function () {
    var searchParams, url, response, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchParams = new URLSearchParams();
                if (data === null || data === void 0 ? void 0 : data.employeeEmail) {
                    searchParams.append("employeeEmail", data.employeeEmail);
                }
                if (data === null || data === void 0 ? void 0 : data.projectId) {
                    searchParams.append("projectId", data.projectId);
                }
                url = searchParams.toString()
                    ? "/api/risk?" + searchParams.toString()
                    : "/api/risk";
                return [4 /*yield*/, fetch(url, {
                        method: "GET"
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to fetch risks");
                }
                return [4 /*yield*/, response.json()];
            case 2:
                result = _a.sent();
                setRisks(result.risks);
                return [2 /*return*/];
        }
    });
}); };
exports.solveRisk = function (riskId) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/risk?riskId=" + riskId, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" }
                })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response];
        }
    });
}); };
