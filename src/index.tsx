import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./components/App";
import { reportWebVitals } from "./reportWebVitals";
import { configureApp } from "./composition-root";
import {
  AppServicesProvider,
  AppSessionStateProvider,
} from "./components/application";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DopplerIntlProvider } from "./components/i18n/DopplerIntlProvider";
import ReactGA from "react-ga";
import {
  Location as HistoryLocation,
  createBrowserHistory,
  Update,
} from "history";

const customConfiguration =
  (window as any)["doppler-integrations-mfe-configuration"] || {};

const appServices = configureApp(customConfiguration);

const appSessionStateMonitor = appServices.appSessionStateMonitor;
appSessionStateMonitor.start();

const queryClient = new QueryClient();

const container = document.getElementById(
  appServices.appConfiguration.appElementId,
);

ReactGA.initialize("UA-532159-1");

const history = createBrowserHistory();

const trackNavigation = (location: HistoryLocation | globalThis.Location) => {
  const locationPage =
    location.hash && location.hash[0] === "#"
      ? location.hash.slice(1)
      : location.pathname;
  ReactGA.set({ page: locationPage });
  ReactGA.pageview(locationPage);
};

trackNavigation(window.location);

history.listen(({ location }: Update) => {
  // Extract 'location' from the 'Update' object.
  trackNavigation(location);
});

const root = createRoot(container!);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={appServices.appConfiguration.basename}>
        <AppServicesProvider appServices={appServices}>
          <AppSessionStateProvider>
            <DopplerIntlProvider>
              <App />
            </DopplerIntlProvider>
          </AppSessionStateProvider>
        </AppServicesProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
