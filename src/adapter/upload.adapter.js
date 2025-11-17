import axios from "axios";


export class UploadAdapter {
    instance;
    constructor(baseURL, token) {
        this.instance = axios.create({
            baseURL: baseURL,
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            timeout: 15000,
            timeoutErrorMessage: "Request timed out",
        });
    }

    updateProfilePicture = async (profilePictureFormData) => {
        try {
            const response = await this.instance.post("/settings/upload-image", profilePictureFormData);
            return response.data;
        }
        catch (err) {
            console.error(err);
            return { status: err.status || 400, defaultError: err.message, error: err.response?.data?.message };
        }
    }
}