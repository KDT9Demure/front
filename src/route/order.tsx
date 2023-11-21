import React, { useState, useEffect } from "react"

import axios from "axios";

import styles from "../css/order.module.css";

import { config } from '@fortawesome/fontawesome-svg-core'

import '@fortawesome/fontawesome-svg-core/styles.css'

export default function Order() {
    return (
        <>
            <div className={styles.top}></div>
            <div className={styles.bodys}>
                <div className={styles.container}>
                    <div className={styles.orderList}>
                        <h1>주문내역</h1>
                    </div>
                    <div style={{ marginLeft: 40 }}>2023.11.21</div>
                    <div className={styles.orderContainer}>
                    </div>
                </div>
            </div>
        </>
    )
}