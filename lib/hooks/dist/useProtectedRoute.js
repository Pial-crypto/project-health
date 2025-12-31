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
exports.useProtectedRoute = void 0;
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var api_1 = require("../utils/api");
// export async function useProtectedRoute(setUser:any,data:any,role:string,setIsLoading:any) {
//   const router=useRouter()
//    useEffect(() => {
//     // const userData = localStorage.getItem("user");
//      //if (!userData) return router.push("/auth/login");
//      try {
//     fetch("/api/auth/me", { credentials: "include" })
//       .then(res => {
//         if (!res.ok) {
//           router.push("/auth/login")
//         //  throw new Error("Not authenticated");
//         }
//         return res.json();
//       })
//       .then(resData => {
//         if (!resData.authenticated) {
//           router.push("/auth/login");
//           return;
//         }
//         const parsedUser = resData.user; 
//         setUser(parsedUser);
//        if (parsedUser.role !== role) return router.push("/unauthorized");
//          const promises: Promise<any>[] = [];
// if(data.createRisk){
//   promises.push(fetchProjects(parsedUser, data.setProjects, setIsLoading))
// }
//        if(data.employeeRisks){
//           promises.push(fetchRisk({employeeEmail:parsedUser.email},data.setRisks))
//        }
//        if( data.employeeHome){
//               promises.push(fetchProjects(parsedUser, data.setProjects, undefined));
//       promises.push( fetchRisk({employeeEmail:parsedUser.email},data.setRisks))
//  promises.push(  fetchCheckIns(
//   { employeeEmail: parsedUser.email }, 
//   data.setCheckIns,                
// ))
//        }
//        if(data.clientHome){
//              promises.push(fetchFeedback(undefined, parsedUser.id, data.setFeedbacks))
//  promises.push(fetchProjects(parsedUser, data.setProjects, setIsLoading))
//        }
//        if(data.employeeCheckInGet){
//      //  Promise.all([
//        promises.push( fetchProjects(parsedUser, data.setProjects,undefined))
// promises.push(fetchCheckIns(
//   { employeeEmail: parsedUser.email }, 
//   data.setCheckIns,                  
//   setIsLoading                 
// ))
//  //     ]);
//        }
//        if(data.clientProject){
//        promises.push( fetchProjects(parsedUser,data.setProjects,setIsLoading))
//        }
//        if(data.employeeProjects){
//        promises.push(  fetchProjects(parsedUser, data.setProjects, setIsLoading))
//        }
//        if(data.clientProjectDetails){
//         setIsLoading(false)
//        }
//        if(data.employeeCheckIn){
//        }
//        if(data.userAdmin)
//           promises.push(  fetchEmployee(parsedUser,data.setProjects,data.setEmployeeList).finally(() => setIsLoading(false)))
//        if(data.projectDetails || data.projectDetails){
//         setIsLoading(false);
//        }
//        if(data.homeAdmin){
//         promises.push(fetchProjects(parsedUser,data.setProjects,setIsLoading))
//        }
//        if(data.adminRisk){
//              promises.push( fetchProjects(parsedUser,data.setProjects,undefined))
//        promises.push( fetchRisk(undefined,data.setRisks))
//        }
//        if(data.clientFeedback){
//       promises.push( fetchProjects(parsedUser, data.setProjects, setIsLoading))
//        promises.push(fetchFeedback(undefined,parsedUser.id,data.setFeedbacks))
//        }
//  if(data.setProjects && data.setRisks && data.setRisks && data.setCheckIns && data.setFeedbacks){
//       // Promise.all([
//         promises.push( fetchProjects(parsedUser, data.setProjects, undefined))
//           promises.push(fetchRisk(undefined, data.setRisks))
//           promises.push(fetchFeedback(undefined, undefined, data.setFeedbacks))
//          promises.push( fetchCheckIns({}, data.setCheckIns, undefined))
//       // ]).finally(() => setIsLoading(false));
//       }
//       if (promises.length > 0) {
//           await Promise.all(promises);
//         }
//     }
//    )} catch (error) {
//        console.error("Failed to parse user data:", error);
//        router.push("/auth/login");
//      } finally {
//    setIsLoading &&    setIsLoading(false);
//     }
//    }, [router]);
// }
function useProtectedRoute(setUser, data, role, setIsLoading) {
    var _this = this;
    var router = navigation_1.useRouter();
    react_1.useEffect(function () {
        var init = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, resData, parsedUser, promises, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, 6, 7]);
                        // Start loading
                        setIsLoading && setIsLoading(true);
                        return [4 /*yield*/, fetch("/api/auth/me", { credentials: "include" })];
                    case 1:
                        res = _a.sent();
                        if (!res.ok) {
                            router.push("/auth/login");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, res.json()];
                    case 2:
                        resData = _a.sent();
                        if (!resData.authenticated) {
                            router.push("/auth/login");
                            return [2 /*return*/];
                        }
                        parsedUser = resData.user;
                        setUser(parsedUser);
                        if (parsedUser.role !== role)
                            return [2 /*return*/, router.push("/unauthorized")];
                        promises = [];
                        if (data.clientProjectDetails) {
                            promises.push(api_1.fetchProjects(parsedUser, data.setProjects, undefined));
                            promises.push(api_1.fetchRisk(undefined, data.setRisks));
                            promises.push(api_1.fetchFeedback(undefined, undefined, data.setFeedbacks));
                            promises.push(api_1.fetchCheckIns({}, data.setCheckIns, undefined));
                        }
                        if (data.createRisk) {
                            promises.push(api_1.fetchProjects(parsedUser, data.setProjects, setIsLoading));
                        }
                        if (data.employeeRisks) {
                            promises.push(api_1.fetchRisk({ employeeEmail: parsedUser.email }, data.setRisks));
                        }
                        if (data.employeeHome) {
                            promises.push(api_1.fetchProjects(parsedUser, data.setProjects, undefined));
                            promises.push(api_1.fetchRisk({ employeeEmail: parsedUser.email }, data.setRisks));
                            promises.push(api_1.fetchCheckIns({ employeeEmail: parsedUser.email }, data.setCheckIns));
                        }
                        if (data.clientHome) {
                            promises.push(api_1.fetchFeedback(undefined, parsedUser.id, data.setFeedbacks));
                            promises.push(api_1.fetchProjects(parsedUser, data.setProjects, setIsLoading));
                        }
                        if (data.employeeCheckInGet) {
                            //  Promise.all([
                            promises.push(api_1.fetchProjects(parsedUser, data.setProjects, undefined));
                            promises.push(api_1.fetchCheckIns({ employeeEmail: parsedUser.email }, data.setCheckIns, setIsLoading));
                            //     ]);
                        }
                        if (data.clientProject) {
                            promises.push(api_1.fetchProjects(parsedUser, data.setProjects, setIsLoading));
                        }
                        if (data.employeeProjects) {
                            promises.push(api_1.fetchProjects(parsedUser, data.setProjects, undefined));
                            promises.push(api_1.fetchRisk(undefined, data.setRisks));
                            promises.push(api_1.fetchFeedback(undefined, undefined, data.setFeedbacks));
                            promises.push(api_1.fetchCheckIns({}, data.setCheckIns, undefined));
                            // promises.push(  fetchProjects(parsedUser, data.setProjects, setIsLoading))
                        }
                        if (data.clientProjectDetails) {
                            setIsLoading(false);
                        }
                        if (data.employeeCheckIn) {
                        }
                        if (data.userAdmin)
                            promises.push(api_1.fetchEmployee(parsedUser, data.setProjects, data.setEmployeeList)["finally"](function () { return setIsLoading(false); }));
                        if (data.projectDetails || data.projectDetails) {
                            setIsLoading(false);
                        }
                        if (data.homeAdmin) {
                            promises.push(api_1.fetchProjects(parsedUser, data.setProjects, setIsLoading));
                        }
                        if (data.adminRisk) {
                            promises.push(api_1.fetchProjects(parsedUser, data.setProjects, undefined));
                            promises.push(api_1.fetchRisk(undefined, data.setRisks));
                        }
                        if (data.clientFeedback) {
                            promises.push(api_1.fetchProjects(parsedUser, data.setProjects, setIsLoading));
                            promises.push(api_1.fetchFeedback(undefined, parsedUser.id, data.setFeedbacks));
                        }
                        if (data.setProjects && data.setRisks && data.setRisks && data.setCheckIns && data.setFeedbacks) {
                            // Promise.all([
                            promises.push(api_1.fetchProjects(parsedUser, data.setProjects, undefined));
                            promises.push(api_1.fetchRisk(undefined, data.setRisks));
                            promises.push(api_1.fetchFeedback(undefined, undefined, data.setFeedbacks));
                            promises.push(api_1.fetchCheckIns({}, data.setCheckIns, undefined));
                            // ]).finally(() => setIsLoading(false));
                        }
                        if (data.projectDetails) {
                            // fetchProjects()
                        }
                        if (!(promises.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(promises)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        error_1 = _a.sent();
                        console.error("useProtectedRoute error:", error_1);
                        router.push("/auth/login");
                        return [3 /*break*/, 7];
                    case 6:
                        // Only now mark loading as false
                        setIsLoading && setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        init();
    }, [router]);
}
exports.useProtectedRoute = useProtectedRoute;
