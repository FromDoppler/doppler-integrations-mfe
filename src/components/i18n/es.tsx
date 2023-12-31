const year = new Date().getFullYear();
const urlSite = `https://www.fromdoppler.com`;
const urlPrivacy = `${urlSite}/legal/privacidad`;

export const messages_es = {
  AssistedShopping: {
    area_chart_title: "Envios VS Ventas Asistidas",
    automation_donut_chart_title: "Ventas por tipo de automation",
    bar_chart_title: "Ingresos por tipo de automation",
    campaign_donut_chart_title: "Ingresos por Campaña",
    common: {
      abandonedCart: "Carrito abandonado",
      automation: "Automation",
      campaignBehavior: "Comp. en campaña",
      clasica: "Clasica",
      pendingPayment: "pago pendiente",
      productRetarget: "Producto visitado",
      siteBehavior: "Comp en sitio",
      social: "Social",
      testab: "Test A/B",
    },
    description: `En esta sección podrás consultar tus ventas asistidas. Los ingresos se contabilizan
    cuando un suscriptor realiza una compra dentro de los siete días siguientes a la apertura del correo.`,
    dropdowns: {
      ecommerce_title: "Tienda",
      period_option1: "Últimos 7 días",
      period_option2: "Últimos 30 días",
      period_option3: "Mes pasado",
      period_option4: "Últimos 3 meses",
      period_title: "Período",
    },
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
    table: {
      header1: "Campaña",
      header2: "Cant. de campañas",
      header3: "Total ventas",
      header4: "Total ingresos",
      header5: "% conversión",
      sub_header1: "Nombre de campaña",
      sub_header2: "Tipo",
      sub_header3: "Ventas",
      sub_header4: "Ingresos",
      sub_header5: "Conversión",
      title: "Ingresos por campañas",
    },
    title: "Reporte de métricas Ventas Asistidas",
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
