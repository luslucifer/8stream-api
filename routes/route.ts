import express from "express";
import mediaInfo from "../controllers/mediaInfo";
import getStream from "../controllers/getStream";
import { createProxyMiddleware } from "http-proxy-middleware";
// import getSeasonList from "../controllers/getSeasonList";

const router = express.Router();

router.get("/mediaInfo", mediaInfo);
router.get("/getStream", getStream);
// router.get("/getSeasonList", getSeasonList);

export default router;
