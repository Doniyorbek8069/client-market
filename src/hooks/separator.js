export default function separator(amount, suffix) {
  const formatted = new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: suffix,
    currencyDisplay: 'symbol',
  })
    .format(amount)
    .replace(/,/g, ' ');

  return formatted;
}
