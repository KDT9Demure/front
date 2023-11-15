import styles from "../css/header.module.css";
import { useState } from "react";


export default function Header() {

    const [openMenu, setOpenMenu] = useState(false);

    const onClick = () => {
        setOpenMenu(true);
    };

    const onClick2 = () => {
        setOpenMenu(false);
    }


    return (
        <div className={styles.container}>
            {openMenu ? <div className={styles.menu} onClick={onClick2}>Demure
                <input placeholder="검색"/>
                <dt>shop
                    <dd>
                        의자
                    </dd>
                    <dd>
                        책상
                    </dd>
                </dt>
                <dt>customer service
                    <dd>
                        q&a
                    </dd>
                    <dd>
                        문의
                    </dd>
                </dt>
                <dt>event</dt>
            </div> : <div className={styles.main} onClick={onClick}>Demure</div>}
        </div>
    )
}