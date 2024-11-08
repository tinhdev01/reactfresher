import { useEffect, useState } from 'react';
import ReactJson from 'react-json-view'
import { historyOrder } from '../../../services/axios.api';
import { Table, Tag } from 'antd';
import moment from 'moment';

const History = () => {
    const [data, setData] = useState(null)


    useEffect(() => {
        fetchhistory();
    }, [])
    const fetchhistory = async () => {
        const res = await historyOrder()
        if (res?.data) {
            const a = res.data.map((item, index) => {
                return (
                    { stt: index + 1, updatedAt: item.updatedAt, totalPrice: item.totalPrice, tag: "Thành công", history: <ReactJson enableClipboard={false} displayObjectSize={false} displayDataTypes={false} name="Chi tiết hóa đơn" src={item.detail} collapsed={true} /> }
                )
            })
            setData(a)
        }
    }
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Thời gian',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (_, record) => {
                return moment(record.updatedAt).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (_, record) => (
                new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.totalPrice)
            ),
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'tag',
            key: 'tag',
            render: (_, record) => (
                <Tag color="green" style={{ padding: "10px" }}>{record.tag}</Tag>
            ),
        },
        {
            title: 'Chi tiết',
            dataIndex: 'history',
            key: 'history',
        },
    ];

    return (
        <>
            <Table dataSource={data} columns={columns} rowKey={"stt"} />
        </>
    )
}
export default History;