import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Empty, Form, Input, InputNumber, message, notification, Radio, Row } from "antd";
import './styles.scss'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { doDeleteBookAction, dodropBookAction, doUpdateBookAction } from "../../../redux/order/orderSlice";
import { CreateOrder } from "../../../services/axios.api";

const PayOrder = (props) => {
    const [form] = Form.useForm();
    const { setCurrent } = props;
    const dispatch = useDispatch()
    const carts = useSelector(state => state.order.carts)
    const [sumOrder, setSumOrder] = useState(null)

    useEffect(() => {
        if (carts?.length > 0) {
            let t = 0;
            carts.map(item => {
                t += item.quantity * item.detail.price
            })
            setSumOrder(t);
        }
        else {
            setSumOrder(0)
        }
    }, [carts])
    const hanldeInput = (value, book) => {
        if (!value || value < 1) return;

        if (!isNaN(value)) {
            dispatch(doUpdateBookAction({ quantity: value, detail: book, _id: book._id }))
        }
    }
    const onFinish = async (values) => {
        const { username, phone, address } = values;
        const t = carts.map(item => {
            return ({
                "bookName": item.detail.mainText,
                "quantity": item.quantity,
                "_id": item._id
            })
        })
        const data = {
            "name": username,
            "address": address,
            "phone": phone,
            "totalPrice": sumOrder,
            "detail": t
        }

        const res = await CreateOrder(data)
        if (res?.data) {
            message.success("Đặt hàng thành công")
            dispatch(dodropBookAction())
            setCurrent(2)
        }
        else {
            notification.error(
                {
                    message: "Đặt hàng",
                    description: res.message
                }
            )
        }
    }
    return (
        <div className="order-container">
            <Row gutter={20}>
                <Col md={17} sm={24} xs={24}>
                    {
                        carts.length === 0 ?
                            <div>
                                <Empty description={"Giỏ hàng chưa có sản phẩm nào"} />
                            </div>

                            :

                            carts?.map((book, index) => {
                                return (
                                    <div className="col" key={`book-${index}`}>
                                        <div className="image">
                                            <img width={"100%"} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book.detail.thumbnail}`} alt="" />
                                        </div>
                                        <div className="content">
                                            <div className="mainText">
                                                Đại Việt Sử Ký Toàn Thư Trọn Bộ
                                            </div>
                                            <div className="price-quantity">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.detail.price)}
                                                <InputNumber onChange={(value) => { hanldeInput(value, book) }} style={{ width: "50%" }} value={book.quantity} />
                                            </div>
                                        </div>
                                        <div className="order-price-delete">
                                            <div className="sum-price">
                                                Tổng tiền  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumOrder)}
                                            </div>
                                            <div className="del-product">
                                                <DeleteOutlined style={{ color: "red" }}
                                                    onClick={() => dispatch(doDeleteBookAction({ _id: book._id }))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </Col>
                <Col md={7} sm={24} xs={24}>
                    <div className="order-buy">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="username"
                                label="Tên người nhận"
                                rules={[
                                    {
                                        message: "Tên người nhận không được bỏ trống!",
                                        required: true,
                                    },
                                ]}
                                style={{
                                    lineHeight: '10px',
                                }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[
                                    {
                                        message: "Số điện thoại không được bỏ trống!",
                                        required: true,
                                    },
                                ]}
                                style={{
                                    lineHeight: '10px',
                                }}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                label="Địa chỉ"
                                rules={[
                                    {
                                        message: "Địa chỉ không được bỏ trống!",
                                        required: true,
                                    },
                                ]}
                                style={{
                                    lineHeight: '10px',
                                }}
                            >
                                <Input.TextArea rows={3} />
                            </Form.Item>
                            <Form.Item
                                name="pay"
                                label="Hình thức thanh toán"
                                style={{
                                    lineHeight: '10px',
                                }}
                            >
                                <Radio checked={true}>Thanh toán khi nhận hàng</Radio>
                            </Form.Item>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                <p>Tổng tiền</p>
                                <p style={{ fontSize: "20px", color: "rgb(179, 78, 78)" }}>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumOrder)}
                                </p>
                            </div>
                            <Button style={{
                                width: "100%",
                                margin: "10px 0"
                            }}
                                onClick={() => {
                                    form.submit()
                                }}
                                type="primary">Đặt Hàng({carts.length})</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div >

    )
}

export default PayOrder