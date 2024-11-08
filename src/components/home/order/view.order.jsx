import { DeleteOutlined } from "@ant-design/icons";
import { Col, Divider, Empty, InputNumber, Row } from "antd";
import './styles.scss'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { doDeleteBookAction, doUpdateBookAction } from "../../../redux/order/orderSlice";

const ViewOrder = (props) => {
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
                        <div className="provisional-price">
                            <p>Tạm tính</p>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumOrder)}
                        </div>
                        <Divider />
                        <div className="sum-price-product">
                            <p>Tổng tiền</p>
                            <span> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumOrder)}</span>
                        </div>
                        <Divider />
                        <div className="btn-buy-order">
                            <button onClick={() => setCurrent(1)}>Mua Hàng({carts.length})</button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div >

    )
}

export default ViewOrder