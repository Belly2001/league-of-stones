import styles from '../styles/Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                Copyright © Web2 L3 UT2J - 2026
            </p>
            <div className={styles.links}>
                <Link href="#" className={styles.link}>Mentions légales</Link>
                <Link href="#" className={styles.link}>Contact</Link>
            </div>
        </footer>
    );
}
