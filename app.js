import express from "express";
import session from 'express-session';
import configRoutes from "./routes/index.js";
import exphbs from "express-handlebars";
const app = express();

/* Session Management */
app.use(
    session({
        name: 'BokenBoards',
        secret: 'Install Crypto for Better Safety lol',
        saveUninitialized: false,
        resave: false,
        cookie: {maxAge: 300000}
    })
);
// Verify the user is logged in before they attempt to access the dashboard route
app.use('/dashboard', (req, res, next) => {
    console.log(`User session id: ${req.session.id}`);
    if (!req.session.user){
        return res.redirect('/signin');
    } else {
        next();
    }
});

// If the user is already logged in and they go to the signin page:
// reroute to the dashboard
app.use('/signin', (req, res, next) =>{
    if (req.session.user){
        return res.redirect('/dashboard');
    } else {
        next();
    }
});

/* Regular Express Code */
app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
