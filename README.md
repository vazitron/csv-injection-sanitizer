# About

Helper functions for escaping harmful content in any CSV (or arbitrary DSV) that can be opened
in spreadsheet applications such as MS Excel, LibreOffice, Google spreadsheets, etc.

The vulnerabilities come from the fact, that many of the applications try to interpret CSV data
as formulas if the data contain certain characters. See https://www.owasp.org/index.php/CSV_Injection

# What it does

Ultimately, it takes a raw value for a single CSV "cell", and escapes all the dangerous content.

```
const sanitizedValue = escapeCell('=something harmful');
```

It also contains aggregated functions for easier processing of the whole file. 
These functions expect the CSV data to come as a 2D array.

```
const sanitizedRow = escapeRow(['Benign data', '=something harmful']);
const sanitizedDoc = escapeDocument([
    ['Benign data', '=something harmful'],
    ['Benign data', '+something even more harmful']
]);
```

# Params

All functions allow overriding of the escaping character (which defaults to `'`).

```
const sanitizedValue = escapeCell('=something harmful', '\t');
```