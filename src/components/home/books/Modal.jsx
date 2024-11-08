import { Col, Image, Modal, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import './styles.scss'

const Modals = (props) => {
    const { openModal, setOpenModal, images, currentIndex, titleModal } = props
    const [acctionIndex, setActionIndex] = useState(0)
    const refGallery = useRef(null);

    useEffect(() => {
        if (currentIndex) {
            setActionIndex(currentIndex)
        }
    }, [openModal, currentIndex])
    return (
        <Modal open={openModal} onCancel={() => setOpenModal(false)}
            footer={null} width={'60vw'}
        >
            <Row gutter={[20, 20]}>
                <Col span={16}>
                    <ReactImageGallery items={images}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        ref={refGallery}
                        startIndex={acctionIndex}
                        slideDuration={currentIndex}
                        showThumbnails={false}
                        onSlide={(i) => setActionIndex(i)}
                    />
                </Col>
                <Col span={8} style={{ lineHeight: "50px" }}>
                    <p>{titleModal}</p>
                    <Row gutter={[20, 20]}>
                        {
                            images?.map((item, i) => {
                                return (
                                    <Col span={12} key={`image-${i}`}>

                                        <div className={acctionIndex === i ? "actives" : ""}>
                                            <Image
                                                src={item.original}
                                                preview={false}
                                                onClick={() => refGallery.current.slideToIndex(i)}
                                            />
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
            </Row>
        </Modal >
    )
}
export default Modals;