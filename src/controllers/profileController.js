const renderProfile = async (req, res) => {
  try {
    const { username, surname, email, role } = req.session;

    res.render("profile", {
      username,
      surname,
      email,
      role,
    });
  } catch (error) {
    console.log(error, "renderProfile profileController");
  }
};

export default { renderProfile };
