import { ReactNode } from "react";
import { LoadingScreen } from "../shared/Loading/LoadingScreen";
import {
  ensureCollaboratorHasAccessOrRedirect,
  isCollaborator,
} from "../../utils/collaboratorPermissions";
import { NavigateToExternalUrl } from "./NavigateToExternalUrl";
import { useAppServices } from "./useAppServices";
import { useAppSessionUserData } from "./useAppSessionUserData";

export const PrivateRoute = ({
  children,
  section,
}: {
  children?: ReactNode;
  section?: number | string | null;
}) => {
  const {
    appConfiguration: { loginPageUrl },
    window: { location },
  } = useAppServices();
  const sessionUserData = useAppSessionUserData();
  const isCollaboratorUser = isCollaborator();

  if (sessionUserData.status === "unknown") {
    return <LoadingScreen />;
  }

  if (sessionUserData.status !== "authenticated") {
    // Important: redirect value should not be encoded
    return (
      <NavigateToExternalUrl to={`${loginPageUrl}?redirect=${location.href}`} />
    );
  }

  if (isCollaboratorUser && section != null) {
    const canAccessSection = ensureCollaboratorHasAccessOrRedirect(section);

    if (!canAccessSection) {
      // Stop rendering after the redirect side effect to avoid flashing route content.
      return null;
    }
  }

  return <>{children}</>;
};
