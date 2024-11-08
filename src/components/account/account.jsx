import { Modal, Tabs } from "antd";
import AccountUpdate from "./account.update";
import AccountNewPass from "./account.new.pass";

const AccountModal = (props) => {
    const { accountModals, setAccounModals } = props;


    const handleOk = () => {
        setAccounModals(false);
    };
    const handleCancel = () => {
        setAccounModals(false);
    };

    const items = [
        {
            key: 'AccountUpdate',
            label: 'Cập nhật thông tin',
            children: <AccountUpdate />,
        },
        {
            key: 'AccountNewPass',
            label: 'Đổi mật khẩu',
            children: <AccountNewPass />,
        },
    ];

    return (
        <>
            <Modal footer={null} width={"60%"} title="Quản lý tài khoản" open={accountModals} maskClosable={false} onOk={handleOk} onCancel={handleCancel}>
                <Tabs defaultActiveKey="1" items={items} />
            </Modal>
        </>
    )
}
export default AccountModal