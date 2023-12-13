//@ts-nocheck
import { useState } from "react";
import AntFileUpload from "../../components/AntFileUpload";
import type { UploadFile } from "antd/es/upload/interface";
import { useAppSelector } from "../../redux/store/hooks";
import ProfileApi from "./api";
import { setUser } from "../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { displayAlert } from "../../redux/reducers/alertSlice";
import useLoading from "../../hooks/useLoading";

function ProfileSettings() {
  const user = useAppSelector((state) => state.user.user);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [file, setFile] = useState<UploadFile>();
  const dispatch = useDispatch();
  const [preview, setPreview] = useState<string>(
    `${import.meta.env.VITE_USER_IMG}${user.photo}` || ""
  );

  const [updateMyProfile, isLoadingProfile] = useLoading({
    callback: async (id) => {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("username", name);
      formData.append("email", email);
      const newMe = await ProfileApi.updateMe(formData);
      dispatch(setUser(newMe.data.user));
      dispatch(displayAlert({ type: true, title: "User data updated" }));
    },
    onError: () => {
      dispatch(
        displayAlert({ type: false, title: "Unable update user data " })
      );
    },
  });
  const [updateMyPassword, isPasswordLoading] = useLoading({
    callback: async (id) => {
      const data = {
        passwordCurrent: currentPassword,
        password: newPassword,
        passwordConfirm: confirmPassword,
      };

      const newMe = await ProfileApi.updatePassword(data);
      dispatch(setUser(newMe.data.user));
      dispatch(displayAlert({ type: true, title: "Your password chnaged" }));
    },
    onError: () => {
      dispatch(displayAlert({ type: false, title: "Unable change password " }));
    },
  });

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMyPassword(null);
  };
  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMyProfile(null);
  };
  return (
    <div className="w-full">
      <div className="container  mx-auto  p-2 flex flex-col gap-5 ">
        <h1 className="text-3xl  font-bold">Profile settings</h1>

        <AntFileUpload file={file} setFile={setFile} preview={preview} />
        <form className="flex flex-col gap-4" onSubmit={handleProfileUpdate}>
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg max-w-[300px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@gmail.com"
            />
          </div>
          <button className="rounded-[50px] max-w-[150px] transition-all text-white  py-2 px-4 bg-blue-600 hover:bg-blue-700">
            {isLoadingProfile ? "Processing..." : "Save changes"}
          </button>
        </form>

        <hr />

        <h1 className="text-3xl  font-bold">Change password</h1>
        <form className="flex flex-col gap-4" onSubmit={handlePasswordUpdate}>
          <div>
            <label
              htmlFor="currentPasssword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Current password
            </label>
            <input
              value={currentPassword}
              required
              onChange={(e) => setCurrentPassword(e.target.value)}
              type="password"
              id="currentPasssword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Current password"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New password
            </label>
            <input
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              id="newPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg max-w-[300px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="New password"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              id="confirmPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg max-w-[300px] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Confirm password"
            />
          </div>
          <div className="flex justify-end">
            <button className="rounded-[50px] max-w-[150px] transition-all text-white  py-2 px-4 bg-blue-600 hover:bg-blue-700">
              {isPasswordLoading ? "Processing..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileSettings;
