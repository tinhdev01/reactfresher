import { DeleteOutlined, EditOutlined, ExportOutlined, FileAddOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, message, notification, Popconfirm, Table } from "antd";
import moment from "moment";
import BooksDetail from "./books.detail";
import { useState } from "react";
import BooksCreate from "./books.create";
import BooksUpdate from "./books.update";
import { DeleteBook } from "../../../services/axios.api";
import * as XLSX from 'xlsx';

const BooksTable = (props) => {
    const {
        dataBooks, total, setCurrent,
        setPageSize, pageSize, current,
        FetchBooks
    } = props;
    const [openDetail, setOpenDetail] = useState(false)
    const [openModalCreate, setOpenModalCreate] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [dataDetail, setDataDetail] = useState(null)
    const confirm = async (id) => {
        const res = await DeleteBook(id)
        if (res?.data) {
            message.success("Xóa phần tử books thành công")
            await FetchBooks()
        }
        else {
            notification.error({
                message: "Delete Books",
                description: <res className="mes"></res>
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
                    <a
                        onClick={() => {
                            setOpenDetail(true)
                            setDataDetail(record)
                        }}
                    >{record._id}</a>
                )
            },
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
            key: 'mainText',
            sorter: true
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            key: 'category',
            sorter: true
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
            sorter: true
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
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
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => {
                return (
                    <div style={{ width: "100px" }}>
                        <EditOutlined style={{ color: "blue" }}
                            onClick={() => {
                                setOpenModalUpdate(true)
                                setDataDetail(record)
                            }}
                        />
                        <Popconfirm
                            title="Delete Books"
                            description="Bạn có muốn xóa books này không?"
                            onConfirm={() => confirm(record._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <DeleteOutlined style={{ color: "red", margin: "0 10px" }} />
                        </Popconfirm>

                    </div>
                )
            }
        },
    ];
    const onchange = (pagination, filters, sorter, extra) => {
        if (+pagination.current !== current) {
            setCurrent(+pagination.current)
        }

        if (+pagination.pageSize !== pageSize) {
            setPageSize(+pagination.pageSize)
        }
    }
    const handleImport = () => {
        if (dataBooks.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(dataBooks);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportExcel.csv");
        }
    };
    const renderHeader = () => {
        return (
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <div>
                    <h3>Books list</h3>
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            handleImport()
                        }}
                    ><ExportOutlined />Export</Button>
                    <Button
                        type="primary"
                        style={{ margin: "0 15px" }}
                        onClick={() => {
                            setOpenModalCreate(true)
                        }}
                    ><FileAddOutlined />Thêm mới</Button>
                    <Button><ReloadOutlined /></Button>
                </div>
            </div>
        )
    }
    return (
        <>
            <Table
                title={renderHeader}
                columns={columns} rowKey={"_id"}
                dataSource={dataBooks}
                scroll={{
                    x: 'max-content',
                }}
                pagination={{
                    total: total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    pageSize: pageSize,
                    current: current,
                    showSizeChanger: true
                }}
                onChange={onchange}
            />
            <BooksDetail
                setOpenDetail={setOpenDetail}
                openDetail={openDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
            <BooksCreate
                FetchBooks={FetchBooks}
                setOpenModalCreate={setOpenModalCreate}
                openModalCreate={openModalCreate}
            />
            <BooksUpdate
                FetchBooks={FetchBooks}
                setOpenModalUpdate={setOpenModalUpdate}
                openModalUpdate={openModalUpdate}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
        </>

    )
}
export default BooksTable;