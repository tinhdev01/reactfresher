import { useLocation } from "react-router-dom";
import './books.scss'
import View from "../../components/home/books/View";
import { GetBooksByID } from "../../services/axios.api";
import { useEffect, useState } from "react";
const BookPage = () => {
    let location = useLocation();
    const [dataBooks, setDataBooks] = useState(null)
    let params = new URLSearchParams(location.search)
    const id = params?.get("id")

    useEffect(() => {
        FetchBook(id)
    }, [id])

    const FetchBook = async (id) => {
        const res = await GetBooksByID(id)
        let raw = res.data
        raw.items = getImages(raw)

        setTimeout(() => {
            setDataBooks(raw)
        }, 3000)
    }
    const getImages = (raw) => {
        const images = [];
        if (raw.thumbnail) {
            images.push(
                {
                    original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                    thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                    originalClass: 'origina-image',
                    thumbnailClass: 'thumbnail-image',
                },
            )
        }
        if (raw.slider) {
            raw.slider?.map(item => {
                images.push(
                    {
                        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                        originalClass: 'origina-image',
                        thumbnailClass: 'thumbnail-image',
                    },
                )
            })
        }
        return images;
    }
    return (
        <div className="container">
            <View
                dataBooks={dataBooks}
            />
        </div>
    )
}
export default BookPage;