import { Router, Request, Response } from "express";
import * as contactService from "./contactMessage.service";
import {
  CreateContactMessageDto,
  VALID_MESSAGE_STATUSES,
  MessageStatus,
} from "./contactMessage.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const raw = req.query.status;
  const status =
    typeof raw === "string" && VALID_MESSAGE_STATUSES.includes(raw as MessageStatus)
      ? (raw as MessageStatus)
      : undefined;
  const messages = await contactService.getAllMessages(status);
  res.json({ data: messages, count: messages.length });
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const message = await contactService.getMessageById(id);
  if (!message) { res.status(404).json({ error: "Message not found" }); return; }
  res.json({ data: message });
});

router.post("/", async (req: Request, res: Response) => {
  const dto = req.body as CreateContactMessageDto;
  if (!dto.name || !dto.email || !dto.message) {
    res.status(400).json({ error: "name, email, and message are required" });
    return;
  }
  const message = await contactService.createMessage(dto);
  res.status(201).json({ data: message });
});

router.patch("/:id/status", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const { status } = req.body as { status: MessageStatus };
  if (!VALID_MESSAGE_STATUSES.includes(status)) {
    res.status(400).json({
      error: `status must be one of: ${VALID_MESSAGE_STATUSES.join(", ")}`,
    });
    return;
  }
  const message = await contactService.updateStatus(id, status);
  if (!message) { res.status(404).json({ error: "Message not found" }); return; }
  res.json({ data: message });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const deleted = await contactService.deleteMessage(id);
  if (!deleted) { res.status(404).json({ error: "Message not found" }); return; }
  res.status(204).send();
});

export default router;
