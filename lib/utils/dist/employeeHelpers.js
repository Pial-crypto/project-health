"use strict";
exports.__esModule = true;
exports.validateRiskForm = exports.validateCheckIn = void 0;
exports.validateCheckIn = function (formData, setErrors) {
    var newErrors = {};
    if (!formData.progressSummary.trim())
        newErrors.progressSummary = "Progress summary is required";
    if (!formData.completionPercentage)
        newErrors.completionPercentage = "Completion percentage is required";
    var completion = parseInt(formData.completionPercentage);
    if (isNaN(completion) || completion < 0 || completion > 100)
        newErrors.completionPercentage = "Must be a number between 0 and 100";
    if (parseInt(formData.confidenceLevel) < 1 || parseInt(formData.confidenceLevel) > 5)
        newErrors.confidenceLevel = "Confidence level must be between 1-5";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
exports.validateRiskForm = function (formData, setErrors) {
    var newErrors = {};
    if (!formData.projectId)
        newErrors.projectId = "Project is required";
    if (!formData.title.trim())
        newErrors.title = "Risk title is required";
    if (!formData.mitigationPlan.trim())
        newErrors.mitigationPlan = "Mitigation plan is required";
    if (!formData.description.trim()) {
        newErrors.description = "Description is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
