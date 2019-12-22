"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnFormatter_1 = __importDefault(require("./ColumnFormatter"));
const Token_1 = require("../Token");
const { isTokenDelimiter, isTokenRowDelimiter } = Token_1.Token;
class NonQuotedColumnParser {
    constructor(parserOptions) {
        this.parserOptions = parserOptions;
        this.columnFormatter = new ColumnFormatter_1.default(parserOptions);
    }
    parse(scanner) {
        if (!scanner.hasMoreCharacters) {
            return null;
        }
        const { parserOptions } = this;
        const characters = [];
        let nextToken = scanner.nextCharacterToken;
        for (; nextToken; nextToken = scanner.nextCharacterToken) {
            if (isTokenDelimiter(nextToken, parserOptions) || isTokenRowDelimiter(nextToken)) {
                break;
            }
            characters.push(nextToken.token);
            scanner.advancePastToken(nextToken);
        }
        return this.columnFormatter.format(characters.join(''));
    }
}
exports.default = NonQuotedColumnParser;
//# sourceMappingURL=NonQuotedColumnParser.js.map