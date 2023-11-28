import React from "react";
import { Space, Spin } from "antd";

const Loading: React.FC = () => (
  <div className="w-full h-screen flex items-center dark:bg-slate-900 justify-center text-black">
    <Space size="middle">
      <Spin size="large" />
    </Space>
  </div>
);

export const ContainerLoading: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center ">
    <Space size="middle">
      <Spin size="large" />
    </Space>
  </div>
);

export default Loading;
