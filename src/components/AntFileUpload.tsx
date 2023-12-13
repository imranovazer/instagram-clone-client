import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import ImgCrop from "antd-img-crop";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

interface fileUploadProps {
  file?: UploadFile;
  setFile: any;
  preview?: string;
}

const AntFileUpload: React.FC<fileUploadProps> = ({ setFile, preview }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(preview);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    setLoading(true);
    setFile(info.file.originFileObj);
    // Get this url from response in real world.
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader dark:text-white "
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          // beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <div className="rounded-full flex   w-[100px] h-[100px] overflow-hidden">
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            </div>
          ) : (
            uploadButton
          )}
        </Upload>
      </ImgCrop>
    </>
  );
};

export default AntFileUpload;
