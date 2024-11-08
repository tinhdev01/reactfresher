import { Button, Divider, Form, Input, message, notification } from "antd"
import { Link, useNavigate } from "react-router-dom";
import { LoginApi } from "../services/axios.api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../redux/account/accountSlice";

const LoginPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        setIsLoading(true)
        const { fullName, password } = values;
        const res = await LoginApi(fullName, password)
        if (res?.data) {
            dispatch(doLoginAction(res.data.user))
            localStorage.setItem("access_token", res.data.access_token)
            message.success("Đăng nhập thành công")
            navigate('/')
        }
        else {
            notification.error({
                message: "Login",
                description: res.message
            })
        }
        setIsLoading(false)
    }

    return (
        <Form
            form={form}
            name="login"
            layout="vertical"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
                margin: "50px auto",
                padding: "10px"
            }}
        >
            <h2 style={{ textAlign: "center", fontSize: "30px" }}>Đăng nhập tài khoản</h2>
            <Divider />
            <Form.Item
                label="FullName"
                name="fullName"
                rules={[
                    {
                        message: "FullName không được bỏ trống!",
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        message: "Password không được bỏ trống!",
                        required: true,
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button loading={isLoading} type="primary" onClick={() => form.submit()}>Login</Button>
            </Form.Item>
            <Divider>Or</Divider>
            <div>
                <span>Bạn chưa có tài khoản: <Link to={"/register"}>Đăng Ký</Link></span>
            </div>
        </Form>
    )
}
export default LoginPage;