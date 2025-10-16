import { User, userModel } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string): [null | User, null | string] => {
  try {

    let user = userModel.findOne(email);
    if (user) {
      if (isUserValid(user, password)) {
        return [user, null];
      }
      console.log("Passwords ", password, user.password);
      
      return [null, "Pasword is incorrect"]
    }
    return [null, null];
  } catch (error) {
    //couldn't find user with email
    const errorString = (error as Error).message;
    return [null, errorString]
  }
};
const getUserById = (id: any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};
