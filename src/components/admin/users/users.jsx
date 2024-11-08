import { Button, Col, Form, Input, message, notification, Popconfirm, Row, Table } from "antd";
import './users.scss'
import { useEffect, useState } from "react";
import { DeleteUserAPI, fetchUsersAPI } from "../../../services/axios.api";
import { DeleteOutlined, EditOutlined, LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import UserDetail from "./users.detail";
import UserCreateModal from "./user.create.modal";
import moment from "moment";
import UserUpload from "./user.upload";
import * as XLSX from 'xlsx';
import UserUpdate from "./user.update";

const Users = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, SetTotal] = useState(0);
    const [dataTableUsers, setDataTableUsers] = useState([]);
    const [userShow, setUserShow] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [openModalUpload, setOpenModalUpload] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataDetail, setDataDetail] = useState(null)
    const [form] = Form.useForm();
    const [filter, setFilter] = useState('');
    const [sortQuery, setSortQuery] = useState('');


    useEffect(() => {
        fetchDataUser();
    }, [current, pageSize, filter, sortQuery])

    const fetchDataUser = async () => {
        const res = await fetchUsersAPI(`/api/v1/user?current=${current}&pageSize=${pageSize}${filter}${sortQuery}`);
        if (res.data.result.length < 1) {
            setCurrent(current - 1)
        }
        setDataTableUsers(res.data.result)
        SetTotal(res.data.meta.total)
    }

    const onchange = (pagination, filters, sorter, extra) => {
        if (+pagination.current !== current) {
            setCurrent(+pagination.current)
        }


        if (+pagination.pageSize !== pageSize) {
            setPageSize(+pagination.pageSize)
        }

        if (sorter && sorter.field) {
            const q = sorter.order === "ascend" ? `&sort=${sorter.field}` : `&sort=-${sorter.field}`
            setSortQuery(q)
        }

    }
    const handleSearch = async (values) => {
        const { email, name, phone } = values;
        let query = '';
        if (name) {
            query += `&fullName=/${name}/i`;
        }

        if (email) {
            query += `&email=/${email}/i`;
        }

        if (phone) {
            query += `&phone=/${phone}/i`;
        }
        if (query !== '') {
            setFilter(query)
        }
    }

    const handleImport = () => {
        if (dataTableUsers.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(dataTableUsers);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportExcel.csv");
        }
    };

    const confirm = async (_id) => {
        const res = await DeleteUserAPI(_id)
        if (res?.data) {
            message.success("Xóa user thành công")
            fetchDataUser();
        }
        else {
            notification.error({
                message: "Delete User",
                description: res.message
            })
        }
    }

    const renderHeader = () => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    Table List Users
                </div>
                <div style={{ gap: "10px", display: "flex" }}>
                    <Button type="primary"
                        onClick={handleImport}
                    >Export</Button>
                    <Button type="primary"
                        onClick={() => {
                            setOpenModalUpload(true)
                        }}
                    >Import</Button>
                    <Button type="primary"
                        onClick={() => {
                            setOpenModal(true)
                        }}
                    >Thêm Mới</Button>
                    <Button type="primary"
                        onClick={() => {
                            setSortQuery('')
                            form.resetFields()
                        }}
                    ><ReloadOutlined /></Button>
                </div>
            </div>
        )
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            render: (text, record) => {
                return (
                    <a onClick={() => {
                        setUserShow(true)
                        setDataDetail(record)
                    }}>{record._id}</a>
                )
            },
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: true,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            sorter: true,
        },
        {
            title: 'Ngày được cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            sorter: true,
            render: (text) => {
                return moment(text).format('DD-MM-YYYY HH:mm:ss')
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => {
                return (
                    <div>
                        <EditOutlined style={{ cursor: "pointer", color: "blue" }}
                            onClick={() => {
                                setOpenModalUpdate(true)
                                setDataDetail(record)
                            }
                            }
                        />
                        <Popconfirm
                            title="Delete User"
                            description="Bạn có muốn xóa user này không?"
                            onConfirm={() => confirm(record._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <DeleteOutlined style={{ cursor: "pointer", color: "red", margin: "0 15px" }} />
                        </Popconfirm>

                    </div>
                )
            }
        },
    ];
    return (
        <>
            <div style={{ padding: "20px" }}>
                <Row>
                    <Col span={24}>
                        <div className="form-search">
                            <Form
                                form={form}
                                onFinish={handleSearch}
                                layout="vertical"
                                style={{ width: "100%", gap: "20px", justifyContent: "center", display: "flex" }}
                            >
                                <Form.Item
                                    style={{ width: "30%" }}
                                    name="name"
                                    label="Name"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "30%" }}
                                    name="email"
                                    label="Email"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "30%" }}
                                    name="phone"
                                    label="Số điện thoại"
                                >
                                    <Input />
                                </Form.Item>
                            </Form>
                            <div className="btn-seach">
                                <Button type="primary" onClick={() => { form.submit(); }}>Search</Button>
                                <Button onClick={() => {
                                    form.resetFields()
                                    setFilter('')
                                }}>Clear</Button>
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <Table
                            title={renderHeader}
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
                            className="table-user" columns={columns} rowKey={"_id"} dataSource={dataTableUsers}
                        />
                    </Col>
                </Row>


            </div >
            <UserDetail
                userShow={userShow}
                setUserShow={setUserShow}
                setDataDetail={setDataDetail}
                dataDetail={dataDetail}
            />
            <UserCreateModal
                setOpenModal={setOpenModal}
                openModal={openModal}
                fetchDataUser={fetchDataUser}
            />
            <UserUpload
                setOpenModalUpload={setOpenModalUpload}
                openModalUpload={openModalUpload}
                fetchDataUser={fetchDataUser}
            />
            <UserUpdate
                setOpenModalUpdate={setOpenModalUpdate}
                openModalUpdate={openModalUpdate}
                setDataDetail={setDataDetail}
                dataDetail={dataDetail}
                fetchDataUser={fetchDataUser}
            />
        </>
    )
}
export default Users;