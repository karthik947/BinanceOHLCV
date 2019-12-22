"use strict";
/**
 * @projectName fast-csv
 * @github https://github.com/C2FO/fast-csv
 * @includeDoc [Change Log] ../History.md
 * @header [../README.md]
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const parser_1 = require("./parser");
var formatter_1 = require("./formatter");
exports.format = formatter_1.format;
exports.write = formatter_1.write;
exports.writeToStream = formatter_1.writeToStream;
exports.writeToBuffer = formatter_1.writeToBuffer;
exports.writeToString = formatter_1.writeToString;
exports.writeToPath = formatter_1.writeToPath;
var parser_2 = require("./parser");
exports.parse = parser_2.parse;
exports.parseString = parser_2.parseString;
exports.parseStream = parser_2.parseStream;
exports.parseFile = parser_2.parseFile;
exports.fromString = util_1.deprecate(parser_1.parseString, 'csv.fromString has been deprecated in favor of csv.parseString');
exports.fromStream = util_1.deprecate(parser_1.parseStream, 'csv.fromStream has been deprecated in favor of csv.parseStream');
exports.fromPath = util_1.deprecate(parser_1.parseFile, 'csv.fromPath has been deprecated in favor of csv.parseFile');
//# sourceMappingURL=index.js.map