const year = new Date().getFullYear();
const urlSite = `https://www.fromdoppler.com`;
const urlPrivacy = `${urlSite}/legal/privacidad`;
const urlIntegrations = `/integrations`;

export const messages_es = {
  AssistedShopping: {
    area_chart: {
      deliveries: "Envios",
      sales: "Ventas",
      title: "Envios VS Ventas Asistidas",
    },
    automation_donut_chart_title: "Ventas por tipo de automation",
    bar_chart_title: "Ingresos por tipo de automation",
    campaign_donut_chart_title: "Ingresos por Campaña",
    campaign_types: {
      ABANDONEDCART: "Carrito abandonado",
      CAMPAIGNBEHAVIOR: "Comp. en campaña",
      CLASSIC: "Clasica",
      LIST: "Suscripción a Listas",
      ORDERCONFIRMATION: "pago Confirmado",
      PENDINGORDER: "Pago pendiente",
      PUSHNOTIFICATION: "Notificaciones Push",
      RSS: "Envío de RSS",
      SCHEDULEDTASK: "Fechas Programadas",
      SITEBEHAVIOR: "Comp en sitio",
      SMS: "SMS",
      SOCIAL: "Social",
      TEST_AB: "Test A/B",
      VISITEDPRODUCTS: "Producto visitado",
      automation: "Automation",
      others: "Otros",
    },
    description: `En esta sección podrás consultar tus ventas asistidas. Los ingresos se contabilizan
    cuando un suscriptor realiza una compra dentro de los siete días siguientes a la apertura del correo.`,
    dropdowns: {
      ecommerce_title: "Tienda",
      period_option1: "Últimos 30 días",
      period_option2: "Mes pasado",
      period_option3: "Últimos 3 meses",
      period_option4: "Últimos 6 meses",
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
    no_data: "No hay datos",
    no_data_text: "Aun no hay datos para mostrar",
    promotional: {
      action_text: "Vincula tu Tienda",
      action_url: `${urlIntegrations}`,
      description: `Duis pretium dui quis ipsum mattis, sed elementum libero interdum. Donec vitae consectetur justo,
      quis pretium nulla. Vestibulum volutpat purus a dictum sagittis. Nullam sed libero nibh. Maecenas sit amet purus
      hendrerit, fermentum orci interdum, blandit odio. Aliquam vehicula ornare semper.`,
      title:
        "Conoce los resultados de tus acciones, consectetur  adipiscing elit",
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
