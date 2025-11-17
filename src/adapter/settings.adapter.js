import axios from "axios";


export class SettingsAdapter {
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

    updateProfileSettings = async (profileDetails) => {
        try {
            const response = await this.instance.post("/settings/update-user-details", profileDetails);
            return response.data;
        }
        catch (err) {
            console.error(err);
            return { status: err.status || 400, defaultError: err.message, error: err.response?.data?.message };
        }
    }

    getProfileSettingsData = async () => {
        try {
            const response = await this.instance.get("/settings/view-user-details");
            return response.data;
        }
        catch (err) {
            console.error(err);
            return { status: err.status || 400, defaultError: err.message, error: err.response?.data?.message };
        }
    }

    isUserValidated = async () => {
        try {
            const response = await this.instance.get("/settings/user-validated");
            return response.data;
        }
        catch (err) {
            console.error(err);
            return { status: err.status || 400, defaultError: err.message, error: err.response?.data?.message };
        }
    }

}