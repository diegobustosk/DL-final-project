function authRole(allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      res.status(401);
      return res.send("Not allowed");
    }

    next();
  };
}

export { authRole };
