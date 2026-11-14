import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "@routes/auth.routes";
import userRoutes from "@routes/user.routes";
import appConfig from "@config/app.config";

class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.initMiddleware();
    this.initRoutes();
  }

  private initMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      }),
    );
  }

  private initRoutes(): void {
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/user", userRoutes);
  }

  public start() {
    const { port, host } = appConfig;
    this.app.listen(port, host, () => {
      console.log(`Server running at http://${host}:${port}`);
    });
  }
}

export default App;
