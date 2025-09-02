export interface IUserProps {
  _id: string;
  name: { firstName: string; lastName: string };
  mobile: string;
  email: string;
  password: string;
  acType: UserAccountType;
  verified: boolean;
  block: boolean;
  online: boolean;
  referralCode: string;
  myInitialCategories: any[];
  dob: string;
}

export type UserAccountType = "USER" | "ADMIN";
