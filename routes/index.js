// import exampleRoutes from './example.js';
import homeRoutes from "./home.js";
import manageGameRoutes from "./manageGames.js";
import signupRoutes from "./signup.js";
import { static as staticDir } from "express";

const constructorMethod = (app) => {
  //   app.use('/example', exampleRoutes);
  app.use("/", homeRoutes);
  app.use("/manage", manageGameRoutes);
  app.use("/signup", signupRoutes);
  app.use("/public", staticDir("public"));

  app.use("*", (_, res) => {
    res.redirect("/");
  });
};

export default constructorMethod;
