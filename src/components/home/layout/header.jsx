import { Avatar, Badge, Button, Divider, Drawer, Dropdown, Form, Input, Popover, Space } from 'antd';
import './layout.scss';
import { FaReact } from "react-icons/fa";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { DownOutlined, LoginOutlined, LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutAccountAPI } from '../../../services/axios.api';
import { doLogoutAccountAction } from '../../../redux/account/accountSlice';
import AccountModal from '../../account/account';
import { useEffect, useState } from 'react';
import logoHome from '../../../assets/logo.png'

const Header = (props) => {
    const { searchTerm, setSearchTerm } = props;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)
    const user = useSelector(state => state.account.user)
    const AvartarEdit = useSelector(state => state.account.tempAvatar)
    const carts = useSelector(state => state.order.carts)
    const userAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`;
    const userAvatarEdit = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${AvartarEdit}`;
    const userRole = user.role;
    const dispatch = useDispatch();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [accountModals, setAccounModals] = useState(false)


    useEffect(() => {
        if (searchTerm === "") {
            form.resetFields()
        }
    }, [searchTerm])

    const AccountLogin = async () => {
        const res = await LogoutAccountAPI()
        localStorage.removeItem("access_token")
        dispatch(doLogoutAccountAction())
    }
    const items = [
        {
            key: 'detail',
            label: <div onClick={() => setAccounModals(true)}> Quản lý tài khoản</div>,
        },
        {
            key: 'history',
            label: <Link to={"/history"}>History</Link>,
        },
        {
            key: 'logut',
            label: <span onClick={() => { AccountLogin() }}>Đăng Xuất</span>,
            icon: <LogoutOutlined />
        }
    ];
    if (userRole === "ADMIN") {
        items.unshift(
            {
                key: 'manage',
                label: <Link to={"/admin"}>Quản trị</Link>,
            },
        )
    }

    const LoginNavLink = () => {
        navigate("/")
    }

    const contentAdd = () => {
        return (
            <div className='show-card'>
                {
                    carts?.map((book, index) => {
                        return (
                            <div className='show-card-row' key={`book-${index}`}>
                                <div className="card-thumbnail">
                                    <img width={"100%"} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book.detail.thumbnail}`} alt="" />
                                </div>
                                <div className='card-content'>
                                    <div className="card-mainText">
                                        {book.detail.mainText}
                                    </div>
                                    <div className="card-price">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.detail.price)}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="show-btn-card">
                    <Button type='primary' onClick={() => {
                        navigate("/order")
                    }}>Xem giỏ hàng</Button>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="page-header__toggle" onClick={() => {
                setOpenDrawer(true)
            }}>☰</div>
            <header>
                <div className="logo">
                    <img src={logoHome} onClick={() => LoginNavLink()} />
                </div>
                <Form form={form} className='search'>
                    <Form.Item name={"searchTerm"} style={{ lineHeight: "80px" }}>
                        <Input placeholder="Bạn tìm gì hôm nay"
                            onChange={(event) => setSearchTerm(`&mainText=/${event.target.value}/i`)}
                            prefix={<MdOutlineScreenSearchDesktop />} />
                    </Form.Item>
                </Form>
                <div className="shop">
                    <Popover content={contentAdd} title="Danh mục giỏ hàng">
                        <Badge count={carts?.length ?? 0} showZero>
                            <Avatar shape="square" size="large">
                                <ShoppingCartOutlined
                                    className='icon-shop'
                                />
                            </Avatar>
                        </Badge>
                    </Popover>

                </div>
                {
                    isAuthenticated === false ?
                        <Link to="/login" className="account">
                            <LoginOutlined />
                            Login
                        </Link>
                        :
                        <Dropdown
                            className="account"
                            menu={{
                                items,
                            }}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    {userRole}
                                    <Avatar
                                        size={40}
                                        src={AvartarEdit === undefined ? userAvatar : userAvatarEdit}
                                    />
                                </Space>
                            </a>
                        </Dropdown>
                }
            </header>
            <Drawer
                title="Menu chức năng"
                placement="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <div style={{ cursor: "pointer" }} onClick={() => setAccounModals(true)}> Quản lý tài khoản</div>
                <Divider />
                <span style={{ cursor: "pointer" }} onClick={() => { AccountLogin() }}>Đăng Xuất</span>
                <Divider />
            </Drawer>
            <AccountModal
                accountModals={accountModals}
                setAccounModals={setAccounModals}
            />
        </>
    )
}
export default Header;