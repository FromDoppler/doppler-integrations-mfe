const year = new Date().getFullYear();
const urlSite = `https://www.fromdoppler.com`;
const urlPrivacy = `${urlSite}/en/legal/privacy`;

export const messages_en = {
  AssistedShopping: {
    abandonedCart: "Abandoned cart",
    automation: "Automation",
    campaignBehavior: "Campaign activity",
    clasica: "Classic",
    kpi: {
      avg_profit: "Average profit",
      convertion_rate: "Convertion rate",
      iconClass: {
        avg_profit: "shopping-bag",
        convertion_rate: "capital",
        investment_return: "sales-growth",
        total_profit: "dollar-money",
        total_sales: "shopping-complete",
      },
      investment_return: "Investment return",
      total_profit: "Total profit",
      total_sales: "Total sales",
    },
    pendingPayment: "Pending payment",
    productRetarget: "Product retargeting",
    siteBehavior: "Website activity",
    social: "Social",
    testab: "Test A/B",
  },
  campaign: `Campaign`,
  campaign_title: `Campaign {idCampaign}`,
  campaigns: `Campaigns`,
  continue: `Continue`,
  control_panel: `Control Panel`,
  exit_edit_later: `Exit and edit later`,
  exit_editor: `Exit Editor`,
  footer: {
    copyright: `© ${year} Doppler LLC. All rights reserved.`,
    iso: "ISO Quality Certification 9001:2008",
    legal_link: `${urlPrivacy}`,
    legal_text: "Privacy Policy & Legals.",
  },
  home: `Home`,
  lists: `Lists`,
  save: `Save`,
};
