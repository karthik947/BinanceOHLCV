"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const stream_1 = require("stream");
const ParserOptions_1 = require("./ParserOptions");
const CsvParserStream_1 = __importDefault(require("./CsvParserStream"));
var CsvParserStream_2 = require("./CsvParserStream");
exports.CsvParserStream = CsvParserStream_2.default;
__export(require("./types"));
__export(require("./ParserOptions"));
__export(require("./parser"));
__export(require("./transforms"));
exports.parse = (args) => new CsvParserStream_1.default(new ParserOptions_1.ParserOptions(args));
exports.parseStream = (stream, options) => stream.pipe(new CsvParserStream_1.default(new ParserOptions_1.ParserOptions(options)));
exports.parseFile = (location, options = {}) => fs.createReadStream(location).pipe(new CsvParserStream_1.default(new ParserOptions_1.ParserOptions(options)));
exports.parseString = (string, options) => {
    const rs = new stream_1.Readable();
    rs.push(string);
    rs.push(null);
    return rs.pipe(new CsvParserStream_1.default(new ParserOptions_1.ParserOptions(options)));
};
//# sourceMappingURL=index.js.map