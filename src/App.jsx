import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login";
import ErrorPage from "./pages/error";
import Header from "./components/home/layout/header.jsx";
import Footer from "./components/home/layout/footer.jsx";
import Home from "./components/home/home";
import RegisterPage from "./pages/register.jsx";
import { useEffect, useState } from "react";
import { fetchAccountAPI } from "./services/axios.api.js";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice.js";
import Loading from "./components/loading/loading.jsx";
import PrivateRoute from "./components/protectedroute/privateRoute.jsx";
import LayoutAdmin from "./components/admin/layout/Admin.Layout.jsx";
import Users from "./components/admin/users/users.jsx";
import Books from "./components/admin/books/books.jsx";
import Dashboard from "./components/admin/dashboard/dashboard.jsx";
import Orders from "./components/admin/orders/orders.jsx";
import BookPage from "./pages/books/books.jsx";
import OrderProduct from "./components/home/order/order.jsx";
import History from "./components/home/order/history.jsx";

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("")
  console.log(searchTerm)
  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={[searchTerm, setSearchTerm]} />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, element: <Home />
      },
      {
        path: "books/:slug",
        element: <BookPage />,
      },
      {
        path: "order",
        element: <PrivateRoute><OrderProduct /></PrivateRoute>,
      },
      {
        path: "history",
        element: <PrivateRoute> <History /></PrivateRoute>,
      },
    ],
  },

  {
    path: "/admin",
    element: <LayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, element: <PrivateRoute><Dashboard /></PrivateRoute>
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);

const App = () => {
  const dispatch = useDispatch();
  const isloading = useSelector(state => state.account.isloading)
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

  useEffect(() => {
    getAccount();
  }, [])


  const getAccount = async () => {
    if (window.location.pathname === "/login"
      || window.location.pathname === "/register"
    ) return
    else {
      const res = await fetchAccountAPI()
      if (res?.data) {
        dispatch(doGetAccountAction(res.data))
      }
    }
  }


  return (
    <>
      {
        isloading === true
          || isAuthenticated === true
          || window.location.pathname === "/login"
          || window.location.pathname === "/register"
          || window.location.pathname === "/"
          ?
          <RouterProvider router={router} />
          :
          <Loading />
      }
    </>
  )
}

export default App
