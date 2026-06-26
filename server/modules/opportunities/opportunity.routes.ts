import { Router, Request, Response } from "express";
import * as opportunityService from "./opportunity.service";
import {
  CreateOpportunityDto,
  UpdateOpportunityDto,
  VALID_TYPES,
  VALID_STATUSES,
  OpportunityType,
  OpportunityStatus,
} from "./opportunity.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const rawType = req.query.type;
  const rawStatus = req.query.status;

  const type =
    typeof rawType === "string" && VALID_TYPES.includes(rawType as OpportunityType)
      ? (rawType as OpportunityType)
      : undefined;

  const status =
    typeof rawStatus === "string" && VALID_STATUSES.includes(rawStatus as OpportunityStatus)
      ? (rawStatus as OpportunityStatus)
      : undefined;

  const opportunities = await opportunityService.getAllOpportunities(type, status);
  res.json({ data: opportunities, count: opportunities.length });
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const opportunity = await opportunityService.getOpportunityById(id);
  if (!opportunity) {
    res.status(404).json({ error: "Opportunity not found" });
    return;
  }
  res.json({ data: opportunity });
});

router.post("/", async (req: Request, res: Response) => {
  const dto = req.body as CreateOpportunityDto;
  if (!dto.title) {
    res.status(400).json({ error: "title is required" });
    return;
  }
  if (!VALID_TYPES.includes(dto.type)) {
    res.status(400).json({ error: `type must be one of: ${VALID_TYPES.join(", ")}` });
    return;
  }
  const opportunity = await opportunityService.createOpportunity(dto);
  res.status(201).json({ data: opportunity });
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const dto = req.body as UpdateOpportunityDto;
  if (dto.type !== undefined && !VALID_TYPES.includes(dto.type)) {
    res.status(400).json({ error: `type must be one of: ${VALID_TYPES.join(", ")}` });
    return;
  }
  if (dto.status !== undefined && !VALID_STATUSES.includes(dto.status)) {
    res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(", ")}` });
    return;
  }
  const opportunity = await opportunityService.updateOpportunity(id, dto);
  if (!opportunity) {
    res.status(404).json({ error: "Opportunity not found" });
    return;
  }
  res.json({ data: opportunity });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const deleted = await opportunityService.deleteOpportunity(id);
  if (!deleted) {
    res.status(404).json({ error: "Opportunity not found" });
    return;
  }
  res.status(204).send();
});

export default router;
