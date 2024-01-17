
import axios from "../axios-config";
import TokenService from "./token.service";
export const login = async ({ email, password }) => {
    try {
        const response = await axios.post("/auth/login", {
            email,
            password,
        });
        if (response.status === 200) {
            const { tokens, user } = response.data;
            const accessToken = tokens.access.token;
            const refreshToken = tokens.refresh.token;
            const userId = user.id;

            if (accessToken && refreshToken && userId) {
                const userObject = {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    userId: userId,
                };
                TokenService.setUser(userObject);
                
            } else {
                console.error("Invalid tokens or user ID");
            }
        } else {
            console.error("Login failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
};
export const loginDemoUser = async () => {
     try {
         const response = await axios.post("/auth/login-demo-user", {});
         if (response.status === 200) {
             const { tokens, user } = response.data;
             const accessToken = tokens.access.token;
             const refreshToken = tokens.refresh.token;
             const userId = user.id;

             if (accessToken && refreshToken && userId) {
                 const userObject = {
                     accessToken: accessToken,
                     refreshToken: refreshToken,
                     userId: userId,
                 };
                 TokenService.setUser(userObject);
             } else {
                 console.error("Invalid tokens or user ID");
             }
         } else {
             console.error("Login failed");
         }
     } catch (error) {
         console.error("Error during login:", error);
     }
};
export const logout = async ({userId}) => {
     try {
         const response = await axios.post("/auth/logout-demo-user", { userId });
             TokenService.removeUser(); 
     } catch (error) {
         TokenService.removeUser();
         console.error("Error during login:", error);
     }
   
};
const AuthService = {
    login,
    logout,
    loginDemoUser,
};

export default AuthService;