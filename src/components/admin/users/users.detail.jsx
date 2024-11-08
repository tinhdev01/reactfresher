import { Badge, Descriptions, Drawer } from "antd"
import moment from "moment";

const UserDetail = (props) => {
    const { userShow, setUserShow, dataDetail, setDataDetail } = props;
    const onClose = () => {
        setUserShow(false);
        setDataDetail(null)
    };
    return (
        <Drawer width={"50%"} title="User Detail" onClose={onClose} open={userShow}>
            {
                dataDetail === null ?
                    <>
                        Không có dữ liệu
                    </>
                    :
                    <Descriptions title="Thông tin User" bordered column={2}>
                        <Descriptions.Item label="Id">
                            <a>{dataDetail._id}</a>
                        </Descriptions.Item>
                        <Descriptions.Item label="Tên hiển thị">
                            {dataDetail.fullName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {dataDetail.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">
                            {dataDetail.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Role" span={2}>
                            <Badge status="processing" text={dataDetail.role} />
                        </Descriptions.Item>
                        <Descriptions.Item label="createdAt">
                            {moment(dataDetail?.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                        </Descriptions.Item>
                        <Descriptions.Item label="updatedAt">
                            {moment(dataDetail?.updatedAt).format('DD-MM-YYYY HH:mm:ss')}
                        </Descriptions.Item>
                    </Descriptions>
            }
        </Drawer>
    )
}
export default UserDetail;