import express from "express";
import passport from 'passport';
import { ensureAuthenticated, forwardAuthenticated, isAdmin } from "../middleware/checkAuth";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login", { messages: req.session.messages });

  req.session.messages = []
  req.session.save()
})

router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });



router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true,
    /* FIX ME: 😭 failureMsg needed when login fails */


  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

router.post("/revoke/:sessionID", ensureAuthenticated, isAdmin, (req, res) => {
  let seshID = req.params.sessionID
  let sesh = []

  if (req.sessionStore) {
    req.sessionStore
    console.log("BOWSER")
    let a = req.sessionStore.all?.((err, session) => {
      console.log(session);
      sesh.push(session)
    })


    console.log("THING", sesh);

    let filtered = sesh.filter((x, i) => x.hasOwnProperty("passport"))
    console.log("FILTERED SESSIONS: ", filtered);

    req.sessionStore.destroy(seshID,(err)=>{
      if(err){
        console.log(err);
      }

      res.redirect("back")
    })

  }
})

export default router;
