const userRoutes = require("./user.routes");
const holdingsRoutes = require("./holdings.route");
const watchlistRoutes = require("./watchlist.route");
// const authRoutes = require('./auth.routes')
const express = require("express");

const router = express.Router();

const routes = [
  // {
  //   path: '/auth',
  //   route: authRoutes
  // },
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
];

routes.forEach(({ route, path }) => {
  router.use(path, route);
});

module.exports = router;
