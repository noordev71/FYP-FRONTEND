"use client"
import { toast } from "react-toastify";
import { SettingsAdapter } from "../../adapter/settings.adapter";
import { UploadAdapter } from "../../adapter/upload.adapter";
import Cookies from "universal-cookie";

const useSettings = () => {

    const cookie = new Cookies()
    const token = cookie.get('token')

    const getUserProfileSettings = async () => {
        const settingsAdapter = new SettingsAdapter(process.env.NEXT_PUBLIC_API_URL, token);
        const response = await settingsAdapter.getProfileSettingsData();
        if (response.error || response.defaultError) {
            const loggedError = response.error || response.defaultError;
            toast.error(loggedError);
            return { ...response, error: loggedError }
        }
        return response
    }

    const updateUserProfileSettings = async (updateProfiledData) => {
        const settingsAdapter = new SettingsAdapter(process.env.NEXT_PUBLIC_API_URL, token);
        const response = await settingsAdapter.updateProfileSettings(updateProfiledData);
        if (response.error || response.defaultError) {
            const loggedError = response.error || response.defaultError;
            toast.error(loggedError);
            return { ...response, error: loggedError }
        }
        return response

    }

    const updateUserProfilePicture = async (profilePictureFormData) => {
        const uploadAdapter = new UploadAdapter(process.env.NEXT_PUBLIC_API_URL, token);
        const response = await uploadAdapter.updateProfilePicture(profilePictureFormData);
        if (response.error || response.defaultError) {
            const loggedError = response.error || response.defaultError;
            toast.error(loggedError);
            return { ...response, error: loggedError }
        }
        return response

    }

    const checkIfUserValidated = async () => {
        const settingsAdapter = new SettingsAdapter(process.env.NEXT_PUBLIC_API_URL, token);
        const response = await settingsAdapter.isUserValidated();
        if (response.error || response.defaultError) {
            const loggedError = response.error || response.defaultError;
            toast.error(loggedError);
            return { ...response, error: loggedError }
        }
        return {...response, status: 200}

    }


    return { getUserProfileSettings, updateUserProfileSettings, updateUserProfilePicture, checkIfUserValidated }
}
export default useSettings;