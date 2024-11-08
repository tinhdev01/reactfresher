import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const NotPermitted = () => {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Xin lỗi bạn không có quyền vào trang này."
            extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
        />
    );
}
export default NotPermitted;