import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
    return (
        <div style={{ position: "fixed", top: "50%", left: "50%", transition: "-50%,-50%" }}>
            <HashLoader color="#5e9e95" />
        </div>
    )
}
export default Loading;