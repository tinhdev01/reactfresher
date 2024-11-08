import { Form, Input, Modal, notification } from "antd"
import { CreateUserAPI } from "../../../services/axios.api";

const UserCreateModal = (props) => {
    const { openModal, setOpenModal, fetchDataUser } = props;
    const [form] = Form.useForm();
    const handleCancel = () => {
        setOpenModal(false)
        form.resetFields();
    }
    const onFinish = async (values) => {
        const { fullName, email, password, phone } = values
        const res = await CreateUserAPI(fullName, email, password, phone);
        if (res?.data) {
            notification.success({
                message: "Create",
                description: "Tạo mới người dùng thành công"
            })
            fetchDataUser();
            handleCancel();
        }
        else {
            notification.error({
                message: "Create",
                description: res.message
            })
        }
    }
    return (
        <Modal title="Basic Modal" open={openModal} onOk={() => form.submit()} onCancel={handleCancel}>
            <Form
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    name="fullName"
                    label="Tên hiển thị"
                    rules={[
                        {
                            message: "Không được bỏ trống tên hiển thị!",
                            required: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            message: "Không được bỏ trống Password!",
                            required: true,
                        },
                    ]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            message: "Không được bỏ trống Email!",
                            required: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        {
                            message: "Không được bỏ trống số điện thoại!",
                            required: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default UserCreateModal