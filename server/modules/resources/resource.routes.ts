import { Router, Request, Response } from "express";
import * as resourceService from "./resource.service";
import {
  CreateResourceDto,
  UpdateResourceDto,
  VALID_RESOURCE_CATEGORIES,
  ResourceCategory,
} from "./resource.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const publishedOnly = req.query.published === "true";
  const resources = await resourceService.getAllResources(publishedOnly);
  res.json({ data: resources, count: resources.length });
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const resource = await resourceService.getResourceById(id);
  if (!resource) { res.status(404).json({ error: "Resource not found" }); return; }
  res.json({ data: resource });
});

router.post("/", async (req: Request, res: Response) => {
  const dto = req.body as CreateResourceDto;
  if (!dto.title) { res.status(400).json({ error: "title is required" }); return; }
  if (dto.category && !VALID_RESOURCE_CATEGORIES.includes(dto.category as ResourceCategory)) {
    res.status(400).json({ error: `category must be one of: ${VALID_RESOURCE_CATEGORIES.join(", ")}` });
    return;
  }
  const resource = await resourceService.createResource(dto);
  res.status(201).json({ data: resource });
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const dto = req.body as UpdateResourceDto;
  if (dto.category && !VALID_RESOURCE_CATEGORIES.includes(dto.category as ResourceCategory)) {
    res.status(400).json({ error: `category must be one of: ${VALID_RESOURCE_CATEGORIES.join(", ")}` });
    return;
  }
  const resource = await resourceService.updateResource(id, dto);
  if (!resource) { res.status(404).json({ error: "Resource not found" }); return; }
  res.json({ data: resource });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const deleted = await resourceService.deleteResource(id);
  if (!deleted) { res.status(404).json({ error: "Resource not found" }); return; }
  res.status(204).send();
});

export default router;
