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
    const user = getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
        message: "Your login details are not valid. Please try again",
      });
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
