"use client";
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
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var link_1 = require("next/link");
var components_1 = require("@/app/components");
function LoginPage() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(""), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(""), error = _c[0], setError = _c[1];
    var _d = react_1.useState(false), isLoading = _d[0], setIsLoading = _d[1];
    // if(localStorage.getItem("user")){
    //   router.push("/");
    // }
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setError("");
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/auth/signIn", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email: email, password: password })
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (!res.ok) {
                        setError(data.message || "Login failed");
                        setIsLoading(false);
                        return [2 /*return*/];
                    }
                    // localStorage.setItem("token", data.token);
                    // localStorage.setItem("user", JSON.stringify(data.user));
                    router.push("/");
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    setError("Something went wrong. Please try again.");
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
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
                    React.createElement("h2", { className: "text-3xl font-bold text-gray-900 mb-2 text-center" }, "Welcome Back"),
                    React.createElement("p", { className: "text-center text-gray-600 mb-8" }, "Sign in to your account to continue"),
                    error && (React.createElement("div", { className: "mb-6" },
                        React.createElement(components_1.Alert, { type: "error", message: error }))),
                    React.createElement("form", { onSubmit: handleSubmit, className: "space-y-5" },
                        React.createElement(components_1.Input, { label: "Email Address", type: "email", placeholder: "you@example.com", value: email, onChange: function (e) { return setEmail(e.target.value); }, required: true }),
                        React.createElement(components_1.Input, { label: "Password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: password, onChange: function (e) { return setPassword(e.target.value); }, required: true }),
                        React.createElement(components_1.Button, { type: "submit", isLoading: isLoading, className: "w-full mt-2", size: "lg" }, "Sign In")),
                    React.createElement("div", { className: "mt-8 text-center" },
                        React.createElement("p", { className: "text-sm text-gray-700" },
                            "Don't have an account?",
                            " ",
                            React.createElement(link_1["default"], { href: "/auth/signup", className: "text-blue-600 hover:text-blue-700 font-semibold underline" }, "Create one now"))))),
            React.createElement("p", { className: "text-center text-blue-100 text-xs mt-8 opacity-75" }, "\u00A9 2025 Health Tracker. All rights reserved."))));
}
exports["default"] = LoginPage;
