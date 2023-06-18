import Link from 'next/link';
import styles from './main.module.scss'
export default function Main(){
    return(
        <main className={styles.main}>
            <h1 className={styles.title}>
                API Deslocamento
            </h1>

            <p className={styles.description}>
                Seja bem vindo ao nosso portal!
            </p>

            <div className={styles.grid}>
            <Link href='/condutores/list' className={styles.card}>
                <h2>Condutores &rarr;</h2>
                <p>Todas as informações dos seus condutores cadastrados.</p>
            </Link>

            <Link href='/clientes/list' className={styles.card}>
                <h2>Clientes &rarr;</h2>
                <p>Veja aqui quem já é cliente.</p>
            </Link>

            <Link href='/deslocamentos/list' className={styles.card}>
                <h2>Deslocamentos &rarr;</h2>
                <p>Analise todos os deslocamentos.</p>
            </Link>

            <Link href='/veiculos/list' className={styles.card}>
                <h2>Veículos &rarr;</h2>
                <p>Veja toda a sua frota.</p>
            </Link>

            </div>
        </main>

    );
}