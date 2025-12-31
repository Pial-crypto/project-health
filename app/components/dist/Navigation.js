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
exports.Navigation = void 0;
var react_1 = require("react");
var link_1 = require("next/link");
var navigation_1 = require("next/navigation");
var types_1 = require("@/lib/types");
function Navigation() {
    var _this = this;
    var router = navigation_1.useRouter();
    var pathname = navigation_1.usePathname();
    var _a = react_1.useState(false), isMobileMenuOpen = _a[0], setIsMobileMenuOpen = _a[1];
    var _b = react_1.useState(false), isProfileOpen = _b[0], setIsProfileOpen = _b[1];
    var _c = react_1.useState(null), user = _c[0], setUser = _c[1];
    var _d = react_1.useState(true), isLoadingUser = _d[0], setIsLoadingUser = _d[1];
    // Fetch user on mount
    react_1.useEffect(function () {
        function checkUser() {
            return __awaiter(this, void 0, void 0, function () {
                var res, resData, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, 4, 5]);
                            return [4 /*yield*/, fetch("/api/auth/me", { credentials: "include" })];
                        case 1:
                            res = _a.sent();
                            if (!res.ok)
                                return [2 /*return*/, router.push("/auth/login")];
                            return [4 /*yield*/, res.json()];
                        case 2:
                            resData = _a.sent();
                            if (!resData.authenticated)
                                return [2 /*return*/, router.push("/auth/login")];
                            setUser(resData.user);
                            return [3 /*break*/, 5];
                        case 3:
                            err_1 = _a.sent();
                            console.error("Error fetching user:", err_1);
                            router.push("/auth/login");
                            return [3 /*break*/, 5];
                        case 4:
                            setIsLoadingUser(false);
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        checkUser();
    }, [router]);
    var logout = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/api/auth/logout", { method: "POST", credentials: "include" })];
                case 1:
                    _a.sent();
                    router.push("/auth/login");
                    return [2 /*return*/];
            }
        });
    }); };
    if (isLoadingUser)
        return null; // wait until user check completes
    if (!user)
        return null;
    //console.log("user ",user)
    var role = (user.role || "");
    var getMenuItems = function () {
        switch (role) {
            case types_1.UserRole.ADMIN:
                return [
                    { label: "Projects", href: "/admin/projects" },
                    { label: "Users", href: "/admin/users" },
                    { label: "Risks", href: "/admin/risks" },
                    { label: "Activity", href: "/admin/activity" },
                ];
            case types_1.UserRole.EMPLOYEE:
                return [
                    { label: "Dashboard", href: "/employee" },
                    { label: "Projects", href: "/employee/projects" },
                    { label: "Check-Ins", href: "/employee/check-ins" },
                    { label: "Risks", href: "/employee/risks" },
                ];
            case types_1.UserRole.CLIENT:
                return [
                    { label: "Dashboard", href: "/client" },
                    { label: "Projects", href: "/client/projects" },
                    { label: "Feedback", href: "/client/feedback" },
                ];
            default:
                return [];
        }
    };
    var menuItems = getMenuItems();
    var isActive = function (href) {
        if (role === types_1.UserRole.CLIENT && href === "/client") {
            return pathname === "/client";
        }
        if (role === types_1.UserRole.EMPLOYEE && href === "/employee") {
            return pathname === "/employee"; // exact match for employee dashboard
        }
        return pathname.startsWith(href);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 z-40 shadow-md" },
            react_1["default"].createElement("button", { onClick: function () { return setIsMobileMenuOpen(!isMobileMenuOpen); }, className: "text-gray-600 hover:text-gray-900 transition-colors" },
                react_1["default"].createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                    react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }))),
            react_1["default"].createElement("h1", { className: "flex-1 text-center font-bold text-lg text-blue-600" }, "Health Tracker"),
            react_1["default"].createElement("div", { className: "relative" },
                react_1["default"].createElement("button", { onClick: function () { return setIsProfileOpen(!isProfileOpen); }, className: "text-gray-600 hover:text-gray-900 transition-colors" },
                    react_1["default"].createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                        react_1["default"].createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z" }))),
                isProfileOpen && (react_1["default"].createElement("div", { className: "absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg animate-fadeIn" },
                    react_1["default"].createElement("div", { className: "px-4 py-3 border-b border-gray-200" },
                        react_1["default"].createElement("p", { className: "font-semibold text-gray-900" },
                            user.name,
                            " "),
                        role.toLowerCase() === "employee" && (react_1["default"].createElement("p", { className: "font-semibold text-gray-900" }, "The username is based on your 1st project")),
                        role.toLowerCase() === "client" && (react_1["default"].createElement("p", { className: "font-semibold text-gray-900" }, "The username was generated randomly")),
                        react_1["default"].createElement("p", { className: "text-sm text-gray-600" }, user.email),
                        react_1["default"].createElement("p", { className: "text-xs text-gray-500 uppercase mt-1" }, role)),
                    react_1["default"].createElement("button", { onClick: logout, className: "w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors" }, "Logout"))))),
        react_1["default"].createElement("aside", { className: "hidden lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:bg-gray-900 lg:text-white lg:overflow-y-auto lg:flex lg:flex-col shadow-lg" },
            react_1["default"].createElement("div", { className: "px-6 py-8 border-b border-gray-800" },
                react_1["default"].createElement("h1", { className: "text-2xl font-bold text-blue-400" }, "Health Tracker"),
                react_1["default"].createElement("p", { className: "text-sm text-gray-400 mt-1" }, "Project Management System")),
            react_1["default"].createElement("nav", { className: "flex-1 px-4 py-6 space-y-2" }, menuItems.map(function (item) { return (react_1["default"].createElement(link_1["default"], { key: item.href, href: item.href, className: "block px-4 py-2.5 rounded-lg transition-colors " + (isActive(item.href)
                    ? "bg-blue-600 text-white font-semibold shadow-md"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white") }, item.label)); })),
            react_1["default"].createElement("div", { className: "px-4 py-6 border-t border-gray-800" },
                react_1["default"].createElement("div", { className: "bg-gray-800 rounded-lg p-4 mb-4" },
                    react_1["default"].createElement("p", { className: "text-sm font-semibold text-white" }, user.name),
                    role.toLowerCase() === "employee" && (react_1["default"].createElement("p", { className: "font-semibold text-White-900" }, "The username is based on your 1st project")),
                    role.toLowerCase() === "client" && (react_1["default"].createElement("p", { className: "font-semibold text-White-900" }, "The username was generated randomly")),
                    react_1["default"].createElement("p", { className: "text-xs text-gray-400 mt-1" }, user.email),
                    react_1["default"].createElement("p", { className: "text-xs text-blue-400 uppercase font-semibold mt-2" }, role)),
                react_1["default"].createElement("button", { onClick: logout, className: "w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors" }, "Logout"))),
        isMobileMenuOpen && (react_1["default"].createElement("div", { className: "fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-30 lg:hidden shadow-md animate-fadeIn" },
            react_1["default"].createElement("nav", { className: "px-4 py-4 space-y-2" }, menuItems.map(function (item) { return (react_1["default"].createElement(link_1["default"], { key: item.href, href: item.href, className: "block px-4 py-2.5 rounded-lg transition-colors " + (isActive(item.href)
                    ? "bg-blue-600 text-white font-semibold shadow"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"), onClick: function () { return setIsMobileMenuOpen(false); } }, item.label)); }))))));
}
exports.Navigation = Navigation;
