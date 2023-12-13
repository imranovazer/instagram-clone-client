import { Alert } from "antd";
import { useAppDispatch } from "../../../redux/store/hooks";
import { useEffect } from "react";
import { closeAlert } from "../../../redux/reducers/alertSlice";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{
        opacity: 0,
        x: 100,
      }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", duration: 1, bounce: 0.4 }}
      className="fixed top-3 right-3   z-50"
    >
      <Alert
        className="min-w-[250px]"
        message={type ? "Success" : "Error"}
        description={title}
        type={type ? "success" : "error"}
        showIcon
      />
    </motion.div>
  );
}

export default MyAlert;
