import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById } from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';
import { User } from "../../models/userModel";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    let [user, message] = getUserByEmailIdAndPassword(email, password);
    console.log("FIRE",user,message);
    console.log("FIRE",user,message);
    

    return user
      ? done(null, user)
      : done(null, false, { message: message as string });
  }
);

type callback = (err: any, id?: any) => void

/*
FIX ME (types) 😭
*/
passport.serializeUser(function (user: User, done: callback) {
  done(null, user.id);
});
passport

/*
FIX ME (types) 😭
*/
passport.deserializeUser(function (id: number, done: callback) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
