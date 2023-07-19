export const address_shortener = (address) => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}
