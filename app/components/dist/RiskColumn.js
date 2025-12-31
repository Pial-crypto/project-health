"use strict";
exports.__esModule = true;
exports.RiskColumn = void 0;
var Button_1 = require("./Button");
var Card_1 = require("./Card");
function RiskColumn(_a) {
    var title = _a.title, count = _a.count, color = _a.color, risks = _a.risks, onViewDetails = _a.onViewDetails;
    var colorClasses = {
        red: "bg-red-50 text-red-800",
        yellow: "bg-yellow-50 text-yellow-800",
        green: "bg-green-50 text-green-800"
    };
    return (React.createElement("div", { className: "rounded-xl border " + color + "-200 p-4 space-y-4" },
        React.createElement("h2", { className: "font-semibold text-lg " + color + "-700" },
            title,
            " (",
            count,
            ")"),
        risks.length === 0 ? (React.createElement("p", { className: "text-sm text-gray-500" }, "No risks")) : (risks.map(function (risk) { return (React.createElement(Card_1.Card, { key: risk._id, className: "shadow-sm border" },
            React.createElement(Card_1.CardBody, { className: "p-4 space-y-2" },
                React.createElement("p", { className: "font-semibold" }, risk.title),
                React.createElement("p", { className: "text-xs text-gray-500" },
                    "Project: ",
                    risk.projectName),
                React.createElement(Button_1.Button, { size: "sm", className: "bg-" + color + "-600 hover:bg-" + color + "-700 text-white", onClick: function () { return onViewDetails(risk); } }, "View Details")))); }))));
}
exports.RiskColumn = RiskColumn;
