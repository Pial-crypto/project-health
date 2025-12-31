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
exports.POST = exports.GET = void 0;
var server_1 = require("next/server");
var mongoose_1 = require("@/lib/mongoose");
var checkIn_1 = require("@/app/models/checkIn");
var mongoose_2 = require("mongoose");
function GET(req) {
    return __awaiter(this, void 0, void 0, function () {
        var url, employeeEmail, projectIds, query, checkInModel, checkIns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = new URL(req.url);
                    employeeEmail = url.searchParams.get("employeeEmail");
                    projectIds = url.searchParams.get("projectIds");
                    console.log("seraching for omuk");
                    query = {};
                    if (employeeEmail)
                        query.employeeEmail = employeeEmail;
                    if (projectIds)
                        query.projectId = { $in: projectIds.split(",") };
                    console.log("query", query);
                    checkInModel = mongoose_2.models.CheckIn || mongoose_2.model("CheckIn", checkIn_1.checkInSchema);
                    return [4 /*yield*/, checkInModel.find(query).sort({ timeStamp: -1 })];
                case 1:
                    checkIns = _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ message: "Check-ins fetched successfully", checkIns: checkIns, success: true }, { status: 200 })];
            }
        });
    });
}
exports.GET = GET;
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, projectId, employeeEmail, projectName, clientEmail, week, progressSummary, blockers, completionPercentage, confidenceLevel, checkInModel, newCheckIn, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, mongoose_1["default"]()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, req.json()];
                case 2:
                    body = _a.sent();
                    projectId = body.projectId, employeeEmail = body.employeeEmail, projectName = body.projectName, clientEmail = body.clientEmail, week = body.week, progressSummary = body.progressSummary, blockers = body.blockers, completionPercentage = body.completionPercentage, confidenceLevel = body.confidenceLevel;
                    console.log(body);
                    // Validation
                    if (!projectId || !employeeEmail || !progressSummary) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                message: "Missing required fields: projectId, employeeId, week, progressSummary",
                                success: false
                            }, { status: 400 })];
                    }
                    if (completionPercentage && (completionPercentage < 0 || completionPercentage > 100)) {
                        return [2 /*return*/, server_1.NextResponse.json({ message: "completionPercentage must be between 0-100", success: false }, { status: 400 })];
                    }
                    if (confidenceLevel && (confidenceLevel < 1 || confidenceLevel > 5)) {
                        return [2 /*return*/, server_1.NextResponse.json({ message: "confidenceLevel must be between 1-5", success: false }, { status: 400 })];
                    }
                    checkInModel = mongoose_2.models.CheckIn || mongoose_2.model("CheckIn", checkIn_1.checkInSchema);
                    newCheckIn = new checkInModel({
                        projectId: projectId,
                        employeeEmail: employeeEmail,
                        projectName: projectName,
                        clientEmail: clientEmail,
                        progressSummary: progressSummary,
                        blockers: blockers || "",
                        completionPercentage: completionPercentage || 0,
                        confidenceLevel: confidenceLevel || 3,
                        week: week
                    });
                    console.log("New check-in data:", newCheckIn);
                    return [4 /*yield*/, newCheckIn.save()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({
                            message: "Check-in submitted successfully",
                            success: true,
                            data: newCheckIn
                        }, { status: 201 })];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error creating check-in:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({
                            message: "Failed to submit check-in",
                            success: false,
                            error: error_1 instanceof Error ? error_1.message : "Unknown error"
                        }, { status: 500 })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
