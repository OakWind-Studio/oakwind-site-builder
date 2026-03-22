export function formatPhone(phone) {
  if (!phone) return '';
  const digits = String(phone).replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `(${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

export function telHref(phone) {
  if (!phone) return '#';
  const digits = String(phone).replace(/\D/g, '');
  if (digits.length < 10) return '#';
  return digits.length === 10 ? `tel:+1${digits}` : `tel:+${digits}`;
}
