const publicRoutes = (req, res, next) => {
  if (req.session.isLogged) {
    return res.redirect("/home");
  }
  next();
};

export default publicRoutes;
