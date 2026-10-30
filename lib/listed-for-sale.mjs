const NEGATIVE = /\bnot\b[\s\w]{0,40}\bfor sale\b/i
const POSITIVE =
  /\b(listed for sale|for sale at|still for sale)\b|\b(listing|company|site|asset) is (still )?for sale\b|\bfor sale:/i

export function sentenceSaysListedForSale(sentence) {
  const text = sentence.trim()
  if (!text) return false
  if (NEGATIVE.test(text)) return false
  return POSITIVE.test(text)
}

export function isListedForSale(parts) {
  return parts.some((part) =>
    String(part)
      .split(/\n+|(?<=[.!?])\s+/)
      .some(sentenceSaysListedForSale),
  )
}
