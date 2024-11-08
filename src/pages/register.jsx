import { Button, Divider, Form, Input, notification } from "antd";
import { CreateRegister } from "../services/axios.api";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();


    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values;
        const res = await CreateRegister(fullName, email, password, phone)
        if (res?.data?._id) {
            notification.success({
                message: "Create Register",
                description: "Tạo người dùng thành công!"
            })
            navigate("/login")
        }
        else {
            notification.error({
                message: "Error Create Register",
                description: res.message
            })
        }
    }

    return (
        <Form
            form={form}
            name="register"
            style={{ maxWidth: 600, margin: "50px auto", padding: "10px" }}
            onFinish={onFinish}
            layout="vertical"
        >
            <h2 style={{ textAlign: "center", fontSize: "30px" }}>Đăng ký tài khoản</h2>
            <Divider />
            <Form.Item
                name="fullName"
                label="FulName"
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
                name="email"
                label="Email"
                rules={[
                    {
                        message: "Email không được bỏ trống!",
                        required: true,
                    },
                    {
                        type: "email",
                        message: "Email không đúng định dạng!",
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        message: "Password không được bỏ trống!",
                        required: true,
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone"
                rules={[
                    {
                        message: "Phone không được bỏ trống!",
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={() => form.submit()}>Register</Button>
            </Form.Item>
            <Divider>Or</Divider>
            <div>
                <span>Bạn đã có tài khoản: <Link to={"/login"}>Đăng Nhập</Link></span>
            </div>
        </Form>
    )
}
export default RegisterPage;