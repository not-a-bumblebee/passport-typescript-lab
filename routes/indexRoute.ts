import express from "express";
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

router.get("/admin", ensureAuthenticated, isAdmin, (req, res) => {
  console.log("ADMIN");
  console.log(req.user);

  let sesh = []
  let filtered

  if (req.sessionStore) {
    req.sessionStore
    console.log("BOWSER")
    let a = req.sessionStore.all?.((err, session) => {
      console.log(session);
      sesh.push(session)
    })


    console.log("THING", sesh);


  }
  filtered = sesh.filter((x, i) => x.hasOwnProperty("passport"))
  console.log("FILTERED SESSIONS: ", filtered);



  res.render("admin", {
    user: req.user,
    sessions: filtered


  })
})

export default router;
