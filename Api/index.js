const router = require("express").Router();
const apiRoutes = require("./Api/index");

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = router;
