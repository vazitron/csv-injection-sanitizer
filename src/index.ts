
export const DANGEROUS_CHARS = ['=', '+', '-', '@'];
export const ESCAPE_CHARACTER = '\'';

/** 
 * Expects unquoted raw value of a CSV cell, 
 * e.g. Czech Republic, not "Czech Republic" 
 * */
export function escapeCell(csvCell: string|null|undefined, escapeChar: string = ESCAPE_CHARACTER) {

    if (!csvCell || csvCell.length === 0) {
        return '';
    }

    const firstChar = csvCell.substring(0, 1);
    if (DANGEROUS_CHARS.includes(firstChar)) {
        return escapeChar + csvCell;
    }

    return csvCell;
}

export function escapeRow(csvRow: string[], escapeChar?: string) {
    return csvRow.map(x => escapeCell(x, escapeChar));
}

export function escapeDocument(csvDoc: string[][], escapeChar?: string) {
    return csvDoc.map(x => escapeRow(x, escapeChar));
}

// TODO:
// https://hackerone.com/reports/223999