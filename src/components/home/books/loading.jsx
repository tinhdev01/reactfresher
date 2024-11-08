import { Col, Row, Skeleton } from "antd";
import { useState } from "react";

const LoadingBooks = () => {
    const [active, setActive] = useState(true);
    return (
        <Row gutter={[20, 20]}>
            <Col md={8} sm={0} xs={0}>
                <Skeleton.Input
                    active={active}
                    block={true}
                    style={{
                        width: '100%',
                        height: 250
                    }}
                />
                <div style={{ margin: "10px", gap: 20, display: "flex", justifyContent: "center" }}>
                    <Skeleton.Image active={active} />
                    <Skeleton.Image active={active} />
                    <Skeleton.Image active={active} />
                </div>
            </Col>
            <Col md={16} sm={24}>
                <Skeleton paragraph={{ rows: 2 }} active={active} />
                <br />
                <Skeleton paragraph={{ rows: 2 }} active={active} />
                <div>
                    <Skeleton.Button active={active} style={{ margin: "20px" }} />
                    <Skeleton.Button active={active} style={{ margin: "20px" }} />
                </div>
            </Col>
        </Row>

    )
}
export default LoadingBooks;