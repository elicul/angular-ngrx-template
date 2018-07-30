export interface User {
  Id?: number;
  Email: string;
  FirstName?: string;
  LastName?: string;
  Password: string;
  CompanyId: string;
  SecurityClientSettingId: number;
  ClientConfigurationId: number;
  ReturnUrl?: string;
  QueryParams?: string;
  ClientId: string;
  ClientSecret: string;
  ClientScope: string;
  Token?: string;
}
