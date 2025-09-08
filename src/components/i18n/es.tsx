const year = new Date().getFullYear();
const urlSite = `https://www.fromdoppler.com`;
const urlPrivacy = `${urlSite}/legal/privacidad`;

export const messages_es = {
  AssistedShopping: {
    area_chart: {
      deliveries: "Envios",
      sales: "Ventas",
      title: "ENVIOS VS VENTAS ASISTIDAS",
    },
    automation_donut_chart_title: "FACTURACIÓN POR TIPO DE AUTOMATION",
    bar_chart_revenue: "Facturación",
    bar_chart_title: "FACTURACIÓN POR TIPO DE AUTOMATION",
    campaign_donut_chart_title: "FACTURACIÓN POR CAMPAÑAS",
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
    description: `En esta sección podrás consultar tus operaciones.
    Los ingresos se contabilizan cuando un Contacto realiza una compra
    dentro de los siete días siguientes a la apertura del correo.`,
    dropdowns: {
      ecommerce_title: "Tienda:",
      period_option1: "Últimos 30 días",
      period_option2: "Mes pasado",
      period_option3: "Últimos 3 meses",
      period_option4: "Últimos 6 meses",
      period_title: "Período",
    },
    kpi: {
      avg_profit: "Ticket promedio",
      convertion_rate: "Tasa de conversión",
      iconClass: {
        avg_profit: "shopping-bag",
        convertion_rate: "capital",
        investment_return: "sales-growth",
        total_profit: "dollar-money",
        total_sales: "shopping-complete",
      },
      investment_return: "Retorno de inversión",
      total_profit: "Total de facturación",
      total_sales: "Ventas Asistidas",
    },
    no_data: "No hay datos",
    no_data_text: "Aun no hay datos para mostrar",
    promotional: {
      acUrl: "Integration/Integration/MagentoSection",
      description: `Accede a la información detallada del progreso de tu negocio con esta
      integración. Obtén una completa visualización, seguimiento y medición de
      la facturación de tus Campañas y Automations.`,
      msUrl: "Integration/Integration/MercadoShopsSection",
      shpUrl: "/integrations/shopify",
      storesTitle: "Elije la tienda que deseas vincular:",
      title: "Conecta Doppler con tu tienda",
      tnUrl: "Integration/Integration/TiendaNubeSection",
      vtexUrl: "Integration/Integration/VtexSection",
      wcUrl: "Integration/Integration/WooCommerceSection",
    },
    table: {
      header1: "CAMPAÑA",
      header2: "CANTIDAD DE CAMP.",
      header3: "TOTAL VENTAS",
      header4: "TOTAL INGRESOS",
      header5: "% conversión",
      sub_header1: "Nombre de campaña",
      sub_header2: "Tipo",
      sub_header3: "Ventas",
      sub_header4: "Ingresos",
      sub_header5: "Conversión",
      title: "FACTURACIÓN POR CAMPAÑAS",
    },
    title: "Reporte de métricas de Ventas Asistidas",
  },
  General: {
    back: "Atrás",
    save: "Guardar",
  },
  Integrations: {
    title: "Integraciones",
  },
  Rfm: {
    button: "Guardar",
    calculation_date: "Fecha de último cálculo: ",
    help_link: "https://help.fromdoppler.com/es/que-es-la-segmentacion-rfm/",
    help_link_1: '"Qué es el análisis RFM y cómo se calcula".',
    info: "En 24 horas estarán disponibles los resultados del análisis RFM.",
    list_item_first: "Recencia:",
    list_item_first_description: "días transcurridos desde la última compra.",
    list_item_second: "Frecuencia:",
    list_item_second_description: "número de compras por período de tiempo.",
    list_item_third: "Monto:",
    list_item_third_description:
      "valor de las compras totales realizadas por el cliente en el tiempo de análisis.",
    more_information: "Encuentra más información en el artículo",
    period_end: "días para calcular las variables de RFM.",
    period_start: "Utilizar datos de los últimos",
    rfm: "RFM",
    rfm_off: "Habilitar segmentación automática por RFM",
    rfm_on: "Deshabilitar segmentación automática por RFM",
    save_success: "Cambios guardados con éxito.",
    subtitle:
      "Activa el análisis RFM y obtendrás nuevos segmentos basados en los hábitos de compra de tus clientes.",
    title: "Segmenta tus contactos automáticamente con RFM",
    user_notification: `Se crearán automáticamente 10 segmentos con la etiqueta RFM.
    Se les asignará un nombre asociado al comportamiento de tus clientes.
    Por ejemplo, aquellos que compraron recientemente, lo hacen con frecuencia
    y gastan más dinero que el resto, estarán dentro del segmento clientes estrella.`,
  },
  footer: {
    copyright: `© ${year} Doppler LLC. Todos los derechos reservados.`,
    iso: "Certificación de Calidad ISO 9001:2008",
    legal_link: `${urlPrivacy}`,
    legal_text: "Política de Privacidad y Legales.",
  },
};
