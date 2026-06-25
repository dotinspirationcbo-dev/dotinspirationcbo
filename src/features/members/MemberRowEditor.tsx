import { useState } from "react";
import { useUpdateMember } from "./useUpdateMember";
import type { Member, MemberEditableFields, MemberRole, MemberStatus } from "../../types/member.types";

interface MemberRowEditorProps {
  member: Member;
  canEdit: boolean;
}

function initDraft(member: Member): MemberEditableFields {
  return {
    fullName: member.fullName,
    email: member.email,
    role: member.role,
    status: member.status,
  };
}

/**
 * MemberRowEditor — renders a single table row in either view or edit mode.
 * Edit state is local to this component — no global editing state is introduced.
 * Submits via useUpdateMember(); exits edit mode on successful save.
 */
export function MemberRowEditor({ member, canEdit }: MemberRowEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<MemberEditableFields>(() => initDraft(member));
  const { mutate, isPending } = useUpdateMember();

  function handleEdit() {
    setDraft(initDraft(member));
    setIsEditing(true);
  }

  function handleCancel() {
    setDraft(initDraft(member));
    setIsEditing(false);
  }

  function handleSave() {
    mutate(
      { id: member.id, ...draft },
      { onSuccess: () => setIsEditing(false) }
    );
  }

  function setField<K extends keyof MemberEditableFields>(
    key: K,
    value: MemberEditableFields[K]
  ) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  if (isEditing) {
    return (
      <tr>
        <td>
          <input
            value={draft.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
          />
        </td>
        <td>
          <input
            type="email"
            value={draft.email}
            onChange={(e) => setField("email", e.target.value)}
          />
        </td>
        <td>
          <select
            value={draft.role}
            onChange={(e) => setField("role", e.target.value as MemberRole)}
          >
            <option value="member">Member</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>
        </td>
        <td>
          <select
            value={draft.status}
            onChange={(e) => setField("status", e.target.value as MemberStatus)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </td>
        <td>
          <button onClick={handleSave} disabled={isPending}>
            {isPending ? "Saving…" : "Save"}
          </button>
          {" "}
          <button onClick={handleCancel} disabled={isPending}>
            Cancel
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{member.fullName}</td>
      <td>{member.email}</td>
      <td>{member.role}</td>
      <td>{member.status}</td>
      <td>
        {canEdit && (
          <button onClick={handleEdit}>Edit</button>
        )}
      </td>
    </tr>
  );
}
