import type { Donation, CreateDonationData, UpdateDonationData } from "../types/donation.types";

/**
 * Donations service — provider-agnostic data layer.
 * Currently backed by an in-memory mock array.
 * Replace each function body with real API calls when the backend is ready.
 */

let _donations: Donation[] = [
  {
    id: "1",
    donorName: "James Okello",
    email: "james.okello@example.com",
    amount: 500000,
    currency: "UGX",
    method: "bank_transfer",
    status: "completed",
    reference: "TXN-2024-001",
    createdAt: "2024-02-10T09:00:00.000Z",
  },
  {
    id: "2",
    donorName: "Sarah Nakato",
    email: "sarah.nakato@example.com",
    amount: 200000,
    currency: "UGX",
    method: "mobile_money",
    status: "completed",
    reference: "MM-2024-045",
    createdAt: "2024-04-18T14:30:00.000Z",
  },
  {
    id: "3",
    donorName: "Anonymous",
    email: "info@dotinspirationcbo.org",
    amount: 100000,
    currency: "UGX",
    method: "cash",
    status: "pending",
    createdAt: "2024-06-05T11:00:00.000Z",
  },
];

let _nextId = 4;

export async function getDonations(): Promise<Donation[]> {
  return [..._donations];
}

export async function getDonationById(id: string): Promise<Donation | null> {
  return _donations.find((d) => d.id === id) ?? null;
}

export async function createDonation(data: CreateDonationData): Promise<Donation> {
  const donation: Donation = {
    ...data,
    id: String(_nextId++),
    createdAt: new Date().toISOString(),
  };
  _donations = [..._donations, donation];
  return donation;
}

export async function updateDonation(data: UpdateDonationData): Promise<Donation> {
  const { id, ...patch } = data;
  const index = _donations.findIndex((d) => d.id === id);
  if (index === -1) throw new Error(`Donation not found: ${id}`);

  const updated: Donation = { ..._donations[index], ...patch };
  _donations = [
    ..._donations.slice(0, index),
    updated,
    ..._donations.slice(index + 1),
  ];
  return updated;
}
