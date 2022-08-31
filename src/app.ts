import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import usersRouter from "./routers/users.router";
import sessionRouter from "./routers/session.router";
import categoriesRouter from "./routers/categories.router";
import propertiesRouter from "./routers/properties.router";
import scheduleRouter from "./routers/scheduleUserProperty.router";

const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", sessionRouter);
app.use("/categories", categoriesRouter);
app.use("/properties", propertiesRouter);
app.use("/schedules", scheduleRouter);

app.use(handleErrorMiddleware);

export default app;
