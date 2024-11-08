import { InboxOutlined } from "@ant-design/icons";
import { message, Modal, notification, Table } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";
import * as XLSX from 'xlsx';
import { CreateUploadUserExcel } from "../../../services/axios.api";
import temp from './temp.xlsx?url'

const UserUpload = (props) => {
    const { setOpenModalUpload, openModalUpload, fetchDataUser } = props;
    const [dataTableUpload, setDataTableUpload] = useState(null)

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok")
        }, 1000)
    }

    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
        //https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv
        customRequest: dummyRequest,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                // console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                const file = info.fileList[0].originFileObj;
                let reader = new FileReader();
                reader.readAsArrayBuffer(file);
                reader.onload = function (e) {
                    let data = new Uint8Array(e.target.result);
                    let workbook = XLSX.read(data, { type: 'array' });

                    // find the name of your sheet in the workbook first
                    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    // convert to json format
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        header: ["fullName", 'email', 'phone'],
                        range: 1
                    });
                    if (jsonData && jsonData.length > 0) setDataTableUpload(jsonData)
                };
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            // console.log('Dropped files', e.dataTransfer.files);
        },
    };
    const hendlCreate = async () => {
        if (dataTableUpload) {
            const dataList = dataTableUpload.map(item => {
                item.password = "123456"
                return item
            })
            const res = await CreateUploadUserExcel(dataList)
            if (res?.data) {
                notification.success({
                    message: "Create",
                    description: `Sussess: ${res.data.countSuccess},Error: ${res.data.countError}`
                })
                setOpenModalUpload(false)
                setDataTableUpload(null)
                fetchDataUser();
            }
            else {
                notification.error({
                    message: "Error Create",
                    description: res.message
                })
            }
        }
    }
    return (
        <Modal width={"50%"} title="Upload User Modal" open={openModalUpload}
            maskClosable={false}
            onOk={hendlCreate}
            onCancel={() => {
                setOpenModalUpload(false)
                setDataTableUpload(null)
            }
            }>
            <Dragger {...propsUpload}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single upload. Only accept .csv, .xls, .xlsx
                    <a href={temp} onClick={(e) => e.stopPropagation()}>Donwload</a>
                </p>
            </Dragger>
            <Table
                title={() => <span>Dữ liệu upload</span>}
                columns={[
                    { dataIndex: 'fullName', title: 'Tên hiển thị' },
                    { dataIndex: 'email', title: 'Email' },
                    { dataIndex: 'phone', title: 'Số điện thoại' },
                ]}
                pagination={false}
                dataSource={dataTableUpload}
            >

            </Table>
        </Modal >
    )
}
export default UserUpload;