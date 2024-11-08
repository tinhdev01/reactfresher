import { Col, Divider, Form, Image, Input, InputNumber, message, Modal, notification, Row, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { CreateBooksApi, Getcategory, UploadIMGAPI } from "../../../services/axios.api";
import { PlusOutlined } from "@ant-design/icons";
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const BooksCreate = (props) => {
    const { openModalCreate, setOpenModalCreate, FetchBooks } = props;
    const [form] = Form.useForm();
    const [listCategory, setListCategory] = useState(null)
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [imageTitle, setImageTitle] = useState(null);
    const [dataThumbnail, setDataThumbnail] = useState([]);
    const [dataSlider, setDataSlider] = useState([]);

    useEffect(() => {
        if (listCategory === null) {
            GetListCategory();
        }
    }, [])
    const GetListCategory = async () => {
        const res = await Getcategory()
        if (res?.data) {
            const d = res.data.map(item => {
                return { value: item, label: item }
            })
            setListCategory(d)
        }
    }
    const onFinish = async (values) => {
        if (dataThumbnail.length === 0) {
            notification.error({
                message: "Upload Thumbnail",
                description: "Thumbnail không được bỏ trống"
            })
            return
        }
        if (dataSlider.length === 0) {
            notification.error({
                message: "Upload Slider",
                description: "Slider không được bỏ trống"
            })
            return
        }
        const { mainText, author, price, sold, quantity, category } = values;
        const thumbnail = dataThumbnail[0].name;
        const slider = dataSlider.map(item => item.name)
        const res = await CreateBooksApi(thumbnail, slider, mainText, author, price, sold, quantity, category);
        if (res?.data) {
            message.success("Tạo mới book thành công");
            HandleCancel();
            await FetchBooks()
        }
        else {
            notification.error({
                message: "Create Books",
                description: res.message
            })
        }
    }

    const handleUploadFileThubnail = async ({ file, onSuccess, onError }) => {
        const res = await UploadIMGAPI(file)
        if (res && res.data) {
            setDataThumbnail([
                {
                    name: res.data.fileUploaded,
                    uid: file.uid
                }
            ])
            onSuccess("ok")
        }
        else {
            onError("Upload ảnh xẩy ra lỗi")
        }
    }
    const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
        const res = await UploadIMGAPI(file)
        if (res && res.data) {
            setDataSlider((dataSlider) => [...dataSlider,
            {
                name: res.data.fileUploaded,
                uid: file.uid
            }
            ])
            onSuccess("ok")
        }
        else {
            onError("Upload ảnh xẩy ra lỗi")
        }
    }

    const handlePreviewThumbnail = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setImageTitle(file.name)
        setPreviewOpen(true);
    };

    const handlePreviewSlider = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setImageTitle(file.name)
        setPreviewOpen(true);
    };
    const onRemoveThumbnail = (info, type) => {
        if (type === "thumbnail") {
            setDataThumbnail([])
        }
        if (type === 'slider') {
            const newSlider = dataSlider.filter(x => x.uid !== info.uid);
            setDataSlider(newSlider)

        }
    }
    const HandleCancel = () => {
        setOpenModalCreate(false)
        form.resetFields()
        setDataSlider([])
        setDataThumbnail([])
    }
    return (
        <>
            <Modal title="Basic Modal" open={openModalCreate} width={"60%"}
                onOk={() => form.submit()}
                onCancel={HandleCancel}>
                <Divider />
                <Form
                    form={form}
                    name="form-basic"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Row span={24} style={{ gap: "2%" }}>
                        <Col span={12}>
                            <Form.Item
                                name="mainText"
                                label="Tên sách"
                                rules={[
                                    {
                                        message: "Tên sách không được bỏ trống!",
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name="author"
                                label="Tác giả"
                                rules={[
                                    {
                                        message: "Tác giả không được bỏ trống!",
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="price"
                                label="Giá tiền"
                                rules={[
                                    {
                                        message: "Tiền không được bỏ trống!",
                                        required: true,
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }} addonAfter={"VNĐ"} />
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item
                                name="category"
                                label="Thể loại"
                                rules={[
                                    {
                                        message: "Thể loại không được bỏ trống!",
                                        required: true,
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Mời bạn chọn thể loại"
                                    optionFilterProp="label"
                                    options={listCategory}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="quantity"
                                label="Số lượng"
                                rules={[
                                    {
                                        message: "Số lượng không được bỏ trống!",
                                        required: true,
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="sold"
                                label="Đã bán"
                                rules={[
                                    {
                                        message: "Đã bán không được bỏ trống!",
                                        required: true,
                                    },
                                ]}

                            >
                                <InputNumber style={{ width: '100%' }} defaultValue={0} />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name="thumbnail"
                                label="Ảnh thumbnail"
                            >
                                <Upload
                                    name="thumbnail"
                                    listType="picture-card"
                                    onPreview={handlePreviewThumbnail}
                                    maxCount={1}
                                    customRequest={handleUploadFileThubnail}
                                    multiple={false}
                                    onRemove={(info) => onRemoveThumbnail(info, 'thumbnail')}
                                >
                                    <div
                                        style={{
                                            border: 0,
                                            background: 'none',
                                        }}
                                    >
                                        <PlusOutlined />
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name="slider"
                                label="Ảnh slider"
                            >
                                <Upload
                                    name="slider"
                                    listType="picture-card"
                                    onPreview={handlePreviewSlider}
                                    customRequest={handleUploadFileSlider}
                                    multiple={true}
                                    onRemove={(info) => onRemoveThumbnail(info, 'slider')}
                                >
                                    <div
                                        style={{
                                            border: 0,
                                            background: 'none',
                                        }}
                                    >
                                        <PlusOutlined />
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </div>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
            <Modal open={previewOpen} onCancel={() => setPreviewOpen(false)}
                footer={false} title={imageTitle}
            >
                <Image src={previewImage} />
            </Modal>
        </>
    )
}
export default BooksCreate;