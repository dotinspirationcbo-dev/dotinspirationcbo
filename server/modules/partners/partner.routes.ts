import { Router, Request, Response } from "express";
import * as partnerService from "./partner.service";
import {
  CreatePartnerDto,
  UpdatePartnerDto,
  VALID_PARTNER_CATEGORIES,
  PartnerCategory,
} from "./partner.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const activeOnly = req.query.active === "true";
  const partners = await partnerService.getAllPartners(activeOnly);
  res.json({ data: partners, count: partners.length });
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const partner = await partnerService.getPartnerById(id);
  if (!partner) { res.status(404).json({ error: "Partner not found" }); return; }
  res.json({ data: partner });
});

router.post("/", async (req: Request, res: Response) => {
  const dto = req.body as CreatePartnerDto;
  if (!dto.name) { res.status(400).json({ error: "name is required" }); return; }
  if (dto.category && !VALID_PARTNER_CATEGORIES.includes(dto.category as PartnerCategory)) {
    res.status(400).json({ error: `category must be one of: ${VALID_PARTNER_CATEGORIES.join(", ")}` });
    return;
  }
  const partner = await partnerService.createPartner(dto);
  res.status(201).json({ data: partner });
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const dto = req.body as UpdatePartnerDto;
  if (dto.category && !VALID_PARTNER_CATEGORIES.includes(dto.category as PartnerCategory)) {
    res.status(400).json({ error: `category must be one of: ${VALID_PARTNER_CATEGORIES.join(", ")}` });
    return;
  }
  const partner = await partnerService.updatePartner(id, dto);
  if (!partner) { res.status(404).json({ error: "Partner not found" }); return; }
  res.json({ data: partner });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const deleted = await partnerService.deletePartner(id);
  if (!deleted) { res.status(404).json({ error: "Partner not found" }); return; }
  res.status(204).send();
});

export default router;
