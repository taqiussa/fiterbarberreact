export const numberFormat = (value) =>
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumSignificantDigits: 4
    }).format(value);
