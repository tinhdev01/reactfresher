import { useEffect, useState } from "react";
import BooksFilter from "./books.filter";
import './books.scss'
import { FetchBooksApi } from "../../../services/axios.api";
import { notification } from "antd";
import BooksTable from "./books.table";

const Books = () => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [sort, setSort] = useState("&sort=-updatedAt");
    const [dataBooks, setDataBooks] = useState(null);


    useEffect(() => {
        FetchBooks();
    }, [current, pageSize])
    const FetchBooks = async () => {
        const res = await FetchBooksApi(current, pageSize, sort);
        if (res?.data) {
            setDataBooks(res.data.result)
            setTotal(res.data.meta.total)
        }
        else {
            notification.error({
                message: "Data Table",
                description: res.message
            })
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <BooksFilter />
            <BooksTable
                dataBooks={dataBooks}
                total={total}
                setCurrent={setCurrent}
                current={current}
                pageSize={pageSize}
                setPageSize={setPageSize}
                FetchBooks={FetchBooks}
            />
        </div>
    )
}
export default Books;