import { Alert } from "antd";
import { useAppDispatch } from "../../../redux/store/hooks";
import { useEffect } from "react";
import { closeAlert } from "../../../redux/reducers/alertSlice";

import "./Alert.scss";
interface MyAlertProps {
  type?: boolean;
  title: string;
}
function MyAlert({ type, title }: MyAlertProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(closeAlert());

      return () => clearTimeout(timeout);
    }, 1500);
  }, []);

  return (
    <div className="fixed top-3 right-3   z-50">
      <Alert
        className="min-w-[250px]"
        message={type ? "Success" : "Error"}
        description={title}
        type={type ? "success" : "error"}
        showIcon
      />
    </div>
  );
}

export default MyAlert;
