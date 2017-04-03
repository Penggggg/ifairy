"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var classify_schema_1 = require("./classify.schema");
exports.default = Mongoose.model('Classify', classify_schema_1.ClassifySchema);
