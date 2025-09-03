const year = new Date().getFullYear();
const urlSite = `https://www.fromdoppler.com`;
const urlPrivacy = `${urlSite}/en/legal/privacy`;

export const messages_en = {
  AssistedShopping: {
    area_chart: {
      deliveries: "Deliveries",
      sales: "Sales",
      title: "DELIVERIES VS ASSISTED SALES",
    },
    automation_donut_chart_title: "BILLING BY AUTOMATION TYPE",
    bar_chart_revenue: "Billing",
    bar_chart_title: "BILLING FOR TYPE OF AUTOMATION",
    campaign_donut_chart_title: "BILLING BY CAMPAIGN",
    campaign_types: {
      ABANDONEDCART: "Abandoned cart",
      CAMPAIGNBEHAVIOR: "Campaign activity",
      CLASSIC: "Classic",
      LIST: "Welcome Email",
      ORDERCONFIRMATION: "Successful Payment",
      PENDINGORDER: "Pending payment",
      PUSHNOTIFICATION: "Push Notifications",
      RSS: "RSS to Email",
      SCHEDULEDTASK: "Scheduled Date",
      SITEBEHAVIOR: "Website activity",
      SMS: "SMS",
      SOCIAL: "Social",
      TEST_AB: "Test A/B",
      VISITEDPRODUCTS: "Product retargeting",
      automation: "Automation",
      others: "Others",
    },
    description: `In this section you can check your assisted sales.
    Revenue is posted when a subscriber makes a purchase within seven days
    following opening the mail.`,
    dropdowns: {
      ecommerce_title: "Store:",
      period_option1: "Last 30 days",
      period_option2: "Last month",
      period_option3: "Last 3 months",
      period_option4: "Last 6 months",
      period_title: "Period",
    },
    kpi: {
      avg_profit: "Average ticket",
      convertion_rate: "Convertion rate",
      iconClass: {
        avg_profit: "shopping-bag",
        convertion_rate: "capital",
        investment_return: "sales-growth",
        total_profit: "dollar-money",
        total_sales: "shopping-complete",
      },
      investment_return: "Investment return",
      total_profit: "Total billing",
      total_sales: "Assisted Sales",
    },
    no_data: "No data",
    no_data_text: "There is no data to show yet",
    promotional: {
      acUrl: "Integration/Integration/MagentoSection",
      description: `Access detailed information on the progress of your business with this
      integration. Get complete visualization, monitoring and measurement of the
      billing of your Campaigns and Automations.`,
      msUrl: "Integration/Integration/MercadoShopsSection",
      shpUrl: "/integrations/shopify",
      storesTitle: "Choose the store you want to link:",
      title: "Connect Doppler with your store",
      tnUrl: "Integration/Integration/TiendaNubeSection",
      vtexUrl: "Integration/Integration/VtexSection",
      wcUrl: "Integration/Integration/WooCommerceSection",
    },
    table: {
      header1: "Campaign",
      header2: "Amount of camp.",
      header3: "Total sales",
      header4: "Total income",
      header5: "% convertion",
      sub_header1: "Name of Campaign",
      sub_header2: "Type",
      sub_header3: "Sales",
      sub_header4: "Incomes",
      sub_header5: "Convertion",
      title: "BILLING FOR CAMPAIGN",
    },
    title: "Assisted Sales metrics Report",
  },
  footer: {
    copyright: `© ${year} Doppler LLC. All rights reserved.`,
    iso: "ISO Quality Certification 9001:2008",
    legal_link: `${urlPrivacy}`,
    legal_text: "Privacy Policy & Legals.",
  },
};
