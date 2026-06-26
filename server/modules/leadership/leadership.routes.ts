import { Router, Request, Response } from "express";
import * as leadershipService from "./leadership.service";
import {
  CreateLeadershipMemberDto,
  UpdateLeadershipMemberDto,
} from "./leadership.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const publishedOnly = req.query.published === "true";
  const members = await leadershipService.getAllMembers(publishedOnly);
  res.json({ data: members, count: members.length });
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const member = await leadershipService.getMemberById(id);
  if (!member) { res.status(404).json({ error: "Member not found" }); return; }
  res.json({ data: member });
});

router.post("/", async (req: Request, res: Response) => {
  const dto = req.body as CreateLeadershipMemberDto;
  if (!dto.name || !dto.role) {
    res.status(400).json({ error: "name and role are required" });
    return;
  }
  const member = await leadershipService.createMember(dto);
  res.status(201).json({ data: member });
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const dto = req.body as UpdateLeadershipMemberDto;
  const member = await leadershipService.updateMember(id, dto);
  if (!member) { res.status(404).json({ error: "Member not found" }); return; }
  res.json({ data: member });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const deleted = await leadershipService.deleteMember(id);
  if (!deleted) { res.status(404).json({ error: "Member not found" }); return; }
  res.status(204).send();
});

router.patch("/:id/reorder", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const { direction } = req.body as { direction: "up" | "down" };
  if (direction !== "up" && direction !== "down") {
    res.status(400).json({ error: "direction must be up or down" });
    return;
  }
  await leadershipService.reorderMember(id, direction);
  res.json({ success: true });
});

export default router;
