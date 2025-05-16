import express, { Router } from "express";
import { authGuard } from "../middlewares/authGuard";
import { PartnerApi } from "../apiClients/partnerAPI.client";

const router: Router = express.Router();
const partnerApi: PartnerApi = new PartnerApi()

router.get('/top14', (req, res) => partnerApi.getTop14Games(req, res));

export default router;
