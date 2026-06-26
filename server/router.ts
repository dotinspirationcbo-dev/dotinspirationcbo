import { Router } from "express";
import galleryRoutes from "./modules/gallery/gallery.routes";
import opportunityRoutes from "./modules/opportunities/opportunity.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.use("/gallery", galleryRoutes);
router.use("/opportunities", opportunityRoutes);

export default router;
