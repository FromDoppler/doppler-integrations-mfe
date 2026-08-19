const COLLABORATOR_PROFILE_TYPE = "COLLABORATOR";

export const isCollaborator = () =>
  window.dopplerSessionState?.status === "authenticated" &&
  window.dopplerSessionState.rawDopplerUserData?.userAccount
    ?.userProfileType === COLLABORATOR_PROFILE_TYPE;

export const ensureCollaboratorHasAccessOrRedirect = (
  section?: number | string | null,
) => window.ensureCollaboratorHasAccessOrRedirect(section);
