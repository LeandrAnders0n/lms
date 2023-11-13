import { Router } from "express";
import userRoutes from "./user-routes.js";
import courseRoutes from "./course-routes.js";
const appRouter = Router();
//domain/api/v1/user
appRouter.use("/user", userRoutes);
//domain/api/v1/chats
appRouter.use("/course", courseRoutes);
export default appRouter;
//# sourceMappingURL=index.js.map