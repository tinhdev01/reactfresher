import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Result
            status="404"
            title="404"
            subTitle="Không có trang này nè."
            extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
        />
    );
}