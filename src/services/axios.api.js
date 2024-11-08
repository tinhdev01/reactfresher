import axios from "./axios.customize";

const CreateRegister = (fullName, email, password, phone) => {
    const BACKEND_URL = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(BACKEND_URL, data)
}

const LoginApi = (username, password) => {
    const BACKEND_URL = "/api/v1/auth/login";
    const data = {
        username: username,
        password: password,
        delay: 3000
    }
    return axios.post(BACKEND_URL, data)
}

const fetchAccountAPI = () => {
    const BACKEND_URL = "/api/v1/auth/account";
    return axios.get(BACKEND_URL)
}

const LogoutAccountAPI = () => {
    const BACKEND_URL = "api/v1/auth/logout";
    return axios.post(BACKEND_URL)
}

const fetchUsersAPI = (BACKEND_URL) => {
    return axios.get(BACKEND_URL)
}


const CreateUserAPI = (fullName, email, password, phone) => {
    const BACKEND_URL = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(BACKEND_URL, data)
}

const CreateUploadUserExcel = (data) => {
    const BACKEND_URL = "/api/v1/user/bulk-create";
    return axios.post(BACKEND_URL, data)
}

const CreateUserUpdateAPI = (_id, fullName, phone) => {
    const BACKEND_URL = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone
    }
    return axios.put(BACKEND_URL, data)
}


const DeleteUserAPI = (_id) => {
    const BACKEND_URL = `/api/v1/user/${_id}`;
    return axios.delete(BACKEND_URL)
}


const FetchBooksApi = (current, pageSize, sort) => {
    const BACKEND_URL = `/api/v1/book?current=${current}&pageSize=${pageSize}${sort}`;
    return axios.get(BACKEND_URL)
}

const Getcategory = () => {
    const BACKEND_URL = `/api/v1/database/category`;
    return axios.get(BACKEND_URL)
}

const UploadIMGAPI = (file) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', file);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        }
    })
}

const CreateBooksApi = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    const BACKEND_URL = `/api/v1/book`;
    const data = {
        "thumbnail": thumbnail,
        "slider": slider,
        "mainText": mainText,
        "author": author,
        "price": price,
        "sold": sold,
        "quantity": quantity,
        "category": category
    }
    return axios.post(BACKEND_URL, data)
}
const callUpdateBook = (_id, thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    const BACKEND_URL = `/api/v1/book/${_id}`;
    const data = {
        "thumbnail": thumbnail,
        "slider": slider,
        "mainText": mainText,
        "author": author,
        "price": price,
        "sold": sold,
        "quantity": quantity,
        "category": category
    }
    return axios.put(BACKEND_URL, data)
}
const DeleteBook = (_id) => {
    const BACKEND_URL = `/api/v1/book/${_id}`;
    return axios.delete(BACKEND_URL)
}


const CallBooksApi = (current, pageSize, sort, filter, searchTerm) => {
    const BACKEND_URL = `/api/v1/book?current=${current}&pageSize=${pageSize}${sort}${filter}${searchTerm}`;
    return axios.get(BACKEND_URL)
}

const GetBooksByID = (id) => {
    const BACKEND_URL = `/api/v1/book/${id}`;
    return axios.get(BACKEND_URL)
}

const CreateOrder = (data) => {
    const BACKEND_URL = `/api/v1/order`;
    return axios.post(BACKEND_URL, data)
}

const historyOrder = () => {
    const BACKEND_URL = `/api/v1/history`;
    return axios.get(BACKEND_URL)
}

const UploadAvatar = (file) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', file);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "avatar"
        }
    })
}

const UpdateAccount = (_id, fullName, phone, avatar) => {
    const BACKEND_URL = `/api/v1/user`;
    const data = {
        "_id": _id,
        "fullName": fullName,
        "phone": phone,
        "avatar": avatar,
    }
    return axios.put(BACKEND_URL, data)
}

const ChangePasssAccount = (email, oldpass, newpass) => {
    const BACKEND_URL = `/api/v1/user/change-password`;
    const data = {
        "email": email,
        "oldpass": oldpass,
        "newpass": newpass,
    }
    return axios.post(BACKEND_URL, data)
}


const FetchDataDashBoard = () => {
    const BACKEND_URL = `/api/v1/database/dashboard`;
    return axios.get(BACKEND_URL)
}


const FetchOrder = (current, pageSize) => {
    const BACKEND_URL = `/api/v1/order?current=${current}&pageSize=${pageSize}`;
    return axios.get(BACKEND_URL)
}
export {
    CreateRegister, LoginApi, fetchAccountAPI,
    LogoutAccountAPI, fetchUsersAPI, CreateUserAPI,
    CreateUploadUserExcel, CreateUserUpdateAPI,
    DeleteUserAPI, FetchBooksApi, Getcategory,
    UploadIMGAPI, CreateBooksApi, callUpdateBook,
    DeleteBook, CallBooksApi, GetBooksByID,
    CreateOrder, historyOrder, UploadAvatar,
    UpdateAccount, ChangePasssAccount, FetchDataDashBoard,
    FetchOrder
}