import { Link, Outlet } from 'react-router-dom';
import event from '../css/event.module.css';

export default function Event() {
  return (
    <>
      <div className={event.header}>
        <h1 className={event.demure}>Demure</h1>
        <div>
          <Link to="/event/Christmas" className={event.link} style={{ textDecoration: 'none' }}>
            <div className={event.linkTitle}>크리스마스</div>
          </Link>
        </div>
        <div>
          <Link to="/event/Coupon" className={event.link} style={{ textDecoration: 'none' }}>
            <div className={event.linkTitle}>쿠폰기획전</div>
          </Link>
        </div>
        <div>
          <Link to="/event/Newyear" className={event.link} style={{ textDecoration: 'none' }}>
            <div className={event.linkTitle}>신년특가</div>
          </Link>
        </div>
        <div>
          <Link to="/event/First" className={event.link} style={{ textDecoration: 'none' }}>
            <div className={event.linkTitle}>카드할인사</div>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}