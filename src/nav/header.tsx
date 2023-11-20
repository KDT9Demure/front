import styles from "../css/header.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
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
        <div className={styles.headerLogo} onClick={onLogoClick}>
          Demure
        </div>
        <div className={styles.headerUser}>
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
                <span className={styles.headerSearch}>
                    <FontAwesomeIcon className={styles.headerSearchIcon} icon={faMagnifyingGlass} style={{ color: "#ffffff" }} />
                    <input type="text"className={styles.headerSearchInput} placeholder="What do you looking for?" />
                </span>
                <div className={styles.headerMenu}>
                    <dt>
                        <Link to={""} className={styles.dtLink}>Home</Link>
                    </dt>
                    <dt>
                        <div>Category</div>
                        <dd>
                            <Link to={""} className={styles.menuLink}>Bathroom products</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={styles.menuLink}>Kitchen</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={styles.menuLink}>Beds & mattresses</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={styles.menuLink}>Chairs</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={styles.menuLink}>Tables & desks</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={styles.menuLink}>Lighting</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={styles.menuLink}>Baby & Children</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={styles.menuLink}>Decoration</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={styles.menuLink}>Living room</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={styles.menuLink}>Cabinets</Link>
                        </dd>
                    </dt>
                    <dt>
                        <div>Customer Service</div>
                        <dd>
                            <Link to={""} className={styles.menuLink}>QnA</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={styles.menuLink}>Notice</Link>
                        </dd>
                    </dt>
                    <dt>
                        <Link to={""} className={styles.dtLink}>Event</Link>
                    </dt>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}