"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = exports.Role = exports.Language = exports.ItemStatus = exports.ItemCondition = void 0;
var ItemCondition;
(function (ItemCondition) {
    ItemCondition["Fair"] = "FAIR";
    ItemCondition["Good"] = "GOOD";
    ItemCondition["New"] = "NEW";
    ItemCondition["Poor"] = "POOR";
})(ItemCondition || (exports.ItemCondition = ItemCondition = {}));
var ItemStatus;
(function (ItemStatus) {
    ItemStatus["Available"] = "AVAILABLE";
    ItemStatus["Exchangeable"] = "EXCHANGEABLE";
    ItemStatus["Gift"] = "GIFT";
    ItemStatus["Reserved"] = "RESERVED";
    ItemStatus["Transferred"] = "TRANSFERRED";
})(ItemStatus || (exports.ItemStatus = ItemStatus = {}));
var Language;
(function (Language) {
    Language["En"] = "EN";
    Language["ZhHk"] = "ZH_HK";
})(Language || (exports.Language = Language = {}));
var Role;
(function (Role) {
    Role["Admin"] = "ADMIN";
    Role["Moderator"] = "MODERATOR";
    Role["User"] = "USER";
})(Role || (exports.Role = Role = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["Approved"] = "APPROVED";
    TransactionStatus["Cancelled"] = "CANCELLED";
    TransactionStatus["Completed"] = "COMPLETED";
    TransactionStatus["Pending"] = "PENDING";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
