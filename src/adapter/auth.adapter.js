import axios from "axios";

export class AuthAdapter {
  instance;
  constructor(baseURL, token) {
    this.instance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000,
      timeoutErrorMessage: "Request timed out",
    });
  }

  register = async (user_information) => {
    try {
      const response = await this.instance.post("/auth/register", {
        email: user_information.email.toLowerCase(),
        password: user_information.password,
        firstname: user_information.firstName,
        lastname: user_information.lastName,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return {
        status: err.status || 400,
        defaultError: err.message,
        error: err.response?.data?.message,
      };
    }
  };

  login = async (email, password) => {
    try {
      const response = await this.instance.post("/auth/login", {
        email: email.toLowerCase(),
        password,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return {
        status: err.status,
        error: err.message,
        detailError: err.response?.data?.message,
      };
    }
  };

  forgetPassword = async (email) => {
    try {
      const lowerCasedEmail = email.toLowerCase();
      const response = await this.instance.post(
        "/auth/password/reset/request",
        {
          email: lowerCasedEmail,
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return {
        status: err.status,
        error: err.message,
        detailError: err.response?.data?.message,
      };
    }
  };

  resetPassword = async (token, uid, new_password) => {
    try {
      const response = await this.instance.post(
        "/auth/password/reset/confirm",
        {
          userid: uid,
          token,
          newpassword: new_password,
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return {
        status: err.status,
        error: err.message,
        detailError: err.response?.data?.message,
      };
    }
  };

  logout = async (token, refreshToken) => {
    try {
      const response = await this.instance.post("/auth/logout", {
        refresh_token: refreshToken,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (err) {
      console.error(err);
      return {
        status: err.status,
        error: err.message,
        detailError: err.response?.data?.message,
      };
    }
  };

  otpVerification = async (email, otp) => {
    try {
      const response = await this.instance.post("/auth/otp/verify", {
        email,
        otp_code: otp,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return {
        status: err.status,
        error: err.message,
        detailError: err.response?.data?.message,
      };
    }
  };
}
