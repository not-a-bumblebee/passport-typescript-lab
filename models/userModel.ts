const database: User[] = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin"
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user"
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user"
  },
];

const userModel = {

  /* FIX ME (types) 😭 */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  /* FIX ME (types) 😭 */
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findOrCreate: (profile: User) => {

    const user = database.find((user) => user.githubID === profile.githubID);
    if (!user) {
      let created = database.push({ githubID: profile.githubID, name: profile.name, role: "user" })
      return database[created - 1]
    }
    return user


  }
};

type UserRole = "admin" | "user"

interface User extends Express.User {
  id?: number,
  name?: string,
  email?: string,
  password?: string,
  githubID?: number,
  role?: UserRole
}

// declare "express-session"{

// }

export { database, userModel, User };
