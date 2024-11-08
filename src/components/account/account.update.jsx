import { UploadOutlined } from "@ant-design/icons"
import { Avatar, Button, Col, Form, Input, message, notification, Row, Upload } from "antd"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAccount, UploadAvatar } from "../../services/axios.api";
import { doUpdateAccountAction, doUploadAvatarAction } from "../../redux/account/accountSlice";

const AccountUpdate = () => {
    const user = useSelector(state => state.account.user)
    const AvartarEdit = useSelector(state => state.account.tempAvatar)
    const dispatch = useDispatch();
    const userAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`;
    const userAvatarEdit = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${AvartarEdit}`;
    const [imagePreview, setImagePreview] = useState(user.avatar);
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(user)
    }, [])
    const onFinish = async (values) => {
        const { id, fullName, phone } = values;
        const res = await UpdateAccount(id, fullName, phone, imagePreview)
        if (res?.data) {
            message.success("Cập nhật thành công")
            dispatch(doUpdateAccountAction(res.data))

            localStorage.removeItem("access_token")
        }
        else {
            notification.error({
                message: "Upload Avatar",
                description: res.message
            })
        }
    };
    const handleUploadFileThubnail = async ({ file, onSuccess, onError }) => {
        const resUpload = await UploadAvatar(file);
        if (resUpload?.data) {
            const file = resUpload.data.fileUploaded;
            setImagePreview(file)
            dispatch(doUploadAvatarAction(file))
        }
        else {
            notification.error({
                message: "Upload Avatar",
                description: resUpload.message
            })
        }
    }
    return (
        <Row>
            <Col span={12}>
                <div>
                    <Avatar size={100} src={AvartarEdit === undefined ? userAvatar : userAvatarEdit} />
                </div>
                <Upload
                    fileList={[]}
                    maxCount={1}
                    multiple={false}
                    customRequest={handleUploadFileThubnail}
                >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Col>
            <Col span={12}>
                <Form
                    form={form}
                    name="form-basic"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label="Id"
                        name="id"
                        hidden
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Tên hiển thị"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Tên hiển thị không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Số điện thoại không được bỏ trống!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
export default AccountUpdate