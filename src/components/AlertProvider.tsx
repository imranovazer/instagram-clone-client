import { ReactNode } from "react";
import { useAppSelector } from "../redux/store/hooks";
import {
  selectAlertDisplay,
  selectAlertTitle,
  selectAlertType,
} from "../redux/reducers/alertSlice";
import MyAlert from "./ui/Alert/MyAlert";
interface AlertProviderTypes {
  children: ReactNode;
}

function AlertProvider({ children }: AlertProviderTypes) {
  const display = useAppSelector(selectAlertDisplay);
  const type = useAppSelector(selectAlertType);
  const title = useAppSelector(selectAlertTitle);

  return (
    <>
      {children}
      {display ? <MyAlert title={title} type={type} /> : null}
    </>
  );
}

export default AlertProvider;
