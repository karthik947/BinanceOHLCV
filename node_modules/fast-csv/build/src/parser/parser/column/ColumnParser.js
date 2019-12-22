"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NonQuotedColumnParser_1 = __importDefault(require("./NonQuotedColumnParser"));
const QuotedColumnParser_1 = __importDefault(require("./QuotedColumnParser"));
const Token_1 = require("../Token");
class ColumnParser {
    constructor(parserOptions) {
        this.parserOptions = parserOptions;
        this.quotedColumnParser = new QuotedColumnParser_1.default(parserOptions);
        this.nonQuotedColumnParser = new NonQuotedColumnParser_1.default(parserOptions);
    }
    parse(scanner) {
        const { nextNonSpaceToken } = scanner;
        if (nextNonSpaceToken !== null && Token_1.Token.isTokenQuote(nextNonSpaceToken, this.parserOptions)) {
            scanner.advanceToToken(nextNonSpaceToken);
            return this.quotedColumnParser.parse(scanner);
        }
        return this.nonQuotedColumnParser.parse(scanner);
    }
}
exports.default = ColumnParser;
//# sourceMappingURL=ColumnParser.js.map