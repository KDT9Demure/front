import headerStyles from "../css/header.module.css";
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
    <div className={headerStyles.container}>
        <div className={headerStyles.headerLogo} onClick={onLogoClick}>
          Demure
        </div>
        <div className={headerStyles.headerUser}>
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
        <div className={headerStyles.wrapper} onClick={onClick2}>
            <div className={headerStyles.menu} onClick={(e) => { e.stopPropagation() }}>
                <span className={headerStyles.headerSearch}>
                    <FontAwesomeIcon className={headerStyles.headerSearchIcon} icon={faMagnifyingGlass} style={{ color: "#ffffff" }} />
                    <input type="text"className={headerStyles.headerSearchInput} placeholder="What do you looking for?" />
                </span>
                <div className={headerStyles.headerMenu}>
                    <dt>
                        <Link to={""} className={headerStyles.dtLink}>Home</Link>
                    </dt>
                    <dt>
                        <div>Category</div>
                        <dd>
                            <Link to={""} className={headerStyles.menuLink}>Bathroom products</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={headerStyles.menuLink}>Kitchen</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={headerStyles.menuLink}>Beds & mattresses</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={headerStyles.menuLink}>Chairs</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={headerStyles.menuLink}>Tables & desks</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={headerStyles.menuLink}>Lighting</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={headerStyles.menuLink}>Baby & Children</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={headerStyles.menuLink}>Decoration</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={headerStyles.menuLink}>Living room</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={headerStyles.menuLink}>Cabinets</Link>
                        </dd>
                    </dt>
                    <dt>
                        <div>Customer Service</div>
                        <dd>
                            <Link to={""} className={headerStyles.menuLink}>QnA</Link>
                        </dd>
                        <dd>
                            <Link to={""} className={headerStyles.menuLink}>Notice</Link>
                        </dd>
                    </dt>
                    <dt>
                        <Link to={""} className={headerStyles.dtLink}>Event</Link>
                    </dt>
                </div>
            </div>
        </div>
      )}
    </div>
  )
}