const year = new Date().getFullYear();
const urlSite = `https://www.fromdoppler.com`;
const urlPrivacy = `${urlSite}/legal/privacidad`;

export const messages_es = {
  AssistedShopping: {
    abandonedCart: "Carrito abandonado",
    automation: "Automation",
    campaignBehavior: "Comp. en campaña",
    clasica: "Clasica",
    kpi: {
      avg_profit: "Ganancia promedio",
      convertion_rate: "Tasa de converión",
      iconClass: {
        avg_profit: "shopping-bag",
        convertion_rate: "capital",
        investment_return: "sales-growth",
        total_profit: "dollar-money",
        total_sales: "shopping-complete",
      },
      investment_return: "Retorno de inversión",
      total_profit: "Total de ganancia",
      total_sales: "Ventas asistidas",
    },
    pendingPayment: "pago pendiente",
    productRetarget: "Producto visitado",
    siteBehavior: "Comp en sitio",
    social: "Social",
    testab: "Test A/B",
  },
  campaign: `Campaña`,
  campaign_title: `Campaña {idCampaign}`,
  campaigns: `Campañas`,
  continue: `Continuar`,
  control_panel: `Panel de Control`,
  exit_edit_later: `Salir y editar luego`,
  exit_editor: `Salir del Editor`,
  footer: {
    copyright: `© ${year} Doppler LLC. Todos los derechos reservados.`,
    iso: "Certificación de Calidad ISO 9001:2008",
    legal_link: `${urlPrivacy}`,
    legal_text: "Política de Privacidad y Legales.",
  },
  home: `Inicio`,
  lists: `Listas`,
  save: `Guardar`,
};
