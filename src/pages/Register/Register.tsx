import { Form, Input } from "antd";
import AuthButton from "../../components/AuthButton";
import { useAppDispatch } from "../../redux/store/hooks";
import { displayAlert } from "../../redux/reducers/alertSlice";
import axiosInstance from "../../axios";
import { setIsAuth, setUser } from "../../redux/reducers/userSlice";
import useLoading from "../../hooks/useLoading";
import AuthorizationLayout from "../../components/AuthorizationLayout";
import { useState } from "react";
import { Link } from "react-router-dom";

type FieldType = {
  email?: string;
  password?: string;
};
function Register() {
  const [error, setError] = useState("");
  const [loginRequest, isLoadingLoginRequest] = useLoading({
    callback: async (values: any) => {
      const user = await axiosInstance.post("/auth/register", values);

      dispatch(
        displayAlert({ type: true, title: "You registered successfully" })
      );
      dispatch(setUser(user.data.data.user));
      dispatch(setIsAuth(true));
    },
    onError: (error) => {
      setError(error.response.data.message);
      dispatch(
        displayAlert({ type: false, title: error.response.data.message })
      );
    },
  });
  //@ts-ignore
  const onFinishFailed = (errorInfo: any) => {
    dispatch(displayAlert({ type: false, title: "Please fill all data" }));
  };
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    setError("");
    loginRequest(values);
  };

  return (
    <AuthorizationLayout login={false}>
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
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

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
              message: "Please repeat your password!",
            },
          ]}
        >
          <Input.Password placeholder="Confirm password" />
        </Form.Item>

        <Form.Item>
          <AuthButton
            text={isLoadingLoginRequest ? "Processing..." : "Register"}
          />
        </Form.Item>
      </Form>
      {error && <p className="text-red-500">{error}</p>}
      <p>
        Forgot password?{" "}
        <Link to="/forgot-password">
          <span className=" text-blue-700">Restore</span>
        </Link>
      </p>
    </AuthorizationLayout>
  );
}

export default Register;
