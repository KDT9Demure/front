import { Link } from "react-router-dom";
import "./layout.css"

export default function Layout() {

    return (
        <div className="layout">
            <Link to="/">Home</Link>
            <Link to="/signin">로그인</Link>
            <Link to="/signup">회원가입</Link>
        </div>
    )
}