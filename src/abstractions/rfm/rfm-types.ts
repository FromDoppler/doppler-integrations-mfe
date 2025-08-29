export type RfmStatus = {
  visible: boolean;
  active: boolean;
  period: string;
  date: string;
};

export type UpdateRfmResponse = {
  success: boolean;
  rfm: RfmStatus;
  errorMsg?: string;
};

export type RfmStatusQueryKey = [{ scope: string }];
export type UpdateRfmStatusQueryKey = [{ scope: string }];
