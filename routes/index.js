// import exampleRoutes from './example.js';
import homeRoutes from "./home.js";
import manageGameRoutes from "./manageGames.js"

const constructorMethod = (app) => {
  //   app.use('/example', exampleRoutes);
  app.use("/", homeRoutes);
  app.use("/manage", manageGameRoutes)

  app.use("*", (_, res) => {
    res.redirect("/");
  });
};

export default constructorMethod;
