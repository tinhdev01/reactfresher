import ImageGallery from "react-image-gallery";
import { Col, InputNumber, Rate, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import ModalGallery from "./Modal";
import './styles.scss'
import LoadingBooks from "./loading";
import { useDispatch } from "react-redux";
import { doAddBookAction } from "../../../redux/order/orderSlice";
import { useNavigate } from "react-router-dom";


const View = (props) => {
    const { dataBooks } = props
    const [openModal, setOpenModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(1)
    const refGallery = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const images = dataBooks?.items ?? [];


    const hanldeInput = (event) => {
        if (+event > 0 && +event <= +dataBooks.quantity) {
            setCurrentQuantity(+event)
        }
        else {
            if (+event >= +dataBooks.quantity) {
                setCurrentQuantity(+dataBooks.quantity)
            }
            else {
                if (+event <= 0) {
                    setCurrentQuantity(1)
                }
            }
        }
    }
    const handleButton = (type) => {
        if (type == "sum") {
            if (currentQuantity >= +dataBooks.quantity) {
                setCurrentQuantity(+dataBooks.quantity)
            }
            else {
                setCurrentQuantity(currentQuantity + 1)
            }

        }

        if (type == "tru") {
            if (currentQuantity > 1) {
                setCurrentQuantity(currentQuantity - 1)
            }
            else {
                setCurrentQuantity(1)
            }
        }
    }

    const handleAddToCard = (quantity, book) => {
        dispatch(doAddBookAction({ quantity, detail: book, _id: book._id }))
    }
    return (
        <>
            {
                dataBooks === null ? <LoadingBooks /> :
                    <>
                        <Row>
                            <Col span={9}>
                                <ImageGallery items={images}
                                    showPlayButton={false}
                                    showFullscreenButton={false}
                                    showNav={false}
                                    ref={refGallery}
                                    startIndex={currentIndex}
                                    slideDuration={2}
                                    slideOnThumbnailOver={true}
                                    onClick={() => {
                                        setOpenModal(true)
                                        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
                                    }}
                                />
                            </Col>
                            <Col span={15}>
                                <div className="cnt-product">
                                    <div className="author">
                                        <p>Tác giả: <span>{dataBooks.author}</span></p>
                                    </div>
                                    <div className="mainText">
                                        <p>{dataBooks.mainText}</p>
                                    </div>
                                    <div className="sold">
                                        <Rate value={5} /> | Đã bán {dataBooks.sold}
                                    </div>
                                    <div className="price">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataBooks.price)}
                                    </div>
                                    <div className="shipper">
                                        <div className="left-produ">
                                            Vận chuyển:
                                        </div>
                                        <div className="right-produ">
                                            Miễn phí
                                        </div>
                                    </div>
                                    <div className="quantity">
                                        <p className="left-produ">Số lượng</p>
                                        <button onClick={() => handleButton("tru")}>-</button>
                                        <input onChange={(event) => hanldeInput(event.target.value)} value={currentQuantity} />
                                        <button onClick={() => handleButton("sum")}>+</button>
                                    </div>
                                    <div className="add-card">
                                        <button className="btn1" onClick={() => handleAddToCard(currentQuantity, dataBooks)}>Thêm giỏ hàng</button>
                                        <button className="btn2" onClick={() => {
                                            handleAddToCard(currentQuantity, dataBooks)
                                            navigate("/order")
                                        }}>Mua ngay</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <ModalGallery
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            images={images}
                            currentIndex={currentIndex}
                            titleModal={dataBooks.mainText}
                        />
                    </>
            }
        </>
    )
}
export default View