/**
 * Formate un montant dans la devise de l'utilisateur (défaut EUR).
 * Utilise Intl si disponible (Hermes/Expo 54), avec repli manuel sinon.
 */
export function formatCurrency(amount: number, currency = 'EUR'): string {
  try {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}
