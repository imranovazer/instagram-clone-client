import { Link } from "react-router-dom";
import { Form, Input } from "antd";
import AuthButton from "../../components/AuthButton";
import { useAppDispatch } from "../../redux/store/hooks";
import { displayAlert } from "../../redux/reducers/alertSlice";
import axiosInstance from "../../axios";
import useLoading from "../../hooks/useLoading";
import AuthorizationLayout from "../../components/AuthorizationLayout";
type FieldType = {
  email?: string;
};
function ForgotPass() {
  const [loginRequest, isLoadingLoginRequest] = useLoading({
    callback: async (values: any) => {
      await await axiosInstance.post("/auth/forgot-password", values);
      dispatch(
        displayAlert({
          type: true,
          title: "Link to reset password sent to your email",
        })
      );
    },
    onError: (error) => {
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
    loginRequest(values);
  };

  return (
    <AuthorizationLayout login={true}>
      <p className="mb-6">
        Enter the email associated with your acoount and we'll send you a link
        to reset your password
      </p>
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

        <Form.Item>
          <AuthButton
            text={isLoadingLoginRequest ? "Processing..." : "Send "}
          />
        </Form.Item>
      </Form>
    </AuthorizationLayout>
  );
}

export default ForgotPass;
