import Link from "next/link";
import styles from './menu.module.scss'

export default function Menu(){
    return(
        <ul className={styles.menuContainer}>
            <li className={styles.menuItem}>
                <Link href='/'>Home</Link>
            </li>
            <li className={styles.menuItem}>
                <Link href='/condutores/list'>Condutores</Link>
            </li>
            <li className={styles.menuItem}>
                <Link href='/clientes/list'>Clientes</Link>
            </li>
            <li className={styles.menuItem}>
                <Link href='/deslocamentos/list'>Deslocamentos</Link>
            </li>
            <li className={styles.menuItem}>
                <Link href='/veiculos/list'>Veículos</Link>
            </li>
        </ul>
    );
};