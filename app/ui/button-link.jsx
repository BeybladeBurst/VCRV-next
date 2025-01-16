'use client';
import { redirect } from "next/navigation";
import styles from '@/app/ui/button.module.css';

const Button = ({href, type, loading, children}) => {
    console.log(children);
    const classes = `${styles.button} ${loading ? 'loading' : ''}`
    return <button type={type ?? 'button'} className={classes} onClick={href ? ()=>redirect(href) : ev=>console.log(ev.target)}>{children}</button>
}

export default Button;