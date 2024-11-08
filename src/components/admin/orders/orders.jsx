import { notification, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { FetchOrder } from "../../../services/axios.api";

const Orders = () => {
    const [dataOrder, setDataOrder] = useState(null)
    const [total, setTotal] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    const [current, setCurrent] = useState(1)


    useEffect(() => {
        loadOrder();
    }, [current, pageSize])


    const loadOrder = async () => {
        const res = await FetchOrder(current, pageSize)
        if (res?.data) {
            setTotal(res.data.meta.total)
            setDataOrder(res.data.result)
        }
        else {
            notification.error({
                message: "Fetch Order",
                description: res.message
            })
        }
    }


    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            render: (text, record) => {
                return (
                    <a>{record._id}</a>
                )
            },
        },
        {
            title: 'Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: true,
            render: (text, record) => {
                return (
                    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.totalPrice)
                )
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            sorter: true
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            sorter: true
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            sorter: true,
            render: (_, record) => {
                return moment(record.updatedAt).format('DD-MM-YYYY HH:mm:ss')
            }
        }
    ];


    const onchange = (pagination, filters, sorter, extra) => {
        if (+pagination.current !== current) {
            setCurrent(+pagination.current)
        }

        if (+pagination.pageSize !== pageSize) {
            setPageSize(+pagination.pageSize)
        }
    }

    return (
        <>
            <Table
                scroll={{
                    x: 'max-content',
                }}
                columns={columns} rowKey={"_id"}
                dataSource={dataOrder}
                pagination={{
                    total: total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    pageSize: pageSize,
                    current: current,
                    showSizeChanger: true
                }}
                onChange={onchange}
            />
        </>
    )
}
export default Orders;