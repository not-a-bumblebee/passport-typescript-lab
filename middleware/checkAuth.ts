import { NextFunction, Request, Response } from "express";

/*
FIX ME (types) 😭
*/
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

/*
FIX ME (types) 😭
*/
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {

  if (req.user?.role === "admin") {
    return next()

  }
  res.redirect("/")

}