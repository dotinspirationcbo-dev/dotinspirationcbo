export type DonationStatus = "pending" | "completed" | "failed" | "refunded";

export type DonationMethod = "bank_transfer" | "mobile_money" | "cash" | "cheque";

export interface Donation {
  id: string;
  donorName: string;
  email: string;
  amount: number;
  currency: string;
  method: DonationMethod;
  status: DonationStatus;
  reference?: string;
  notes?: string;
  createdAt: string;
}

export type CreateDonationData = Omit<Donation, "id" | "createdAt">;

export type UpdateDonationData = {
  id: string;
  donorName?: string;
  email?: string;
  amount?: number;
  currency?: string;
  method?: DonationMethod;
  status?: DonationStatus;
  reference?: string;
  notes?: string;
};
