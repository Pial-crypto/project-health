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
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var components_1 = require("@/app/components");
var react_hot_toast_1 = require("react-hot-toast");
var api_1 = require("@/lib/utils/api");
function SignupPage() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = react_1.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "admin",
        department: ""
    }), formData = _b[0], setFormData = _b[1];
    var _c = react_1.useState(""), error = _c[0], setError = _c[1];
    var _d = react_1.useState({}), validationErrors = _d[0], setValidationErrors = _d[1];
    var validateForm = function () {
        var _a, _b;
        var errors = {};
        //     if(formData.role.toLowerCase()==="employee" || formData.role.toLowerCase()==="client" && UserStorage.load()?.role !=="admin"){
        // //toast.error("Only admin can create employees or clients!", { style: { background: "red", color: "white" } });
        //    setError(
        //         "Only admin can create employees or clients!"
        //       );
        //     }
        if (!((_a = formData.name) === null || _a === void 0 ? void 0 : _a.trim())) {
            errors.name = "Name is required";
        }
        if (!((_b = formData.email) === null || _b === void 0 ? void 0 : _b.trim())) {
            errors.email = "Email is required";
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Invalid email format";
        }
        if (!formData.password) {
            errors.password = "Password is required";
        }
        else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
        // Clear validation error for this field when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(function (prev) {
                var _a;
                return (__assign(__assign({}, prev), (_a = {}, _a[name] = "", _a)));
            });
        }
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var response, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setError("");
                    if (!validateForm()) {
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, api_1.createUser({
                            name: formData.name,
                            email: formData.email,
                            password: formData.password,
                            role: "admin"
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (data.success) {
                        react_hot_toast_1["default"].success("User creation successful! Please log in.", { style: { background: "green", color: "white" } });
                        if (formData.role.toLowerCase() === "admin")
                            router.push("/auth/login");
                    }
                    else {
                        react_hot_toast_1["default"].error(data.message, { style: { background: "red", color: "white" } });
                    }
                    _a.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5:
                    err_1 = _a.sent();
                    setError(err_1 instanceof Error ? err_1.message : "Registration failed. Please try again.");
                    return [3 /*break*/, 7];
                case 6:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden" },
        React.createElement("div", { className: "w-full max-w-md mx-4 sm:mx-6" },
            React.createElement("div", { className: "mb-10 text-center" },
                React.createElement("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg" },
                    React.createElement("span", { className: "text-2xl font-bold text-blue-600" }, "HT")),
                React.createElement("h1", { className: "text-4xl font-bold text-white mb-2" }, "Health Tracker"),
                React.createElement("p", { className: "text-blue-100 text-lg" }, "Project Management System")),
            React.createElement(components_1.Card, { className: "shadow-2xl border-0 rounded-2xl" },
                React.createElement(components_1.CardBody, { className: "px-8 py-10" },
                    React.createElement("h2", { className: "text-3xl font-bold text-gray-900 mb-2 text-center" }, "Create Account"),
                    React.createElement("p", { className: "text-center text-gray-600 mb-8" }, "Join our platform to get started"),
                    error && (React.createElement("div", { className: "mb-6" },
                        React.createElement(components_1.Alert, { type: "error", message: error }))),
                    React.createElement("form", { onSubmit: handleSubmit, className: "space-y-5" },
                        React.createElement("div", null,
                            React.createElement(components_1.Input, { label: "Full Name", type: "text", name: "name", placeholder: "John Doe", value: formData.name, onChange: handleChange, required: true }),
                            validationErrors.name && (React.createElement("p", { className: "text-red-500 text-sm mt-1" }, validationErrors.name))),
                        React.createElement("div", null,
                            React.createElement(components_1.Input, { label: "Email Address", type: "email", name: "email", placeholder: "you@example.com", value: formData.email, onChange: handleChange, required: true }),
                            validationErrors.email && (React.createElement("p", { className: "text-red-500 text-sm mt-1" }, validationErrors.email))),
                        React.createElement("div", null,
                            React.createElement(components_1.Input, { label: "Password", type: "password", name: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: formData.password, onChange: handleChange, required: true }),
                            validationErrors.password && (React.createElement("p", { className: "text-red-500 text-sm mt-1" }, validationErrors.password))),
                        React.createElement("div", null,
                            React.createElement(components_1.Input, { label: "Confirm Password", type: "password", name: "confirmPassword", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: formData.confirmPassword, onChange: handleChange, required: true }),
                            validationErrors.confirmPassword && (React.createElement("p", { className: "text-red-500 text-sm mt-1" }, validationErrors.confirmPassword))),
                        React.createElement(components_1.Button, { type: "submit", isLoading: isLoading, className: "w-full mt-2", size: "lg" }, "Create Admin")))),
            React.createElement("p", { className: "text-center text-blue-100 text-xs mt-8 opacity-75" }, "\u00A9 2025 Health Tracker. All rights reserved."))));
}
exports["default"] = SignupPage;
