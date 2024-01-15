const adminAccess = async (req, res, next) => {
  const userRole = req.session.role;
  if (userRole === "admin") {
    next();
  } else {
    res.render("notaccess");
  }
};

export default adminAccess;
