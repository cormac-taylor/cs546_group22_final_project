import { Router } from "express";
import { usersData, locationData, gamesData } from "../data/index.js";
import { utils } from "../utilities/utilityIndex.js";
import * as validation from "../utilities/validation.js";
import { games } from "../config/mongoCollections.js";
import xss from "xss";

const router = Router();

router
  // TODO: Handle user going to /dashboard without /'username'
  .route("/")
  .get(async (req, res) => {
    if (req.session.user) {
      return res.redirect(`/dashboard/${req.session.user.username}`);
    } else {
      return res.redirect("/signin");
    }
  });

router.route("/viewrequest").post(async (req, res) => {
  if (!req.session.user) {
    return res.render("signin", { pageTitle: "Sign In" });
  }
  try {
    let userId = req.session.user.userId;
    let reqId = validation.validateObjectID(xss(req.body.reqUserId));
    let gameId = validation.validateObjectID(xss(req.body.reqGame));
    let reqObj = await gamesData.returnRequest(
      gameId.toString(),
      reqId.toString()
    );
    let reqMsg = reqObj.requests[0].message;
    let currUser = await usersData.getUserById(userId);
    let reqUser = await usersData.getUserById(reqId.toString());
    let reqGame = await gamesData.getGameById(gameId.toString());
    res.render("viewRequest", {
      pageTitle: "View Game Request",
      signedIn: true,
      reqUser,
      reqGame,
      reqMsg,
    });
  } catch (e) {
    return res.status(500).render("error", {
      signedIn: true,
      pageTitle: "Error",
      errorStatus: "500",
      errorMsg: "500 Server Error",
    });
  }
});

router.route("/viewrequest/approve").post(async (req, res) => {
  if (!req.session.user) {
    return res.render("signin", { pageTitle: "Sign In" });
  }
  let userId;
  let reqId;
  let gameId;
  let reqObj;
  let reqMsg;
  let approveStr;
  let approveVal;
  let currUser;
  let reqUser;
  let reqGame;
  try {
    userId = req.session.user.userId;
    reqId = validation.validateObjectID(xss(req.body.reqUserId));
    gameId = validation.validateObjectID(xss(req.body.reqGame));
    reqObj = await gamesData.returnRequest(gameId.toString(), reqId.toString());
    reqMsg = reqObj.requests[0].message;
    approveStr = validation.validateString(xss(req.body.approve));
    approveVal = ((str) => str === "true")(approveStr);
    currUser = await usersData.getUserById(userId);
    reqUser = await usersData.getUserById(reqId.toString());
    reqGame = await gamesData.getGameById(gameId.toString());
  } catch (e) {
    return res.status(500).render("error", {
      signedIn: true,
      pageTitle: "Error",
      errorStatus: "500",
      errorMsg: "500 Server Error",
    });
  }
  try {
    if (reqGame.ownerID.toString() !== userId)
      throw `Error: This game does not belong to you!`;
  } catch (e) {
    return res.status(500).render("error", {
      signedIn: true,
      pageTitle: "Error",
      errorStatus: "500",
      errorMsg: "Error: This game does not belong to you!",
    });
  }
  try {
    /* Updates the game object by removing the request and setting game borrowed status accordingly */
    reqGame = await gamesData.handleRequest(
      gameId.toString(),
      reqId.toString(),
      approveVal
    );

    res.render("viewRequest", {
      pageTitle: "View Game Request",
      signedIn: true,
      requestHandled: true,
      approveVal,
      reqUser,
      reqGame,
      reqMsg,
    });
  } catch (e) {
    return res.status(500).render("error", {
      signedIn: true,
      pageTitle: "Error",
      errorStatus: "500",
      errorMsg: "Error: This game is already being borrowed",
    });
  }
});

// TODO: Add list of requested games to dashboard
router.route("/:username").get(async (req, res) => {
  try {
    if (!req.session.user) {
      return res.render("signin", { pageTitle: "Sign In" });
    }
    let userId = req.session.user.userId;
    let currUser = await usersData.getUserById(userId);
    let currGames = await gamesData.getGamesByOwnerID(userId);
    let hasGames = false;
    let hasReqs = false;
    let requests = [];
    if (currGames) hasGames = true;
    for (let game of currGames) {
      if (game.requests !== undefined && game.requests.length !== 0) {
        hasReqs = true;
        for (let request of game.requests) {
          let reqUser = await usersData.getUserById(
            request.reqUserId.toString()
          );
          let reqObj = {
            reqUserId: reqUser._id,
            gameId: game._id,
            reqUsername: reqUser.username,
            reqFirstName: reqUser.firstName,
            reqLastName: reqUser.lastName,
            reqUserMsg: request.message,
          };
          requests.push(reqObj);
        }
      }
    }
    // Ensure session name matches URL
    if (xss(req.params.username) !== req.session.user.username) {
      return res.status(403).render("error", {
        signedIn: true,
        pageTitle: "Error",
        errorStatus: "403",
        errorMsg: "You do not have access to view this page",
      });
    }
    res.render("dashboard", {
      pageTitle: "BokenBoards Dashboard",
      signedIn: true,
      user: currUser,
      hasGames: hasGames,
      games: currGames,
      hasReqs: hasReqs,
      requests: requests,
    });
  } catch (e) {
    return res.status(500).render("error", {
      signedIn: true,
      pageTitle: "Error",
      errorStatus: "500",
      errorMsg: "500 Server Error",
    });
  }
});

