const isAdmin = (req, res, next) => {
  const { role } = req.session;
  const isAdmin = role === "admin";

  res.locals.isAdmin = isAdmin;

  next();
};

export default isAdmin;
