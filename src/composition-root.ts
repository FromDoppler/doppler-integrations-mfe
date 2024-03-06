import axios from "axios";
import { AppConfiguration, AppServices } from "./abstractions/application";
import { AppConfigurationRendererImplementation } from "./implementations/AppConfigurationRendererImplementation";
import { SessionMfeAppSessionStateClient } from "./implementations/session-mfe/SessionMfeAppSessionStateClient";
import {
  ServicesFactories,
  SingletonLazyAppServicesContainer,
} from "./implementations/SingletonLazyAppServicesContainer";
import { defaultAppConfiguration } from "./default-configuration";
import { IntegrationsApiClientImpl } from "./implementations/integrations-api/IntegrationsApiClientImpl";
import { DummyIntegrationsApiClient } from "./implementations/dummies/integrations-api-client";

export const configureApp = (
  customConfiguration: Partial<AppConfiguration>,
): AppServices => {
  const appConfiguration = {
    ...defaultAppConfiguration,
    ...customConfiguration,
  };

  const realFactories: ServicesFactories = {
    windowFactory: () => window,
    axiosStaticFactory: () => axios,
    appConfigurationFactory: () => appConfiguration,
    appConfigurationRendererFactory: (appServices: AppServices) =>
      new AppConfigurationRendererImplementation(appServices),
    appSessionStateMonitorFactory: ({ window }: AppServices) =>
      new SessionMfeAppSessionStateClient({ window }),
    appSessionStateAccessorFactory: ({ appSessionStateMonitor }: AppServices) =>
      // Casting because the same instance of SessionMfeAppSessionStateClient
      // will be use for appSessionStateMonitor and appSessionStateAccessor
      appSessionStateMonitor as SessionMfeAppSessionStateClient,
    integrationsApiClientFactory: ({
      axiosStatic,
      appSessionStateAccessor,
      appConfiguration,
    }) =>
      new IntegrationsApiClientImpl({
        axiosStatic,
        appSessionStateAccessor,
        appConfiguration,
      }),
  };

  const dummyFactories: Partial<ServicesFactories> = {
    integrationsApiClientFactory: () => new DummyIntegrationsApiClient(),
  };

  const factories = appConfiguration.useDummies
    ? { ...realFactories, ...dummyFactories }
    : realFactories;

  const appServices = new SingletonLazyAppServicesContainer(factories);

  return appServices;
};
