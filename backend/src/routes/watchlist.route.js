const express = require("express");
const { watchListController } = require("./../controllers");
const verifyAuth = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(verifyAuth);
router
  .route("")
  .post(watchListController.creatWatchlist)
  .get(watchListController.getAllWatchlists);

router.route("/:id").delete(watchListController.dropWatchlist);
module.exports = router;
