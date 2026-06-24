import type { Member, CreateMemberData, UpdateMemberData } from "../types/member.types";

/**
 * Members service — provider-agnostic data layer.
 * Currently backed by an in-memory mock array.
 * Replace each function body with real API calls when the backend is ready.
 */

let _members: Member[] = [
  {
    id: "1",
    fullName: "Alice Mwangi",
    email: "alice@dotinspiration.org",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15T08:00:00.000Z",
  },
  {
    id: "2",
    fullName: "Brian Otieno",
    email: "brian@dotinspiration.org",
    role: "member",
    status: "active",
    createdAt: "2024-03-20T10:30:00.000Z",
  },
  {
    id: "3",
    fullName: "Carol Njoki",
    email: "carol@dotinspiration.org",
    role: "volunteer",
    status: "inactive",
    createdAt: "2024-06-01T09:00:00.000Z",
  },
];

let _nextId = 4;

export async function getMembers(): Promise<Member[]> {
  return [..._members];
}

export async function getMemberById(id: string): Promise<Member | null> {
  return _members.find((m) => m.id === id) ?? null;
}

export async function createMember(data: CreateMemberData): Promise<Member> {
  const member: Member = {
    ...data,
    id: String(_nextId++),
    createdAt: new Date().toISOString(),
  };
  _members = [..._members, member];
  return member;
}

export async function updateMember(
  id: string,
  data: UpdateMemberData
): Promise<Member | null> {
  const index = _members.findIndex((m) => m.id === id);
  if (index === -1) return null;

  const updated: Member = { ..._members[index], ...data };
  _members = [
    ..._members.slice(0, index),
    updated,
    ..._members.slice(index + 1),
  ];
  return updated;
}
