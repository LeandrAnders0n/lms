import { Router } from "express";
import { getAllCourses, addCourse } from "../controllers/course-controller.js";
const courseRoutes = Router();
courseRoutes.get("/", getAllCourses);
courseRoutes.post("/add", addCourse);
export default courseRoutes;
//# sourceMappingURL=course-routes.js.map