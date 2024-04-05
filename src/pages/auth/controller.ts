import { authHandler } from "./api";

class AuthController {
    public getUser(data:Record<string, string>) {
        authHandler(data);
    }
} 

export const authController = new AuthController();
