const adminPremiumAccess = async (req, res, next) => {
  const userRole = req.session.role;

  if (userRole === "admin" || userRole === "premium") {
    next();
  } else {
    res.render("notaccess");
  }
};

export default adminPremiumAccess;
