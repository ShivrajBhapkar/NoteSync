class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("User"));
        return user?.refreshToken;
    }

    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("User"));
        return user?.accessToken;
    }

    updateLocalAccessToken(token) {
        let user = JSON.parse(localStorage.getItem("User"));
        user.accessToken = token;
        localStorage.setItem("User", JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem("User"));
    }

    setUser(user) {
        localStorage.setItem("User", JSON.stringify(user));
    }

    removeUser() {
        localStorage.removeItem("User");
    }
}

export default new TokenService();
