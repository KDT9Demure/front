import { Link } from "react-router-dom";
import styles from "./layout.module.css"


export default function Layout() {

    return (
        <div className={styles.container}>
            <Link to="/">Home</Link>
            <Link to="/signin">로그인</Link>
            <Link to="/signup">회원가입</Link>
        </div>
    )
}