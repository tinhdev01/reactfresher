import { Button, Result, Steps } from "antd";
import ViewOrder from "./view.order";
import { useState } from "react";
import PayOrder from "./payOrder";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const OrderProduct = () => {
    const [current, setCurrent] = useState(0)
    const navigate = useNavigate()
    return (
        <div style={{ background: "#ccc", padding: "10px", }}>
            <div style={{ padding: "10px", background: "#fff", borderRadius: "10px" }}>
                <Steps
                    size="small"
                    current={current}
                    status="finish"
                    items={[
                        {
                            title: 'Đơn hàng',
                        },
                        {
                            title: 'Đặt hàng',
                        },
                        {
                            title: 'Thanh toán',
                        },
                    ]}
                />
            </div>
            {
                current === 0 &&
                <ViewOrder setCurrent={setCurrent} />
            }
            {
                current === 1 &&
                <PayOrder setCurrent={setCurrent} />
            }
            {
                current === 2 &&
                <Result
                    icon={<SmileOutlined />}
                    title="Đơn hàng đã được đặt thành công!"
                    extra={<Button type="primary"
                        onClick={() => {
                            navigate("/history")
                        }}
                    >Xem lịch sử</Button>}
                />
            }
        </div>
    )
}
export default OrderProduct;