import header from "../css/header.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRightToBracket,
    faUser,
    faBasketShopping,
    faMagnifyingGlass,
    faHouse,
    faArrowRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../hook";
import {Cookies} from 'react-cookie';

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false);

    const onLogoClick = () => {
        setOpenMenu(!openMenu);
        console.log(openMenu)
    };

    const userData = useAppSelector((state) => state.signin);

    const handleLogout = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
        e.preventDefault();
       const cookies = new Cookies();
        cookies.remove('DEMURE', { path: "/" });
        window.location.reload();
    }

    const [value, setValue] = useState("");
      
    const handleEnterKey = (e) => {
        if (e.key === "Enter") {
            window.location.href = `/search?q=${value}`;
        }
    };

    return (
        <div className={header.box}>
            <div className={`${header.container} ${openMenu && header.openMenu}`}>
                <div className={`${header.logo} ${openMenu && header.logoColor}`} onClick={onLogoClick}>Demure</div>
                <div className={`${header.top} ${!openMenu && header.displayNone}`}>
                    <div className={header.iconBox}>
                        <div>
                            {userData.user_id === 0 ?
                                <Link to="/signin" className={header.iconLink} style={{textDecoration:"none"}} onClick={onLogoClick}>
                                    <FontAwesomeIcon icon={faRightToBracket} />
                                    <div className={header.iconName}>Login</div>
                                </Link>
                            :
                                <a href="/" className={header.iconLink} style={{textDecoration:"none"}} onClick={(e)=>handleLogout(e)}>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                    <div className={header.iconName}>Logout</div>
                                </a>
                            }
                        </div>
                        <div>
                            {userData.user_id === 0 ?
                                <div></div>
                            :
                                <Link to="/profile" className={header.iconLink} style={{textDecoration:"none"}} onClick={onLogoClick}>
                                    <FontAwesomeIcon icon={faUser} />
                                    <div className={header.iconName}>MyPage</div>
                                </Link>
                            }
                        </div>
                        <div>
                            <Link to="/cart" className={header.iconLink} style={{textDecoration:"none"}} onClick={onLogoClick}>
                                <FontAwesomeIcon icon={faBasketShopping} />
                                <div className={header.iconName}>Cart</div>
                            </Link>
                        </div>
                    </div>
                    <div className={header.homeBox}>
                        <Link to="/" className={header.homeLink} style={{textDecoration:"none"}} onClick={onLogoClick}>
                            <FontAwesomeIcon icon={faHouse} />
                        </Link>
                    </div>
                </div>
                <div>
                    <div className={`${header.searchBox} ${!openMenu && header.displayNone}`} >
                        <span className={header.headerSearch}>
                        <input
                            type="text"
                            className={header.headerSearchInput}
                            placeholder="What are you looking for?"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                            onKeyDown={handleEnterKey}
                        />
                        <FontAwesomeIcon className={header.headerSearchIcon} icon={faMagnifyingGlass} />
                        </span>
                    </div>
                </div>
                <div className={`${header.menuBox} ${!openMenu && header.displayNone}`} onClick={onLogoClick}>
                    <div className={header.headerMenu}>
                        <div className={header.itemBox}>
                            <div className={header.linkName}>Category</div>
                            <div className={header.linkCategoryBox}>
                                <dd>
                                    <Link to={"/list/10555"} className={header.menuLink}>Bathroom products</Link>
                                </dd>
                                <dd>
                                    <Link to={"/list/700417"} className={header.menuLink}>Kitchen</Link>
                                </dd>
                                <dd>
                                    <Link to={"/list/bm003"} className={header.menuLink}>Beds & mattresses</Link>
                                </dd>
                                <dd>
                                    <Link to={"/list/fu002"} className={header.menuLink}>Chairs</Link>
                                </dd>
                                <dd>
                                    <Link to={"/list/fu004"} className={header.menuLink}>Tables & desks</Link>
                                </dd>
                                <dd>
                                    <Link to={"/list/li002"} className={header.menuLink}>Lighting</Link>
                                </dd>
                                <dd>
                                    <Link to={"/list/18767"} className={header.menuLink}>Baby & Children</Link>
                                </dd>
                                <dd>
                                    <Link to={"/list/tl002"} className={header.menuLink}>Decoration</Link>
                                </dd>
                                <dd>
                                    <Link to={"/list/fu003"} className={header.menuLink}>Living room</Link>
                                </dd>
                                <dd>
                                    <Link to={"/list/st002"} className={header.menuLink}>Cabinets</Link>
                                </dd>
                            </div>
                            
                        </div>
                        <div className={header.itemBox}>
                            <div className={header.linkName}>Customer Service</div>
                            <div className={header.linkCSBox}>
                                <dd>
                                    <Link to={"/question"} className={header.menuLink}>QnA</Link>
                                </dd>
                                <dd>
                                    <Link to={"/notice"} className={header.menuLink}>Notice</Link>
                                </dd>
                            </div>
                        </div>
                        <div className={header.itemBox}>
                            <Link to={"/event/Christmas"} className={header.linkName}>Event</Link>
                        </div>
                    </div>
                </div>
                {/* <div className={`${header.hello} ${!openMenu && header.displayNone}`}>
                    <span className={header.text}>Bonjour!</span>
                </div> */}
            </div>
        </div>
    )
}

