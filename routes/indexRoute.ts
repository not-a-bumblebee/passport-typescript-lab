import express from "express";
import { promisify } from "util"


const router = express.Router();
import { ensureAuthenticated, isAdmin } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  console.log(req.session);

  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, isAdmin, async (req, res) => {


  let sesh = []

  if (req.sessionStore.all) {

    const allAsync = promisify(req.sessionStore.all.bind(req.sessionStore));
    const sessions = await allAsync();


    for (const [key, value] of Object.entries(sessions!)) {
      if (value.hasOwnProperty("passport") && value.passport) {

        sesh.push({ "sessionID": key, "UserID": value.passport.user })
      }

    }


    res.render("admin", {
      user: req.user,
      sessions: sesh


    })
  }

})

export default router;
