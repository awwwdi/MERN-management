import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
/*import Divider from "../../components/Divider";*/
import { LoginUser } from "../../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetButtonLoading } from "../../redux/loadersSlice";
import { getAntdFormInputRules } from "../../utils/helpers";




function Login() {
  const { buttonLoading } = useSelector((state) => state.loaders);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetButtonLoading(true));
      const response = await LoginUser(values);
      dispatch(SetButtonLoading(false));
      if (response.success) {
        localStorage.setItem("token", response.data);
        message.success(response.message);
        window.location.href = "/";
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetButtonLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="grid grid-cols-2">
      <div className="bg-black h-screen flex flex-col justify-center items-center">
        <div>
          <div className="text-effect">
          <h1 className="text-8xl text-orange-600 text-bold" style={{ fontWeight: 'bold', marginBottom: '10px' }}>Project Trackr</h1>
        </div>
          <span className=" text-2xl text-orange-100 mt-10" style={{ fontWeight: 400 }}>
            One place to track all your project records
          </span>
        </div>
      </div>
      <div className="bg-orange-100 h-screen flex flex-col justify-center items-center">
        <div className="w-[420px]">
          <div className="container">
          <h1 className="text-3xl text-orange-900" style={{ fontWeight: 'bold', textAlign: 'center' }}>LOGIN TO YOUR ACCOUNT</h1>
          <div className="Divider"></div>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              rules={getAntdFormInputRules}>
              <Input type="text" id="email" name="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              rules={getAntdFormInputRules}
            >
              <Input type="password" id="password" name="password" placeholder="Enter your password"/>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={buttonLoading}
            >
              {buttonLoading ? "Loading" : "Login"}
            </Button>

            <div className="flex justify-center mt-5">
                Don't have an account? 
                <span className="register-link"><Link to="/register">Register</Link></span>
            </div>
          </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

