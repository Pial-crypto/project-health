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
exports.GET = exports.POST = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var mongoose_3 = require("@/lib/mongoose");
var feedback_1 = require("@/app/models/feedback");
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var body, projectId, comment, flaggedIssue, issueDescription, satisfactionRating, communicationClarity, clientId, feedback, newFeedback;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose_3["default"]()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, req.json()];
                case 2:
                    body = _a.sent();
                    projectId = body.projectId, comment = body.comment, flaggedIssue = body.flaggedIssue, issueDescription = body.issueDescription, satisfactionRating = body.satisfactionRating, communicationClarity = body.communicationClarity, clientId = body.clientId;
                    feedback = mongoose_2.models.Feedback || mongoose_1.model("Feedback", feedback_1.feedbackSchema);
                    newFeedback = new feedback({
                        projectId: projectId,
                        comment: comment,
                        flaggedIssue: flaggedIssue,
                        issueDescription: issueDescription,
                        satisfactionRating: satisfactionRating,
                        communicationClarity: communicationClarity,
                        clientId: clientId
                    });
                    console.log("New feedback data:", newFeedback);
                    return [4 /*yield*/, newFeedback.save()];
                case 3:
                    _a.sent();
                    return [2 /*return*/, new Response(JSON.stringify({ message: "Feedback submitted successfully", success: true }), { status: 201 })];
            }
        });
    });
}
exports.POST = POST;
function GET(req) {
    return __awaiter(this, void 0, void 0, function () {
        var url, rawProjectId, rawClientId, query, Feedback_1, feedbacks_1, Feedback, feedbacks, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = new URL(req.url);
                    rawProjectId = url.searchParams.get("projectId");
                    rawClientId = url.searchParams.get("clientId");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, mongoose_3["default"]()];
                case 2:
                    _a.sent();
                    console.log("Fetching feedback for:", {
                        projectId: rawProjectId,
                        clientId: rawClientId
                    });
                    query = {};
                    if (!(rawProjectId &&
                        rawProjectId !== "undefined" &&
                        rawProjectId !== "null" &&
                        rawProjectId.trim() !== "")) return [3 /*break*/, 3];
                    query.projectId = new mongoose_1["default"].Types.ObjectId(rawProjectId);
                    return [3 /*break*/, 6];
                case 3:
                    if (!(rawClientId &&
                        rawClientId !== "undefined" &&
                        rawClientId !== "null" &&
                        rawClientId.trim() !== "")) return [3 /*break*/, 4];
                    query.clientId = rawClientId;
                    return [3 /*break*/, 6];
                case 4:
                    Feedback_1 = mongoose_2.models.Feedback || mongoose_1.model("Feedback", feedback_1.feedbackSchema);
                    console.log("Final feedback query:", query);
                    return [4 /*yield*/, Feedback_1.find().sort({ timeStamp: -1 })];
                case 5:
                    feedbacks_1 = _a.sent();
                    console.log("Fetched feedbacks:", feedbacks_1);
                    return [2 /*return*/, new Response(JSON.stringify({ success: true, data: feedbacks_1 }), { status: 200 })];
                case 6:
                    Feedback = mongoose_2.models.Feedback || mongoose_1.model("Feedback", feedback_1.feedbackSchema);
                    console.log("Final feedback query:", query);
                    return [4 /*yield*/, Feedback.find(query).sort({ timeStamp: -1 })];
                case 7:
                    feedbacks = _a.sent();
                    console.log("Fetched feedbacks:", feedbacks);
                    return [2 /*return*/, new Response(JSON.stringify({ success: true, data: feedbacks }), { status: 200 })];
                case 8:
                    error_1 = _a.sent();
                    console.error("Error fetching feedback:", error_1);
                    return [2 /*return*/, new Response(JSON.stringify({
                            success: false,
                            message: "Failed to fetch feedback"
                        }), { status: 500 })];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.GET = GET;
