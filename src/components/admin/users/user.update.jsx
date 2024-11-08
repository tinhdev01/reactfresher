import { Form, Input, message, Modal } from "antd";
import { useEffect } from "react";
import { CreateUserUpdateAPI } from "../../../services/axios.api";

const UserUpdate = (props) => {
    const { setOpenModalUpdate, openModalUpdate, setDataDetail, dataDetail, fetchDataUser } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (dataDetail) {
            form.setFieldsValue(dataDetail)
        }
    }, [dataDetail])

    const onFinish = async (values) => {
        const { _id, fullName, phone } = values;
        const res = await CreateUserUpdateAPI(_id, fullName, phone)
        if (res?.data) {
            message.success("Cập nhật thành công")
            fetchDataUser();
            setOpenModalUpdate(false)
            setDataDetail(null)
        }
        else {
            message.error("Cập nhật thất bại")
        }


    }
    return (
        <Modal title="Update User Modal" open={openModalUpdate}
            onCancel={() => {
                setOpenModalUpdate(false)
                form.resetFields()
                setDataDetail(null)
            }}
            maskClosable={false}
            onOk={() => form.submit()}
        >
            <Form
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <Form.Item
                    hidden
                    name="_id"
                    label="Id"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>
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
                    name="email"
                    label="Email"
                    rules={[
                        {
                            message: "Không được bỏ trống Email!",
                            required: true,
                        },
                    ]}
                >
                    <Input disabled />
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
export default UserUpdate;