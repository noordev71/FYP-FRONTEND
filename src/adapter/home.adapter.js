import axios from "axios";

export class HomeAdapter {
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

  //Shared methods of all sections

  getAllAds = async (platform) => {
    try {
      const response = await this.instance.get(`/${platform}/view-all`);
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

  getAdDetails = async (platform, id, token) => {
    try {
      const response = await this.instance.get(
        `/${platform}/view?ad_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return {
        status: err.request.status || 400,
        defaultError: err.message,
        error: err.response?.data?.message,
        isAuth: err.response?.data?.is_authenticated,
      };
    }
  };

  getAllStats = async (platform) => {
    try {
      const response = await this.instance.get(`/${platform}/cards-count`);
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

  addNewPost = async (platform, addPostDetails) => {
    try {
      const response = await this.instance.post(
        `/${platform}/create`,
        addPostDetails
      );
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

  updateResponse = async (platform, adResponseDetails) => {
    try {
      const response = await this.instance.post(
        `/${platform}/save-response`,
        adResponseDetails
      );
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

  postVisibility = async (platform, status, id) => {
    try {
      const response = await this.instance.post(
        `/${platform}/visibility?ad_id=${id}`,
        { visibility_status: status }
      );
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

  //Individual methods of each section

  updateTitle = async (adResponseDetails) => {
    try {
      const response = await this.instance.post(
        `/custom-doc/save-title`,
        adResponseDetails
      );
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
}
