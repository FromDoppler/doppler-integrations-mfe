import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { MemoryRouter } from "react-router-dom";
import { AppServicesProvider } from "./application";
import { AppServices } from "../abstractions/application";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Field } from "../abstractions/doppler-rest-api-client";
import { TestDopplerIntlProvider } from "./i18n/TestDopplerIntlProvider";

const rootURL = "/";
const wrongURL = "/wrong/url";
const sessionURL = "/session-demo";
const sessionContent = "SessionStateStatus from sessionUserData";
const notFoundContent = "There's nothing here!";

const baseAppServices = {
  appSessionStateAccessor: {
    getSessionUserData: () => ({}),
    getSessionAuthData: () => ({}),
  },
  appConfiguration: {},
  dopplerRestApiClient: {
    getFields: () => Promise.resolve({ success: true, value: [] as Field[] }),
  },
} as AppServices;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});

test("root URL should not render session content", async () => {
  // Arrange & Act
  const initialURL = rootURL;
  render(
    <QueryClientProvider client={queryClient}>
      <AppServicesProvider appServices={baseAppServices}>
        <TestDopplerIntlProvider>
          <MemoryRouter initialEntries={[initialURL]}>
            <App />
          </MemoryRouter>
        </TestDopplerIntlProvider>
      </AppServicesProvider>
    </QueryClientProvider>,
  );

  // Assert
  const sessionContentElements = screen.queryByText(sessionContent);
  expect(sessionContentElements).toBeNull();
  const notFoundContentElements = screen.queryByText(notFoundContent);
  expect(notFoundContentElements).toBeNull();
});

test("Wrong URL should render expected content", async () => {
  // Arrange & Act
  const initialURL = wrongURL;
  const expectedContent = notFoundContent;
  render(
    <QueryClientProvider client={queryClient}>
      <AppServicesProvider appServices={baseAppServices}>
        <TestDopplerIntlProvider>
          <MemoryRouter initialEntries={[initialURL]}>
            <App />
          </MemoryRouter>
        </TestDopplerIntlProvider>
      </AppServicesProvider>
    </QueryClientProvider>,
  );

  // Assert
  screen.getByText(expectedContent);
});

test("session URL should render expected content", async () => {
  // Arrange & Act
  const initialURL = sessionURL;
  render(
    <QueryClientProvider client={queryClient}>
      <AppServicesProvider appServices={baseAppServices}>
        <TestDopplerIntlProvider>
          <MemoryRouter initialEntries={[initialURL]}>
            <App />
          </MemoryRouter>
        </TestDopplerIntlProvider>
      </AppServicesProvider>
    </QueryClientProvider>,
  );

  // Assert
  screen.queryByText(sessionContent);
});
