import { useState, useRef, ChangeEvent } from "react";
import useSettings from "../settings/useSettings";
import { toast } from "react-toastify";

export const useProfile = () => {
  const {
    getUserProfileSettings,
    updateUserProfileSettings,
    updateUserProfilePicture,
  } = useSettings();

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const getUserDetails = async () => {
    setIsLoading(true);
    let result = await getUserProfileSettings();

    setEmail(result.data.email);
    setIsLoading(false);
  };

  const handleProfileSave = async () => {
    if (newPassword.length > 0) {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
    }
    let data = {
      email,
      old_password: oldPassword,
      new_password: newPassword,
    };
    const response = await updateUserProfileSettings(data);
    if (!response.error) toast.success("User updated");
  };

  return {
    getUserDetails,
    email,
    setEmail,
    newPassword,
    setNewPassword,
    oldPassword,
    setOldPassword,
    handleProfileSave,
    confirmPassword,
    setConfirmPassword,
    isLoading,
  };
};
