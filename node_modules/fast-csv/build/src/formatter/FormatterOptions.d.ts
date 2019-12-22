import { RowTransformFunction } from './types';
interface QuoteColumnMap {
    [s: string]: boolean;
}
declare type QuoteColumns = boolean | boolean[] | QuoteColumnMap;
export interface FormatterOptionsArgs {
    objectMode?: boolean;
    delimiter?: string;
    rowDelimiter?: string;
    quote?: string | boolean;
    escape?: string;
    quoteColumns?: QuoteColumns;
    quoteHeaders?: QuoteColumns;
    headers?: null | boolean | string[];
    includeEndRowDelimiter?: boolean;
    writeBOM?: boolean;
    transform?: RowTransformFunction;
    alwaysWriteHeaders?: boolean;
}
export declare class FormatterOptions {
    readonly objectMode: boolean;
    readonly delimiter: string;
    readonly rowDelimiter: string;
    readonly quote: string;
    readonly escape: string;
    readonly quoteColumns: QuoteColumns;
    readonly quoteHeaders: QuoteColumns;
    readonly headers: null | string[];
    readonly includeEndRowDelimiter: boolean;
    readonly transform: RowTransformFunction | null;
    readonly shouldWriteHeaders: boolean;
    readonly writeBOM: boolean;
    readonly escapedQuote: string;
    readonly BOM: string;
    readonly alwaysWriteHeaders: boolean;
    constructor(opts?: FormatterOptionsArgs);
}
export {};
