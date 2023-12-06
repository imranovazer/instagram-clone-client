import React, { useEffect, useState } from "react";
import MyModal from "../../MyModal";
import FileUpload from "../../FileUpload";
import AuthButton from "../../AuthButton";
import useLoading from "../../../hooks/useLoading";
import axiosInstance from "../../../axios";
import { useAppDispatch } from "../../../redux/store/hooks";
import { displayAlert } from "../../../redux/reducers/alertSlice";
import { addMyNewPost } from "../../../redux/reducers/userSlice";
function CreatePostModal({
  active,
  setActive,
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<any>();
  const [imagePreview, setImagePreview] = useState<any>();
  const [description, setDescrpition] = useState("");
  const [postName, setPostName] = useState("");
  const [createPost, createPostLoading] = useLoading({
    callback: async (eveent: any) => {
      eveent.preventDefault();
      const formData = new FormData();
      formData.append("name", postName);
      formData.append("description", description);
      formData.append("photo", file);
      const post = await axiosInstance.post("/post", formData);
      dispatch(addMyNewPost(post.data.data));
      dispatch(displayAlert({ type: true, title: "Post created" }));
      setActive(false);
    },
    onError: (error) => {
      dispatch(
        displayAlert({ type: false, title: error.response.data.message })
      );
    },
  });

  useEffect(() => {
    return () => {
      setFile(null);
      setImagePreview(null);
    };
  }, []);
  return (
    <MyModal active={active} setActive={setActive} heading="Create new post">
      <div className="p-2">
        <form onSubmit={createPost} className="flex flex-col gap-5">
          <input
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            type="text"
            className="p-2 border rounded-lg border-slate-400"
            placeholder="Post title"
          />
          {imagePreview ? (
            <img src={imagePreview} alt="uploaded image" />
          ) : (
            <FileUpload
              file={file}
              setFile={setFile}
              setImagePreview={setImagePreview}
            />
          )}

          <textarea
            value={description}
            onChange={(e) => setDescrpition(e.target.value)}
            className=" resize-none p-2 border rounded-xl border-slate-400"
            name="description"
            placeholder="Description of your post"
            rows={5}
          ></textarea>

          <AuthButton text={createPostLoading ? "Processing..." : "Create"} />
        </form>
      </div>
    </MyModal>
  );
}

export default CreatePostModal;
