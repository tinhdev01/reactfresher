import { Badge, Descriptions, Divider, Drawer, Image, Modal, Upload } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
import { v4 as uuidv4 } from 'uuid';

const BooksDetail = (props) => {
    const { openDetail, setOpenDetail, dataDetail, setDataDetail } = props;
    const [previewTitle, setPreviewTitle] = useState(null)
    const [previewOpenModel, setPreviewOpenModel] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (dataDetail) {
            let imgthumbnail = {}, imgSlider = [];
            imgthumbnail = {
                uid: uuidv4(),
                name: dataDetail.thumbnail,
                status: 'done',
                url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`,
            }
            dataDetail.slider.map(item => {
                imgSlider.push({
                    uid: uuidv4(),
                    name: item,
                    status: 'done',
                    url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                })
            })

            setFileList([imgthumbnail, ...imgSlider])
        }
    }, [dataDetail])
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewTitle(file.name);
        setPreviewOpenModel(true)
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    return (
        <Drawer width={"60%"} title="Basic Drawer" onClose={() => {
            setOpenDetail(false)
            setDataDetail(null)
        }}
            open={openDetail} >
            {
                dataDetail !== null ?
                    <>
                        <Descriptions title="Books Detail" column={2} bordered
                        >
                            <Descriptions.Item label="Id">{dataDetail._id}</Descriptions.Item>
                            <Descriptions.Item label="Tên sách">{dataDetail.mainText}</Descriptions.Item>
                            <Descriptions.Item label="Tác giả">{dataDetail.author}</Descriptions.Item>
                            <Descriptions.Item label="Giá tiền">{dataDetail.price}</Descriptions.Item>
                            <Descriptions.Item label="Thể loại" span={2}> <Badge status="processing" text="Running" />{dataDetail.category}</Descriptions.Item>
                            <Descriptions.Item label="createdAt">{moment(dataDetail.createdAt).format('DD/MM/YYYY HH:mm:ss')}</Descriptions.Item>
                            <Descriptions.Item label="updatedAt">{moment(dataDetail.updatedAt).format('DD/MM/YYYY HH:mm:ss')}</Descriptions.Item>
                        </Descriptions >
                        <Divider orientation="left">Ảnh books</Divider>

                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            showUploadList={{
                                showRemoveIcon: false
                            }}
                        >

                        </Upload>
                        <Modal open={previewOpenModel} title={previewTitle} footer={null} onCancel={() => { setPreviewOpenModel(false) }}>
                            <img width={"100%"} src={`${previewImage}`} alt="" />
                        </Modal>
                    </>
                    :
                    <>
                        Không có dữ liệu
                    </>
            }
        </Drawer >
    )
}
export default BooksDetail;