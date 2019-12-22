"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const RowFormatter_1 = __importDefault(require("./formatter/RowFormatter"));
class CsvFormatterStream extends stream_1.Transform {
    constructor(formatterOptions) {
        super({ objectMode: formatterOptions.objectMode });
        this.hasWrittenBOM = false;
        this.formatterOptions = formatterOptions;
        this.rowFormatter = new RowFormatter_1.default(formatterOptions);
        // if writeBOM is false then set to true
        // if writeBOM is true then set to false by default so it is written out
        this.hasWrittenBOM = !formatterOptions.writeBOM;
    }
    transform(transformFunction) {
        this.rowFormatter.rowTransform = transformFunction;
        return this;
    }
    _transform(row, encoding, cb) {
        let cbCalled = false;
        try {
            if (!this.hasWrittenBOM) {
                this.push(this.formatterOptions.BOM);
                this.hasWrittenBOM = true;
            }
            this.rowFormatter.format(row, (err, rows) => {
                if (err) {
                    cbCalled = true;
                    return cb(err);
                }
                if (rows) {
                    rows.forEach((r) => {
                        this.push(Buffer.from(r, 'utf8'));
                    });
                }
                cbCalled = true;
                return cb();
            });
        }
        catch (e) {
            if (cbCalled) {
                throw e;
            }
            cb(e);
        }
    }
    _flush(cb) {
        this.rowFormatter.finish((err, rows) => {
            if (err) {
                return cb(err);
            }
            if (rows) {
                rows.forEach((r) => {
                    this.push(Buffer.from(r, 'utf8'));
                });
            }
            return cb();
        });
    }
}
exports.default = CsvFormatterStream;
//# sourceMappingURL=CsvFormatterStream.js.map