export const address_shortener = (address) => {
  if (!address) return ''

  return address.slice(0, 6) + '...' + address.slice(-4)
}
