import { Card, Space, Statistic } from "antd";
import { useEffect, useState } from "react";
import { FetchDataDashBoard } from "../../../services/axios.api";
import CountUp from "react-countup";

const Dashboard = () => {

    const [dataDashboard, setDataDashboard] = useState({
        countOrder: 0,
        countUser: 0
    })

    useEffect(() => {
        const initDashboard = async () => {
            const res = await FetchDataDashBoard();
            setDataDashboard(res.data)
        }
        initDashboard();
    }, [])
    const formatter = (value) => <CountUp end={value} />;
    return (
        <Space direction="horizontal" size={16} style={{ padding: "10px" }}>
            <Card
                style={{
                    width: 400,
                }}
            >
                <Statistic title="Tổng users" value={dataDashboard.countUser} formatter={formatter} />
            </Card>
            <Card
                style={{
                    width: 400,
                }}
            >
                <Statistic title="Tổng Đơn hàng" value={dataDashboard.countOrder} formatter={formatter} />
            </Card>
        </Space>
    )
}
export default Dashboard;