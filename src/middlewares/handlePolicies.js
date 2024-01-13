import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../config/constants.js";

const handlePolicies = (policies) => {
  return (req, res, next) => {
    if (policies.includes("PUBLIC")) {
      return next();
    }
    console.log(req.headers);
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      return res.status(401).send({ status: "error", error: "Unauthorized" });
    }

    const token = authHeaders.split(" ")[1];

    try {
      const user = jwt.verify(token, JWT_PRIVATE_KEY);

      if (!policies.includes(user.user.role.toUpperCase())) {
        return res
          .status(403)
          .send({ status: "error", error: "No cumple con las políticas" });
      }

      req.user = user;
      console.log(user);
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).send({ status: "error", error: "Invalid token" });
    }
  };
};

export default handlePolicies;
