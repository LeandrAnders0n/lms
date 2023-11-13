import { Router } from "express";
import { getAllUsers, userSignup, loginSignup, enrollCourse, completeCourse } from "../controllers/user-controller.js";
import { validate, signupValidator, loginValidator } from "../utils/validators.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), loginSignup);
userRoutes.post("/enroll", enrollCourse);
userRoutes.post("/completed", completeCourse);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map