import { Row, RowTransformFunction, RowValidatorCallback, RowValidate } from '../types';
export default class RowTransformerValidator {
    private static createTransform;
    private static createValidator;
    private _rowTransform;
    private _rowValidator;
    set rowTransform(transformFunction: RowTransformFunction);
    set rowValidator(validateFunction: RowValidate);
    transformAndValidate(row: Row, cb: RowValidatorCallback): void;
    private callTransformer;
    private callValidator;
}
