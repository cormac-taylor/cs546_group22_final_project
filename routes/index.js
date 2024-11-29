// import exampleRoutes from './example.js';
import homeRoutes from "./home.js";
<<<<<<< HEAD
import manageGameRoutes from "./manageGames.js"
=======
import signupRoutes from "./signup.js";
import {static as staticDir} from 'express';
>>>>>>> main

const constructorMethod = (app) => {
  //   app.use('/example', exampleRoutes);
  app.use("/", homeRoutes);
<<<<<<< HEAD
  app.use("/manage", manageGameRoutes)
=======
  app.use('/signup', signupRoutes);
  app.use('/public', staticDir('public'));
>>>>>>> main

  app.use("*", (_, res) => {
    res.redirect("/");
  });
};

export default constructorMethod;
