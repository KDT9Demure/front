import styles from "../css/cart.module.css";


export default function Cart() {



    return (
            <div className={styles.container}>
                <div className={styles.title}></div>
                <section className={styles.cartWrapper}>
                    <div className={styles.cartMain}>
                        <div className={styles.main}>
                            <div className={styles.cartImg}>
                                <input type="checkbox"/>
                                <img className={styles.img} src=""/>
                            </div>
                            <div className={styles.cartInfoWrapper}>
                                <div className={styles.cartTitle}>쇼파</div>
                                <div className={styles.cartInfo}>
                                    <div>내일(화) 도착예정</div>
                                    <div>128,000원</div>
                                </div>
                                <div className={styles.cartInfo}>
                                    <div>배송비 무료</div>
                                    <div>128 point 적립</div>
                                </div>
                            </div>
                        </div>
                        <button className={styles.cartDeleteBtn}>선택상품 삭제</button>
                    </div>
                    <div className={styles.priceWrapper}>
                        <div>상품가격 : 500원</div>
                        <div>배송가격 : 200원</div>
                        <div>총 주문금액 : 700원</div>
                    </div>
                    <button className={styles.orderBtn}>상품 주문하기</button>
                </section>

            </div>
        )
};