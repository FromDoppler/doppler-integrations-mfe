import { Result } from "./result-types";

export type ThirdPartyApp = {
  idThirdPartyApp: number;
  name: string;
  assistedShoppingEnabled: boolean;
};

export type ThirdPartyConnection = {
  idUser: number;
  accountName: string;
  connectionErrors: number;
  utcLastCompletedSync: Date;
  utcLastAssistedShoppingSync: Date;
  thirdPartyApp: ThirdPartyApp;
};

export type AssistedSales = {
  idOrder: number;
  idUser: number;
  idThirdPartyApp: number;
  orderTotal: number;
  currency: string;
  orderDate: Date;
  openDate: Date;
  campaign: {
    idCampaign: number;
    name: string;
    campaignType: string;
    automationEventType: string | undefined;
    amountSentSubscribers: number;
    DistinctOpenedMailCount: number;
    utcSentDate: Date;
  };
  subscriber: { idSubscriber: number; email: string };
};

export interface IntegrationsApiClient {
  getConnections: () => Promise<Result<ThirdPartyConnection[]>>;
  getAssistedSales: (
    idThirdPartyApp: string,
    dateFrom: Date,
    dateTo: Date,
  ) => Promise<Result<AssistedSales[]>>;
}