router
  .route("/:username/update")
  .get(async (req, res) => {
    try {
      if (!req.session.user) {
        return res.render("signin", { pageTitle: "Sign In" });
      }
      let userId = req.session.user.userId;
      let currUser = await usersData.getUserById(userId);

      // Ensure session name matches URL
      if (xss(req.params.username) !== req.session.user.username) {
        return res.status(403).render("error", {
          signedIn: true,
          pageTitle: "Error",
          errorStatus: "403",
          errorMsg: "You do not have access to view this page",
        });
      }
      res.render("updateProfile", {
        pageTitle: "Update Profile",
        signedIn: true,
        user: currUser,
      });
    } catch (e) {
      return res.status(500).render("error", {
        signedIn: true,
        pageTitle: "Error",
        errorStatus: "500",
        errorMsg: "500 Server Error",
      });
    }
  })
  .post(async (req, res) => {
    let userId;
    let currUser;
    try {
      // Ensure there is a valid session for user
      if (!req.session.user) {
        return res.render("signin", { pageTitle: "Sign In" });
      }
      userId = req.session.user.userId;
      currUser = await usersData.getUserById(userId);

      // Ensure session name matches URL
      if (xss(req.params.username) !== req.session.user.username) {
        render("error", {
          signedIn: true,
          pageTitle: "Error",
          errorStatus: "403",
          errorMsg: "You do not have access to view this page",
        });
      }
    } catch (e) {
      return res.status(500).render("error", {
        signedIn: true,
        pageTitle: "Error",
        errorStatus: "500",
        errorMsg: "500 Server Error",
      });
    }

    /* Verification of user updated data */
    const updatedData = req.body;

    let errors = [];

    if (!xss(updatedData.attribute)) errors.push("Please select a field.");
    if (xss(updatedData.firstName) !== "") {
      try {
        updatedData.firstName = validation.validateName(
          xss(updatedData.firstName)
        );
      } catch (e) {
        errors.push(`First name ${e}`);
      }
    }
    if (xss(updatedData.lastName) !== "") {
      try {
        updatedData.lastName = validation.validateName(
          xss(updatedData.lastName)
        );
      } catch (e) {
        errors.push(`Last name ${e}`);
      }
    }
    if (xss(updatedData.username) !== "") {
      try {
        updatedData.username = validation.validateUsername(
          xss(updatedData.username)
        );
      } catch (e) {
        errors.push(`Username ${e}`);
      }
    }
    if (xss(updatedData.email) !== "") {
      try {
        updatedData.email = validation.validateEmail(xss(updatedData.email));
      } catch (e) {
        errors.push(`Email ${e}`);
      }
    }
    if (xss(updatedData.newPassword) !== "") {
      try {
        updatedData.password = validation.validatePassword(
          xss(updatedData.newPassword)
        );
      } catch (e) {
        errors.push(`Password ${e}`);
      }
    }
          if (xss(updatedData.location)){
            try{
                let trimbleLoc = await locationData.geocodeAddress(xss(updatedData.location))
                updatedData.location = await locationData.makeGeoJSON(trimbleLoc);
            }catch (e) {
                errors.push(`Location ${e}`);
            }
        }


    /* Error Display*/
    if (errors.length > 0) {
      res.render("updateProfile", {
        pageTitle: "Update Profile",
        signedIn: true,
        errors: errors,
        hasErrors: true,
        user: currUser,
      });
      return;
    }
    /* If user entered valid data*/
    try {
      const updatedUser = await usersData.updateUser(userId, updatedData);
      req.session.user = {
        username: updatedUser.username,
        email: updatedUser.email,
        userId: updatedUser._id,
      };
      res.render("updateProfile", {
        pageTitle: "dashboard",
        signedIn: true,
        success: true,
        user: updatedUser,
      });
    } catch (e) {
      res.status(500).render("updateProfile", {
        pageTitle: "Update Profile: Error",
        signedIn: true,
        errors: [e],
        hasErrors: true,
        user: currUser,
      });
      return;
    }
  });

export default router;
