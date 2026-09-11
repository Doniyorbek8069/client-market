export default function separator(amount, suffix) {
  // Was: new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: suffix }).format(amount)
  // `Intl.NumberFormat` throws synchronously when `currency` is undefined or
  // not a valid ISO 4217 code — which happened for every product whose
  // `valute` relation was null (isvalute didn't match a known id). That
  // uncaught throw during render blanked the whole product grid/page for
  // every visitor. Formatting the number and the suffix separately can't throw.
  const formatted = new Intl.NumberFormat('uz-UZ').format(Number(amount) || 0);

  return suffix ? `${formatted} ${suffix}` : formatted;
}
