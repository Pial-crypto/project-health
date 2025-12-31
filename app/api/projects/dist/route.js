"use strict";
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
exports.PUT = exports.GET = exports.POST = void 0;
var mongoose_1 = require("@/lib/mongoose");
var mongoose_2 = require("mongoose");
var project_1 = require("@/app/models/project");
var mongoose_3 = require("mongoose");
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, name, description, clientEmail, startDate, endDate, adminId, adminName, Project, newProject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1["default"]()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, req.json()];
                case 2:
                    body = _a.sent();
                    name = body.name, description = body.description, clientEmail = body.clientEmail, startDate = body.startDate, endDate = body.endDate, adminId = body.adminId, adminName = body.adminName;
                    Project = mongoose_3.models.Project || mongoose_2.model("Project", project_1.projectSchema);
                    newProject = new Project({
                        name: name,
                        description: description,
                        clientEmail: clientEmail,
                        startDate: startDate,
                        endDate: endDate,
                        adminId: adminId,
                        adminName: adminName,
                        employeeList: []
                    });
                    return [4 /*yield*/, newProject.save()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, new Response(JSON.stringify({ message: "Project created successfully", success: true }), { status: 201 })];
            }
        });
    });
}
exports.POST = POST;
function GET(req) {
    return __awaiter(this, void 0, void 0, function () {
        var url, adminId, clientEmail, employeeEmail, role, query, Project, projects, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = new URL(req.url);
                    adminId = url.searchParams.get("adminId");
                    clientEmail = url.searchParams.get("clientEmail");
                    employeeEmail = url.searchParams.get("employeeEmail");
                    role = url.searchParams.get("role");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, mongoose_1["default"]()];
                case 2:
                    _a.sent();
                    query = {};
                    if (role === "admin" && adminId) {
                        query = { adminId: adminId };
                    }
                    else if (role === "client" && clientEmail) {
                        query = { clientEmail: clientEmail };
                    }
                    else if (role === "employee" && employeeEmail) {
                        query = { employeeList: employeeEmail };
                    }
                    else {
                        return [2 /*return*/, new Response(JSON.stringify({ success: false, message: "Invalid or missing parameters" }), { status: 400 })];
                    }
                    Project = mongoose_3.models.Project || mongoose_2.model("Project", project_1.projectSchema);
                    console.log(query);
                    return [4 /*yield*/, Project.find(query).sort({ timeStamp: -1 })];
                case 3:
                    projects = _a.sent();
                    // console.log("Projects here", projects)
                    return [2 /*return*/, new Response(JSON.stringify(projects), { status: 200 })];
                case 4:
                    error_1 = _a.sent();
                    console.error("Failed to fetch projects:", error_1);
                    return [2 /*return*/, new Response(JSON.stringify({ success: false, message: "Failed to fetch projects" }), { status: 500 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.GET = GET;
function PUT(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, projectId, employeeEmail, projectVar, Project, updatedProject, project, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_1["default"]()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, req.json()];
                case 2:
                    body = _a.sent();
                    projectId = body.projectId, employeeEmail = body.employeeEmail, projectVar = body.projectVar;
                    console.log("Adding employee ", employeeEmail, " to project ", projectId);
                    console.log("ProjectVar:", projectVar);
                    Project = mongoose_3.models.Project || mongoose_2.model("Project", project_1.projectSchema);
                    if (!projectVar) return [3 /*break*/, 4];
                    return [4 /*yield*/, Project.findByIdAndUpdate(projectVar.id, { $set: projectVar }, { "new": true })];
                case 3:
                    updatedProject = _a.sent();
                    console.log("Updated project details:", updatedProject);
                    return [2 /*return*/, new Response(JSON.stringify({
                            success: true,
                            message: "Project updated successfully",
                            data: updatedProject
                        }), { status: 200 })];
                case 4: return [4 /*yield*/, Project.findById(projectId)];
                case 5:
                    project = _a.sent();
                    if (!project) {
                        console.log("No project found");
                        return [2 /*return*/, new Response(JSON.stringify({ success: false, message: "Project not found" }), { status: 404 })];
                    }
                    // Initialize employeeList as empty array if undefined
                    if (!Array.isArray(project.employeeList)) {
                        project.employeeList = [];
                    }
                    // Check if employee already exists
                    if (project.employeeList.includes(employeeEmail)) {
                        return [2 /*return*/, new Response(JSON.stringify({
                                success: false,
                                message: "Employee already exists",
                                data: project
                            }), { status: 200 })];
                    }
                    project.employeeList.push(employeeEmail);
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, project.save()];
                case 7:
                    _a.sent();
                    console.log("Updated employee list:", project.employeeList);
                    return [2 /*return*/, new Response(JSON.stringify({
                            success: true,
                            message: "Employee added successfully",
                            data: project
                        }), { status: 200 })];
                case 8:
                    err_1 = _a.sent();
                    console.error("Failed to save project:", err_1);
                    return [2 /*return*/, new Response(JSON.stringify({
                            success: false,
                            message: "Failed to update project"
                        }), { status: 500 })];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.PUT = PUT;
