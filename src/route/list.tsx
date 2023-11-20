import React, { useState, useEffect } from "react"

import axios from "axios";

import styles from "../css/signup.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

export default function List() {
    return (
        <>
            <div className={styles.categoryInfo}>
                <h1>카테고리</h1>
                <div>

                    <h2>인기상품순</h2>
                    <h2>낮은 가격순</h2>
                    <h2>높은 가격순</h2>

                </div>
            </div>
            <div className={styles.productContainer}>


            </div>
        </>
    )
}
