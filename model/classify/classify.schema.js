"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
exports.ClassifySchema = new Mongoose.Schema({
    classifyTitle: String,
    keyCode: String,
    children: [{
            classifyName: String,
            classifyInfo: String,
            keyCode: String,
            imgURL: String
        }],
    meta: {
        createdTime: {
            type: Date,
            default: Date.now()
        },
        updatedTime: {
            type: Date,
            default: Date.now()
        }
    }
});
exports.ClassifySchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createdTime = this.meta.updatedTime = Date.now();
    }
    else {
        this.meta.updatedTime = Date.now();
    }
    next();
});
exports.ClassifySchema.statics.findAll = function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.find({}, function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
exports.ClassifySchema.statics.save = function (classifyTitle, keyCode, children) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        var model = _this.model('Classify');
        new model({ classifyTitle: classifyTitle, keyCode: keyCode, children: children })
            .save(function (err) { return returnData(err, resolve, reject); });
    });
};
exports.ClassifySchema.statics.checkByTitle = function (classifyTitle) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        _this.findOne({ classifyTitle: classifyTitle }, function (err, data) { return returnData(err, resolve, reject, data); });
    });
};
function returnData(err, resolve, reject, result) {
    if (err) {
        console.log("\u6570\u636E\u5E93\u67E5\u8BE2\u9519\u8BEF: " + err);
        reject(err);
    }
    resolve(result);
}
