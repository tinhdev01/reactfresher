import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import {
    BookFilled,
    DashboardFilled,
    DownOutlined,
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    OrderedListOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, Space } from 'antd';
import Footer from "../../home/layout/footer";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogoutAccountAPI } from "../../../services/axios.api";
import { doLogoutAccountAction } from "../../../redux/account/accountSlice";
const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {

    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const user = useSelector(state => state.account.user)
    const userAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`;
    const userRole = user.role;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //lấy giá trị key active menu
    const lastPart = location.pathname.split('/').filter(Boolean).pop();

    const items = [
        {
            key: 'admin',
            icon: <DashboardFilled />,
            label: <NavLink to={"/admin"}>Dashboard</NavLink>,
        },
        {
            key: 'users',
            icon: <UserOutlined />,
            label: 'Manage Users',
            children: [
                {
                    label: <NavLink to={"/admin/users"}>CRUD</NavLink>,
                    key: "users",
                    icon: <TeamOutlined />
                }
            ],
        },
        {
            key: 'books',
            icon: <BookFilled />,
            label: <NavLink to={"/admin/books"}>Manage Books</NavLink>,
        },
        {
            key: 'orders',
            icon: <OrderedListOutlined />,
            label: <NavLink to={"/admin/orders"}>Manage Orders</NavLink>,
        }
    ];
    const itemsDrop = [
        {
            key: 'home',
            label: <Link to={"/"}>Trang Chủ</Link>,
            icon: <HomeOutlined />
        },
        {
            key: 'logut',
            label: <span onClick={() => { AccountLogin() }}>Đăng Xuất</span>,
            icon: <LogoutOutlined />
        }
    ]

    const AccountLogin = async () => {
        const res = await LogoutAccountAPI()
        localStorage.removeItem("access_token")
        dispatch(doLogoutAccountAction())
        navigate("/login")
    }

    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            {isAdminRoute && userRole === "ADMIN" &&
                <Layout>
                    <Sider trigger={null}
                        collapsed={collapsed}
                        style={{
                            background: "#fff",
                        }}
                    >
                        <h2 style={{ color: "#ccc", padding: "10%", textAlign: "center" }}> Admin</h2>
                        <Menu
                            theme="light"
                            mode="inline"
                            selectedKeys={lastPart}
                            items={items}
                            style={{ minHeight: "100vh" }}
                        />
                    </Sider>
                    <Layout>
                        <Header
                            style={{
                                padding: 0,
                                background: "none",
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            <div style={{ padding: "10px" }}>
                                <Dropdown
                                    menu={{ items: itemsDrop }}
                                    trigger={['click']}
                                >
                                    <Space>
                                        <Avatar
                                            size={40}
                                            src={userAvatar}
                                        />
                                        {user.fullName}
                                        <DownOutlined />
                                    </Space>
                                </Dropdown>
                            </div>
                        </Header>
                        <Content>
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            }
            {isAdminRoute && userRole !== "ADMIN" && <Outlet />}
            {isAdminRoute && userRole === "ADMIN" && <Footer />}
        </>

    )
}
export default LayoutAdmin;