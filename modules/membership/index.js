import Cookies from "js-cookie";
import { env } from "../../code/configs";
import CryptoJS from "crypto-js";

const createUser = ({ initContext, token, checkUser }) => {
  return {
    getToken() {
      if (typeof window === "object") {
        return Cookies.get(env.APP_TOKEN);
      } else if (typeof token === "string") {
        return token;
      }
      return token;
    },
    setToken() {
      if (typeof window === "object") {
        Cookies.set(env.APP_TOKEN, token, { expires: 7 });
      }
    },
    removeToken() {
      Cookies.remove(env.APP_TOKEN);
    },
    getUser() {
      if (initContext) {
        // Decrypt
        const token = this.getToken();
        const bytes = CryptoJS.AES.decrypt(initContext, token);
        const string = bytes.toString(CryptoJS.enc.Utf8);
        if (string) {
          const context = JSON.parse(string);
          if (context && "user" in context) {
            return Promise.resolve({ data: context.user });
          } else {
            this.removeToken();
            return null;
          }
        }
      } else if (!initContext && checkUser && typeof checkUser === "function") {
        return checkUser().then(response => response);
      } else {
        this.removeToken();
        return null;
      }
    },
    login(callback) {
      this.setToken();
      if (typeof callback === "function") {
        callback();
      }
    },
    logout(callback) {
      this.removeToken();
      if (typeof callback === "function") {
        callback();
      }
    }
  };
};

export { createUser };
