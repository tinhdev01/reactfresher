import { Button, Form, Input, message } from "antd";
import { ChangePasssAccount } from "../../services/axios.api";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AccountNewPass = () => {
    const [form] = Form.useForm();
    const user = useSelector(state => state.account.user)
    const email = user.email;
    useEffect(() => {
        form.setFieldValue("email", email)
    }, [])
    const onFinish = async (values) => {
        const { email, oldpass, newpass } = values;
        const res = await ChangePasssAccount(email, oldpass, newpass)
        if (res?.data) {
            message.success("Cập nhật mật khẩu thành công")
            form.setFieldValue("oldpass", "")
            form.setFieldValue("newpass", "")

        }
        else {
            message.error(res.message)
        }
    };
    return (
        <>
            <Form
                name="form-basic"
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu hiện tại"
                    name="oldpass"
                    rules={[
                        {
                            required: true,
                            message: 'Mật khẩu cũ không được bỏ trống!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mật khẩu mới"
                    name="newpass"
                    rules={[
                        {
                            required: true,
                            message: 'Mật khẩu mới không được bỏ trống!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
export default AccountNewPass