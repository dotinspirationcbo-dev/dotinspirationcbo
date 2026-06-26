import { Router, Request, Response } from "express";
import * as siteContentService from "./siteContent.service";
import { UpsertSiteContentDto } from "./siteContent.model";

const router = Router();

router.get("/", async (_req, res: Response) => {
  const entries = await siteContentService.getAllEntries();
  const map = Object.fromEntries(entries.map((e) => [e.key, e.value]));
  res.json({ data: entries, map });
});

router.get("/:key", async (req: Request, res: Response) => {
  const key = String(req.params.key);
  const entry = await siteContentService.getEntry(key);
  if (!entry) {
    res.status(404).json({ error: "Key not found" });
    return;
  }
  res.json({ data: entry });
});

router.put("/:key", async (req: Request, res: Response) => {
  const key = String(req.params.key);
  const { value } = req.body as { value: string };
  if (typeof value !== "string") {
    res.status(400).json({ error: "value must be a string" });
    return;
  }
  const entry = await siteContentService.upsertEntry({ key, value });
  res.json({ data: entry });
});

router.post("/bulk", async (req: Request, res: Response) => {
  const entries = req.body as UpsertSiteContentDto[];
  if (!Array.isArray(entries)) {
    res.status(400).json({ error: "body must be an array of {key, value}" });
    return;
  }
  await siteContentService.bulkUpsert(entries);
  const all = await siteContentService.getAllEntries();
  res.json({ success: true, data: all });
});

export default router;
