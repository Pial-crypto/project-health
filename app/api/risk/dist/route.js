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
var mongoose_1 = require("mongoose");
var mongoose_2 = require("@/lib/mongoose");
var risk_1 = require("@/app/models/risk");
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, title, projectId, projectName, description, employeeEmail, severity, mitigationPlan, Risk, newRisk;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_2["default"]()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, req.json()];
                case 2:
                    body = _a.sent();
                    console.log(body);
                    title = body.title, projectId = body.projectId, projectName = body.projectName, description = body.description, employeeEmail = body.employeeEmail, severity = body.severity, mitigationPlan = body.mitigationPlan;
                    if (!title ||
                        !projectId ||
                        !projectName ||
                        !description ||
                        !employeeEmail ||
                        !severity ||
                        !mitigationPlan) {
                        return [2 /*return*/, new Response(JSON.stringify({ message: "Missing required fields", success: false }), { status: 400 })];
                    }
                    Risk = mongoose_1.models.Risk || mongoose_1.model("Risk", risk_1.riskSchema);
                    newRisk = new Risk({
                        title: title,
                        projectId: projectId,
                        projectName: projectName,
                        description: description,
                        employeeEmail: employeeEmail,
                        severity: severity,
                        mitigationPlan: mitigationPlan,
                        solved: false,
                        timeStamp: new Date()
                    });
                    return [4 /*yield*/, newRisk.save()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, new Response(JSON.stringify({
                            message: "Risk created successfully",
                            success: true
                        }), { status: 201 })];
            }
        });
    });
}
exports.POST = POST;
function GET(req) {
    return __awaiter(this, void 0, void 0, function () {
        var url, searchParams, employeeEmail, projectId, Risk, query, risks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_2["default"]()];
                case 1:
                    _a.sent();
                    url = new URL(req.url);
                    searchParams = url.searchParams;
                    employeeEmail = searchParams.get("employeeEmail");
                    projectId = searchParams.get("projectId");
                    Risk = mongoose_1.models.Risk || mongoose_1.model("Risk", risk_1.riskSchema);
                    console.log("getting risks ");
                    query = {};
                    if (employeeEmail)
                        query.employeeEmail = employeeEmail;
                    if (projectId)
                        query.projectId = projectId;
                    return [4 /*yield*/, Risk.find(query).sort({ timeStamp: -1 })];
                case 2:
                    risks = _a.sent();
                    return [2 /*return*/, new Response(JSON.stringify({
                            message: "Risk fetched successfully",
                            risks: risks,
                            success: true
                        }), { status: 200 })];
            }
        });
    });
}
exports.GET = GET;
function PUT(request) {
    return __awaiter(this, void 0, void 0, function () {
        var url, searchParams, riskId, Risk, risk, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, mongoose_2["default"]()];
                case 1:
                    _a.sent();
                    url = new URL(request.url);
                    searchParams = url.searchParams;
                    riskId = searchParams.get("riskId");
                    Risk = mongoose_1.models.Risk || mongoose_1.model("Risk", risk_1.riskSchema);
                    return [4 /*yield*/, Risk.findByIdAndUpdate(riskId, { solved: true }, { "new": true })];
                case 2:
                    risk = _a.sent();
                    if (!risk) {
                        return [2 /*return*/, new Response(JSON.stringify({
                                message: "Risk not found",
                                risk: risk,
                                success: true
                            }), { status: 404 })];
                    }
                    return [2 /*return*/, new Response(JSON.stringify({
                            message: "Risk updated successfully",
                            success: true
                        }))];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error updating risk:", error_1);
                    return [2 /*return*/, new Response(JSON.stringify({
                            message: "Risk updation failed",
                            success: true
                        }))];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.PUT = PUT;
