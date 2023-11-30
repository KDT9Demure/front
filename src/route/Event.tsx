import event from '../css/event.module.css';
import { Outlet } from 'react-router-dom';

export default function Event(){
    return (
        <>
            <div className={event.header}>
                헤더입니다
            </div>
            <Outlet/>
        </>
    )
}