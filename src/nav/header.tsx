import styles from "../css/header.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUser, faBasketShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  const onLogoClick = () => {
    setOpenMenu(!openMenu);
  };

  const onClick2 = () => {
    setOpenMenu(false);
  }

  return (
    <div className={styles.container}>
        <div className={styles.header_logo} onClick={onLogoClick}>
          Demure
        </div>
        <div className={styles.header_user}>
            <div>
                <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#ffffff" }} />
                Bonjour!
            </div>
            <div>
                <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} />
            </div>
            <div>
                <FontAwesomeIcon icon={faBasketShopping} style={{ color: "#ffffff" }} />
            </div>
        </div>
      {openMenu && (
        <div className={styles.wrapper} onClick={onClick2}>
            <div className={styles.menu} onClick={(e) => { e.stopPropagation() }}>
                <span className={styles.header_search}>
                    <FontAwesomeIcon className={styles.header_search_icon} icon={faMagnifyingGlass} style={{ color: "#ffffff" }} />
                    <input type="text"className={styles.header_search_input} placeholder="What do you looking for?" />
                </span>
                <div className={styles.header_menu}>
                    <dt>Category
                        <dd>
                            Bathroom products
                        </dd>
                        <dd>
                            Kitchen
                        </dd>
                        <dd>
                            Beds & mattresses
                        </dd>
                        <dd>
                            Chairs
                        </dd>
                        <dd>
                            Tables & desks
                        </dd>
                        <dd>
                            Lighting
                        </dd>
                        <dd>
                            Baby & Children
                        </dd>
                        <dd>
                            Decoration
                        </dd>
                        <dd>
                            Living room
                        </dd>
                        <dd>
                            Cabinets
                        </dd>
                    </dt>
                    <dt>Customer Service
                        <dd>
                            QnA
                        </dd>
                        <dd>
                            Notice
                        </dd>
                    </dt>
                    <dt>Event
                    </dt>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}