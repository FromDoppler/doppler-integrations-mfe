import { AxiosStatic } from "axios";
import {
  AppConfiguration,
  AppSessionStateAccessor,
  AppSessionStateMonitor,
} from ".";
import { AppConfigurationRenderer } from "../app-configuration-renderer";
import { IntegrationsApiClient } from "../integrations-api-client";
import { DopplerLegacyClient } from "../doppler-legacy-client";

export type AppServices = {
  window: Window;
  axiosStatic: AxiosStatic;
  appConfiguration: AppConfiguration;
  appConfigurationRenderer: AppConfigurationRenderer;
  appSessionStateAccessor: AppSessionStateAccessor;
  appSessionStateMonitor: AppSessionStateMonitor;
  integrationsApiClient: IntegrationsApiClient;
  dopplerLegacyClient: DopplerLegacyClient;
};
