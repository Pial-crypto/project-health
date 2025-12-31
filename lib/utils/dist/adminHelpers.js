"use strict";
exports.__esModule = true;
exports.validateEmployeeForm = exports.validateForm = exports.isValidEmail = exports.getActivityIcon = exports.getActivityColor = exports.formatDate = exports.getRandomStatus = exports.getRandomHealthScore = void 0;
exports.getRandomHealthScore = function () { return Math.floor(Math.random() * 100); };
exports.getRandomStatus = function () {
    var statuses = ["on_track", "at_risk", "critical"];
    return statuses[Math.floor(Math.random() * statuses.length)];
};
exports.formatDate = function (date) {
    return new Date(date).toLocaleDateString();
};
exports.getActivityColor = function (type) {
    switch (type) {
        case "check_in": return "border-blue-300 bg-blue-50";
        case "feedback": return "border-green-300 bg-green-50";
        case "risk_created": return "border-red-300 bg-red-50";
        case "risk_updated": return "border-red-300 bg-red-50";
        case "project_created": return "border-purple-300 bg-purple-50";
        case "project_status_changed": return "border-yellow-300 bg-yellow-50";
        default: return "border-gray-300 bg-gray-50";
    }
};
exports.getActivityIcon = function (type) {
    switch (type) {
        case "check_in": return "📋";
        case "feedback": return "💬";
        case "risk_created": return "⚠️";
        case "risk_updated": return "🔄";
        case "project_created": return "✨";
        case "project_status_changed": return "📊";
        default: return "📝";
    }
};
exports.isValidEmail = function (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
exports.validateForm = function (formData, setErrors) {
    var _a, _b, _c;
    var newErrors = {};
    console.log(formData);
    if (!((_a = formData.name) === null || _a === void 0 ? void 0 : _a.trim()))
        newErrors.name = "Project name is required";
    if (!((_b = formData.description) === null || _b === void 0 ? void 0 : _b.trim()))
        newErrors.description = "Description is required";
    if (!((_c = formData.clientEmail) === null || _c === void 0 ? void 0 : _c.trim())) {
        newErrors.clientEmail = "Client email is required";
    }
    else if (!exports.isValidEmail(formData.clientEmail)) {
        newErrors.clientEmail = "Enter a valid email address";
    }
    if (!formData.startDate)
        newErrors.startDate = "Start date is required";
    if (!formData.endDate)
        newErrors.endDate = "End date is required";
    if (formData.startDate &&
        formData.endDate &&
        new Date(formData.startDate) >= new Date(formData.endDate)) {
        newErrors.endDate = "End date must be after start date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
exports.validateEmployeeForm = function (newEmployee, setErrors) {
    var _a, _b, _c;
    var newErrors = {};
    if (!((_a = newEmployee.name) === null || _a === void 0 ? void 0 : _a.trim())) {
        newErrors.name = "Employee name is required";
    }
    if (!((_b = newEmployee.email) === null || _b === void 0 ? void 0 : _b.trim())) {
        newErrors.email = "Email is required";
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmployee.email)) {
        newErrors.email = "Invalid email";
    }
    if (((_c = newEmployee.assignedProjects) === null || _c === void 0 ? void 0 : _c.length) === 0) {
        newErrors.projects = "Assign at least one project";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
