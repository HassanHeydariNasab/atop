export interface User {
  id: number;
  countryCode: string;
  mobile: string;
  name: string;
  coins: number;
  token?: string;
  verificationCode?: string;
}
