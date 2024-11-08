import { Col, Row, Checkbox, Divider, InputNumber, Button, Flex, Rate, Tabs, Pagination, Form } from 'antd';
import './home.scss';
import { FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { CallBooksApi, Getcategory } from '../../services/axios.api';
import { useNavigate, useOutletContext } from 'react-router-dom';



const Home = () => {
    const [category, setCategory] = useState(null)
    const [form] = Form.useForm();
    const [dataProduct, setDataProduct] = useState(null)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [sort, setSort] = useState("&sort=-sold");
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useOutletContext();




    useEffect(() => {
        if (category === null) {
            handleGetCategory();
        }
    }, [])

    useEffect(() => {
        hendleCallAPIProduct();
    }, [current, pageSize, sort, filter, searchTerm])

    const hendleCallAPIProduct = async () => {
        const res = await CallBooksApi(current, pageSize, sort, filter, searchTerm);
        if (res?.data) {
            setDataProduct(res.data.result)
            setTotal(res.data.meta.total)
        }
    }
    const onChange = (checkedValues) => {
        setSort(`&sort=${checkedValues}`)
    };

    const onchangePagination = (pagination) => {
        if (+pagination.current !== current) {
            setCurrent(+pagination.current)
        }
        if (+pagination.pageSize !== pageSize) {
            setPageSize(+pagination.pageSize)
        }
    }

    const handleGetCategory = async () => {
        const res = await Getcategory()
        if (res?.data) {
            const d = res.data.map(item => {
                return (
                    { label: item, value: item }
                )
            })
            setCategory(d)
        }
    }

    const tabItems = [
        {
            key: '-sold',
            label: 'Phổ biến',
            children: <></>,
        },
        {
            key: '-updatedAt',
            label: 'Hàng mới',
            children: <></>,
        },
        {
            key: 'price',
            label: 'Giá Thấp Đến Cao',
            children: <></>,
        },
        {
            key: '-price',
            label: 'Giá Cao Đến Thấp',
            children: <></>,
        },
    ];
    const onFinish = (values) => {
        let f = "";
        if (values?.range?.from >= 0 && values?.range?.to >= 0 === true) {
            f += `&price>=${values?.range?.from}&price<=${values?.range?.to}`
            setFilter(f)
        }
    }
    const onchangeFilter = (changedValues, values) => {
        if (changedValues?.category) {
            const t = changedValues.category.toString();

            if (values.category.length > 0) {
                setFilter(`&category=${t}`)

            }
            else {
                setFilter("")
            }
        }
    }

    //convert vn to en
    const NonAccentVietnamese = (str) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }
    const convertSlug = (str) => {
        str = NonAccentVietnamese(str)
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
        var to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
        return str;
    }

    const handleRedirectBook = (book) => {
        const slug = convertSlug(book.mainText)
        navigate(`/books/${slug}?id=${book._id}`)
    }
    return (
        <div className='container'>
            <Row>
                <Col lg={4} md={6} sm={0} xs={0}>
                    <div className="menu-left">
                        <Form
                            form={form}
                            layout='vertical'
                            onFinish={onFinish}
                            onValuesChange={(changedValues, values) => onchangeFilter(changedValues, values)}
                        >
                            <div className='filter-search'>
                                <div>
                                    <Row style={{ gap: "10px 0" }}>
                                        <Col span={24}>
                                            <FilterOutlined style={{ cursor: "pointer", color: "blue" }} />
                                        </Col>

                                        <Form.Item
                                            label="Danh Mục sản phẩm"
                                            name={"category"}
                                        >
                                            <Checkbox.Group>
                                                <Row style={{ lineHeight: "30px" }}>
                                                    {
                                                        category?.map((item, index) => {
                                                            return (
                                                                <Col span={24} key={index}>
                                                                    <Checkbox value={item.value} key={`category-${index}`} >
                                                                        {item.label}
                                                                    </Checkbox>
                                                                </Col>
                                                            )
                                                        })
                                                    }
                                                </Row>
                                            </Checkbox.Group>
                                        </Form.Item>

                                    </Row>
                                </div>
                                <div>
                                    <ReloadOutlined style={{ cursor: "pointer" }}

                                        onClick={() => {
                                            form.resetFields()
                                            setFilter("")
                                            setSearchTerm("")
                                        }}
                                    />
                                </div>
                            </div>
                            <Divider />
                            <div>
                                <p>Khoảng giá</p>
                                <div style={{ marginTop: "10px", padding: "5px" }}>
                                    <Form.Item
                                        name={["range", 'from']}>
                                        <InputNumber
                                            style={{ width: "100%" }}
                                            name='from'
                                            min={0}
                                            placeholder="đ TỪ"
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        />
                                    </Form.Item>
                                    <Form.Item name={["range", 'to']}>
                                        <InputNumber
                                            style={{ width: "100%" }}
                                            name='to'
                                            min={0}
                                            placeholder="đ ĐẾN"
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        />
                                    </Form.Item>
                                </div>
                                <Button type='primary' onClick={() => form.submit()}
                                    style={{ width: "100%" }}
                                >Áp dụng</Button>
                            </div>
                        </Form>
                    </div>
                </Col>
                <Col lg={20} md={18} sm={24} xs={24}>
                    <div className='menu-tabs'>
                        <Row>
                            <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />
                        </Row>
                        <Row className='gird-product'>
                            {
                                dataProduct?.map((item) => {
                                    return (
                                        <div key={item._id} className="column" onClick={() => handleRedirectBook(item)}>
                                            <div className="wrapper">
                                                <div className="img-product">
                                                    <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`} alt="thumbnail book" />
                                                </div>
                                                <div className='text'>{item.mainText}</div>
                                                <div className='price'>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                                </div>
                                                <div className='rating'>
                                                    <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                    <span>Đã bán {item.sold}</span>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                            <Col span={24}>
                                <Pagination
                                    pageSize={pageSize}
                                    current={current}
                                    total={total}
                                    responsive
                                    onChange={(p, s) => onchangePagination({ current: p, pageSize: s })}
                                    style={{ justifyContent: "center" }} />
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Home