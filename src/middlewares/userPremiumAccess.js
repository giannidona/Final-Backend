const userPremiumAccess = async (req, res, next) => {
  const userRole = req.session.role;

  if (userRole === "default" || userRole === "premium") {
    next();
  } else {
    res.render("notaccess");
  }
};

export default userPremiumAccess;
