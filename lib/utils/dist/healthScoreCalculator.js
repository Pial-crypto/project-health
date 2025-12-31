"use strict";
exports.__esModule = true;
exports.getHealthBgColor = exports.getHealthColor = exports.getHealthStatus = exports.calculateHealth = void 0;
function calculateHealth(input) {
    var score = 100;
    var _a = input.clientFeedbacks, clientFeedbacks = _a === void 0 ? [] : _a, _b = input.employeeCheckIns, employeeCheckIns = _b === void 0 ? [] : _b, _c = input.risks, risks = _c === void 0 ? [] : _c, _d = input.completionPercentage, completionPercentage = _d === void 0 ? 0 : _d, _e = input.daysElapsed, daysElapsed = _e === void 0 ? 0 : _e, _f = input.totalDays, totalDays = _f === void 0 ? 0 : _f;
    //  Client feedback (30 points)
    if (clientFeedbacks.length > 0) {
        var recentFeedbacks = clientFeedbacks.slice(-4);
        var avgSatisfaction = recentFeedbacks.reduce(function (sum, f) { return sum + f.satisfactionRating; }, 0) / recentFeedbacks.length;
        var avgClarity = recentFeedbacks.reduce(function (sum, f) { return sum + f.communicationClarity; }, 0) / recentFeedbacks.length;
        var flaggedCount = recentFeedbacks.filter(function (f) { return f.flaggedIssue; }).length;
        var clientScore = ((avgSatisfaction + avgClarity) / 2 / 5) * 30;
        clientScore -= Math.min(flaggedCount * 2, 10);
        score -= 30 - clientScore;
    }
    ////Employee confidence (25 points)
    if (employeeCheckIns.length > 0) {
        var recentCheckIns = employeeCheckIns.slice(-4);
        var avgConfidence = recentCheckIns.reduce(function (sum, c) { return sum + c.confidenceLevel; }, 0) / recentCheckIns.length;
        var confidenceScore = (avgConfidence / 5) * 25;
        score -= 25 - confidenceScore;
    }
    // Progress vs timeline (20 points)
    if (totalDays > 0) {
        var expectedProgress = (daysElapsed / totalDays) * 100;
        var progressDelta = completionPercentage - expectedProgress;
        var progressScore = 20;
        if (progressDelta < -10)
            progressScore = 5;
        else if (progressDelta < 0)
            progressScore = 10;
        else if (progressDelta < 10)
            progressScore = 18;
        else
            progressScore = 20;
        score -= 20 - progressScore;
    }
    //Risk assessment (25 points)
    if (risks.length > 0) {
        var riskPenalty_1 = 0;
        risks.forEach(function (r) {
            if (r.solved) {
                if (r.severity === "high")
                    riskPenalty_1 += 10;
                else if (r.severity === "medium")
                    riskPenalty_1 += 5;
                else
                    riskPenalty_1 += 2;
            }
        });
        score -= Math.min(riskPenalty_1, 25);
    }
    return Math.max(0, Math.min(100, Math.round(score)));
}
exports.calculateHealth = calculateHealth;
function getHealthStatus(score) {
    if (score >= 80)
        return "on_track";
    if (score >= 60)
        return "at_risk";
    return "critical";
}
exports.getHealthStatus = getHealthStatus;
function getHealthColor(score) {
    if (score >= 80)
        return "text-green-600";
    if (score >= 60)
        return "text-yellow-600";
    return "text-red-600";
}
exports.getHealthColor = getHealthColor;
function getHealthBgColor(score) {
    if (score >= 80)
        return "bg-green-50";
    if (score >= 60)
        return "bg-yellow-50";
    return "bg-red-50";
}
exports.getHealthBgColor = getHealthBgColor;
