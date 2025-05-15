const userRoutes = require("./user.routes");
const holdingsRoutes = require('./holdings.route')
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
    path: '/holdings',
    route: holdingsRoutes
  }
];

routes.forEach(({route,path})=>{
    router.use(path, route)
});

module.exports = router
