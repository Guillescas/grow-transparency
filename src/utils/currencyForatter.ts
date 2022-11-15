const formatCurrencyToBRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

export const currencyFormatter = (currency: number): string => {
  return formatCurrencyToBRL.format(currency / 100)
}
