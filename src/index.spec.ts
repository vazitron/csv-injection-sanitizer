import { escapeCell, escapeRow, escapeDocument, ESCAPE_CHARACTER } from './';

const testData = [
    ['Czech Republic', 'Slovak Republic', 'Poland', 'Austria'],
    ['=1+1', '+1+1', '-1+1', '@...']
];

describe('escapeCell', () => {
    
    test('escapes "="', () => {
        const testVal = testData[1][0];
        const result = escapeCell(testVal);
        expect(result).toStrictEqual(ESCAPE_CHARACTER + testVal);
    });

    test('escapes "+"', () => {
        const testVal = testData[1][1];
        const result = escapeCell(testVal);
        expect(result).toStrictEqual(ESCAPE_CHARACTER + testVal);
    });

    test('escapes "-"', () => {
        const testVal = testData[1][2];
        const result = escapeCell(testVal);
        expect(result).toStrictEqual(ESCAPE_CHARACTER + testVal);
    });

    test('escapes "@"', () => {
        const testVal = testData[1][3];
        const result = escapeCell(testVal);
        expect(result).toStrictEqual(ESCAPE_CHARACTER + testVal);
    });

    test('accepts custom escape char', () => {
        const customEscapeChar = '\t'; // TAB
        const testVal = testData[1][0];
        const result = escapeCell(testVal, customEscapeChar);
        expect(result).toStrictEqual(customEscapeChar + testVal);
    });

    test('doesn\'t escape allowed chars', () => {
        const testVal = testData[0][0];
        const result = escapeCell(testVal);
        expect(result).toStrictEqual(testVal);
    });

    test('empty cell', () => {
        const expectedFallback = ''
        expect(escapeCell('')).toStrictEqual(expectedFallback);
        expect(escapeCell(null)).toStrictEqual(expectedFallback);
        expect(escapeCell(undefined)).toStrictEqual(expectedFallback);
    });
});

describe('escapeRow', () => {

    const escapedRow = [
        escapeCell(testData[1][0]),
        escapeCell(testData[1][1]),
        escapeCell(testData[1][2]),
        escapeCell(testData[1][3])
    ];

    test('should escape all cells', () => {
        const result = escapeRow(testData[1]);
        expect(result).toEqual(escapedRow);
    });

    test('should pass the custom escape char', () => {
        const customEscapeChar = '\t'; // TAB

        let escapedRowCustom = [
            escapeCell(testData[1][0], customEscapeChar),
            escapeCell(testData[1][1], customEscapeChar),
            escapeCell(testData[1][2], customEscapeChar),
            escapeCell(testData[1][3], customEscapeChar)
        ];

        const testVal = testData[1];
        const result = escapeRow(testVal, customEscapeChar);
        expect(result).toEqual(escapedRowCustom);
    });
});

describe('escapeDocument', () => {
    const escapedDoc = [
        escapeRow(testData[0]),
        escapeRow(testData[1]),
    ];

    test('should escape all rows', () => {
        const result = escapeDocument(testData);
        expect(result).toEqual(escapedDoc);
    });

    test('should pass the custom escape char', () => {
        const customEscapeChar = '\t'; // TAB

        const customEscapedDoc = [
            escapeRow(testData[0], customEscapeChar),
            escapeRow(testData[1], customEscapeChar),
        ];

        const result = escapeDocument(testData, customEscapeChar);
        expect(result).toEqual(customEscapedDoc);
    });
});