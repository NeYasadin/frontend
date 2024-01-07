export interface Company {
  id: number;
  name: string;
  createdAt: string;
  phoneNum: string;
  mail: string;
  description: string;
  country?: string;
  address?: string;
  employeeNum?: number;
  sector: string;
}
