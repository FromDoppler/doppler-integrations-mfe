export type RfmStatus = {
  visible: boolean;
  active: boolean;
  period: string;
  date: string;
};

export type RfmStatusQueryKey = [{ scope: string }];
export type UpdateRfmStatusQueryKey = [{ scope: string }];

export type UpdateRfmSettings = {
  rfm: RfmStatus;
};
