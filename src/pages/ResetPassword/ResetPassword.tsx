import { useState, useEffect } from "react";

import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Form, Input } from "antd";
import AuthButton from "../../components/AuthButton";
import { useAppDispatch } from "../../redux/store/hooks";
import { displayAlert } from "../../redux/reducers/alertSlice";
import axiosInstance from "../../axios";

import useLoading from "../../hooks/useLoading";
import Loading from "../../components/Loading";
import AuthorizationLayout from "../../components/AuthorizationLayout";

type FieldType = {
  password?: string;
  passwordConfirm?: string;
};
function ResetPassword() {
  const navigate = useNavigate();
  const onFinishFailed = () => {
    dispatch(displayAlert({ type: false, title: "Please fill all data" }));
  };
  const { token } = useParams();
  const [state, setState] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  const [chechkToken] = useLoading({
    callback: async () => {
      await axiosInstance.post(`/auth/check-reset-token/${token}`);

      setState(true);
      setLoading(false);
    },
    onError: () => {
      setState(false);
      setLoading(false);
      // navigate("/");
    },
  });
  useEffect(() => {
    chechkToken(1);
  }, []);

  const [registerRequest, isReqisterRequstLoading] = useLoading({
    callback: async (values: any) => {
      await axiosInstance.patch(`/auth/reset-password/${token}`, values);
      dispatch(
        displayAlert({
          type: true,
          title: "Your password changed successfully",
        })
      );
      navigate("/login");
    },
    onError: () => {
      dispatch(
        displayAlert({ type: false, title: "Unable to change password" })
      );
    },
  });

  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {
    registerRequest(values);
  };

  return loading ? (
    <Loading />
  ) : state ? (
    <AuthorizationLayout login={true}>
      <p className="mb-6">Change your password</p>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={
          {
            //span: 16,
          }
        }
        style={{
          width: "100%",

          //maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
          ]}
        >
          <Input.Password placeholder="Confirm password" />
        </Form.Item>

        <Form.Item>
          <AuthButton
            text={isReqisterRequstLoading ? "Processing..." : "Confirm "}
          />
        </Form.Item>
      </Form>
    </AuthorizationLayout>
  ) : (
    <Navigate to="/" />
  );
}

export default ResetPassword;
