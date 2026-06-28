import { Router } from "express";
import galleryRoutes from "./modules/gallery/gallery.routes";
import opportunityRoutes from "./modules/opportunities/opportunity.routes";
import siteContentRoutes from "./modules/site-content/siteContent.routes";
import contactMessageRoutes from "./modules/contact-messages/contactMessage.routes";
import leadershipRoutes from "./modules/leadership/leadership.routes";
import resourceRoutes from "./modules/resources/resource.routes";
import partnerRoutes from "./modules/partners/partner.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

router.use("/gallery",          galleryRoutes);
router.use("/opportunities",    opportunityRoutes);
router.use("/site-content",     siteContentRoutes);
router.use("/contact-messages", contactMessageRoutes);
router.use("/leadership",       leadershipRoutes);
router.use("/resources",        resourceRoutes);
router.use("/partners",         partnerRoutes);

export default router;
