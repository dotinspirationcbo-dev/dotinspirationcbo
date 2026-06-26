import { Router, Request, Response } from "express";
import * as galleryService from "./gallery.service";
import { CreateGalleryImageDto, UpdateGalleryImageDto } from "./gallery.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const category = typeof req.query.category === "string" ? req.query.category : undefined;
  const showAll = req.query.all === "true";
  const images = await galleryService.getAllImages(category, !showAll);
  res.json({ data: images, count: images.length });
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const image = await galleryService.getImageById(id);
  if (!image) {
    res.status(404).json({ error: "Image not found" });
    return;
  }
  res.json({ data: image });
});

router.post("/", async (req: Request, res: Response) => {
  const dto = req.body as CreateGalleryImageDto;
  if (!dto.image_url) {
    res.status(400).json({ error: "image_url is required" });
    return;
  }
  const image = await galleryService.createImage(dto);
  res.status(201).json({ data: image });
});

router.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const dto = req.body as UpdateGalleryImageDto;
  const image = await galleryService.updateImage(id, dto);
  if (!image) {
    res.status(404).json({ error: "Image not found" });
    return;
  }
  res.json({ data: image });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const deleted = await galleryService.deleteImage(id);
  if (!deleted) {
    res.status(404).json({ error: "Image not found" });
    return;
  }
  res.status(204).send();
});

export default router;
