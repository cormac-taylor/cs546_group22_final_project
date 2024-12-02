// import exampleRoutes from './example.js';
import homeRoutes from "./home.js"
import manageGameRoutes from "./manageGames.js"
import gameDetailRoutes from "./gameDetails.js"
import signupRoutes from "./signup.js"
import signinRoutes from "./signin.js"
import dashboardRoutes from './dashboard.js'

import {static as staticDir} from 'express';

const constructorMethod = (app) => {
  //   app.use('/example', exampleRoutes);
  app.use("/", homeRoutes);
  app.use('/dashboard', dashboardRoutes);
  app.use("/manage", manageGameRoutes);
  app.use("/games", gameDetailRoutes);
  app.use('/signup', signupRoutes);
  app.use('/signin', signinRoutes);
  app.use('/public', staticDir('public'));

  app.use("*", (_, res) => {
    res.redirect("/");
  });
};

export default constructorMethod;
