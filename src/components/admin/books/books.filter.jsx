import { Button, Col, Form, Input, Row } from "antd"

const BooksFilter = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values)
    }
    return (
        <Row>
            <Col span={24} className="form-filter">
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    style={{
                        justifyContent: "center",
                        display: "flex",
                        gap: "2%"
                    }}
                >
                    <Form.Item
                        style={{ width: "30%" }}
                        label="Tên sách"
                        name="mainText"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        style={{ width: "30%" }}
                        label="Tác giả"
                        name="author"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        style={{ width: "30%" }}
                        label="Thể loại"
                        name="category"
                    >
                        <Input />
                    </Form.Item>
                </Form>
                <div className="btn-seach">
                    <Button
                        type="primary"
                        onClick={() => form.submit()}
                    >Search</Button>
                    <Button>Clear</Button>
                </div>
            </Col>
        </Row>
    )
}
export default BooksFilter;