export interface Complaint {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  solutionRating: number;
  complaintRating: number;
  companyId: number;
  company: Company;
  meToo: number;
  misleading: number;
  customerId: number;
  customer: Customer;
  priorityLevel: number;
  isFinished: boolean;
  solutions: Solution[];
  comments: Comment[];
}

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
  complaints: Complaint[];
}

export interface Customer {
  id: number;
  name: string;
  mail: string;
  password: string;
  phoneNum: string;
  createdAt: string;
  comments: Comment[];
}

export interface Solution {
  id: number;
  guaranteeLevel: number;
  sourceOfComplaint: string;
  createdAt: string;
  companyAgentId: number;
  companyAgent: CompanyAgent;
  complaintId: number;
  complaint: Complaint;
  content: string;
}

export interface CompanyAgent {
  id: number;
  name: string;
  mail: string;
  password: string;
  createdAt: string;
  companyId: number;
  company: Company;
  solutions: Solution[];
}

export interface Comment {
  id: number;
  createdAt: string;
  content: string;
  complaintId: number;
  complaint: Complaint;
  customerId: Customer;
  customer: Customer;
}

export interface Subscription {
  id: number;
  createdAt: string;
  companyId: number;
  company: Company;
  startDate: string;
  endDate: string;
  period: string;
  isPaid: boolean;
  paymentType: string;
  price: number;
}
