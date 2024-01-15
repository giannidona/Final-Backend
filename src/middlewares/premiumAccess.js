const premiumAccess = async (req, res, next) => {
  const userRole = req.session.role;
  if (userRole === "premium") {
    next();
  } else {
    res.render("notaccess");
  }
};

export default premiumAccess;
