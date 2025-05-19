const userRoutes = require("./user.routes");
const holdingsRoutes = require("./holdings.route");
const watchlistRoutes = require("./watchlist.route");
const transactionRoute = require("./transaction.route");
// const authRoutes = require('./auth.routes')
const express = require("express");

const router = express.Router();

const routes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/holdings",
    route: holdingsRoutes,
  },
  {
    path: "/watchlist",
    route: watchlistRoutes,
  },
  {
    path: "/bank",
    route: transactionRoute,
  },
];

routes.forEach(({ route, path }) => {
  router.use(path, route);
});

module.exports = router;
