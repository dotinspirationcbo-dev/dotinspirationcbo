import { useState } from "react";
import { useCreateMember } from "./useCreateMember";
import type { MemberRole, MemberStatus } from "../../types/member.types";

interface FormState {
  fullName: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
}

const INITIAL_STATE: FormState = {
  fullName: "",
  email: "",
  role: "member",
  status: "active",
};

/**
 * CreateMemberForm — admin form for adding a new NGO member.
 * Submits via useCreateMember mutation; list refreshes automatically on success.
 */
export function CreateMemberForm() {
  const { mutate, isPending } = useCreateMember();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim()) return;
    mutate(
      { fullName: form.fullName.trim(), email: form.email.trim(), role: form.role, status: form.status },
      { onSuccess: () => setForm(INITIAL_STATE) }
    );
  }

  function field(key: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Member</h3>

      <input
        placeholder="Full name"
        value={form.fullName}
        onChange={field("fullName")}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={field("email")}
        required
      />

      <select value={form.role} onChange={field("role")}>
        <option value="member">Member</option>
        <option value="volunteer">Volunteer</option>
        <option value="admin">Admin</option>
      </select>

      <select value={form.status} onChange={field("status")}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button type="submit" disabled={isPending}>
        {isPending ? "Creating…" : "Create Member"}
      </button>
    </form>
  );
}
