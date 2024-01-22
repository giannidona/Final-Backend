const errors = async (req, res, next) => {
  try {
    next();
  } catch (err) {
    console.log(err);
  }
};

export { errors };
