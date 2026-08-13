import { render, screen } from "@testing-library/react";
import { AppServices } from "../../abstractions/application";
import { AppServicesProvider } from "./AppServicesProvider";
import { AppSessionStateContext } from "./AppSessionStateContext";
import { PrivateRoute } from "./PrivateRoute";

describe(PrivateRoute.name, () => {
  afterEach(() => {
    delete (window as any).dopplerSessionState;
    delete (window as any).ensureCollaboratorHasAccessOrRedirect;
  });

  it("should validate collaborator access for the requested section", () => {
    const expectedText = "Authorized collaborator";
    const appServices = {
      appConfiguration: { loginPageUrl: "/login" },
      window: { location: { href: "currentUrl" } },
    } as AppServices;
    const ensureAccess = jest.fn().mockReturnValue(true);

    (window as any).dopplerSessionState = {
      status: "authenticated",
      rawDopplerUserData: {
        userAccount: {
          userProfileType: "COLLABORATOR",
        },
      },
    };
    (window as any).ensureCollaboratorHasAccessOrRedirect = ensureAccess;

    render(
      <AppServicesProvider appServices={appServices}>
        <AppSessionStateContext.Provider
          value={{
            status: "authenticated",
            dopplerAccountName: "me@me.com",
            lang: "en",
          }}
        >
          <PrivateRoute section={11}>
            <p>{expectedText}</p>
          </PrivateRoute>
        </AppSessionStateContext.Provider>
      </AppServicesProvider>,
    );

    expect(ensureAccess).toHaveBeenCalledWith(11);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it("should stop rendering when a collaborator has no access to the section", () => {
    const privateText = "Hidden collaborator content";
    const appServices = {
      appConfiguration: { loginPageUrl: "/login" },
      window: { location: { href: "currentUrl" } },
    } as AppServices;
    const ensureAccess = jest.fn().mockReturnValue(false);

    (window as any).dopplerSessionState = {
      status: "authenticated",
      rawDopplerUserData: {
        userAccount: {
          userProfileType: "COLLABORATOR",
        },
      },
    };
    (window as any).ensureCollaboratorHasAccessOrRedirect = ensureAccess;

    render(
      <AppServicesProvider appServices={appServices}>
        <AppSessionStateContext.Provider
          value={{
            status: "authenticated",
            dopplerAccountName: "me@me.com",
            lang: "en",
          }}
        >
          <PrivateRoute section={1}>
            <p>{privateText}</p>
          </PrivateRoute>
        </AppSessionStateContext.Provider>
      </AppServicesProvider>,
    );

    expect(ensureAccess).toHaveBeenCalledWith(1);
    expect(screen.queryByText(privateText)).not.toBeInTheDocument();
  });
});
