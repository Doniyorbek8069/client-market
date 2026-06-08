export default function priceText(value, currency = 'UZS') {
  if (value == null) return '';
  const n = Number(value) || 0;
  return `${n.toLocaleString('ru-RU').replaceAll(',', ' ')} ${currency}`;
}
