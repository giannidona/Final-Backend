const userAccess = async (req, res, next) => {
  const userRole = req.session.role;
  if (userRole === "default") {
    next();
  } else {
    res.render("notaccess");
  }
};

export default userAccess;
