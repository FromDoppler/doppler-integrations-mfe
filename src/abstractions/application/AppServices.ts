import { AxiosStatic } from "axios";
import {
  AppConfiguration,
  AppSessionStateAccessor,
  AppSessionStateMonitor,
} from ".";
import { AppConfigurationRenderer } from "../app-configuration-renderer";
import { IntegrationsApiClient } from "../integrations-api-client";

export type AppServices = {
  window: Window;
  axiosStatic: AxiosStatic;
  appConfiguration: AppConfiguration;
  appConfigurationRenderer: AppConfigurationRenderer;
  appSessionStateAccessor: AppSessionStateAccessor;
  appSessionStateMonitor: AppSessionStateMonitor;
  integrationsApiClient: IntegrationsApiClient;
};
