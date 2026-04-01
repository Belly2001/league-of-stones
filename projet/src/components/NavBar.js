import styles from '../styles/NavBar.module.css';
import Link from 'next/link';
import { GiCrossedSwords } from 'react-icons/gi';

export default function NavBar() {
    return (
        <nav className={styles.navbar}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
                <GiCrossedSwords /> League of Stones
            </Link>

            {/* Liens de navigation */}
            <div className={styles.navLinks}>
                <Link href="#how-it-works" className={styles.navLink}>
                    Comment jouer
                </Link>
                <Link href="#champions" className={styles.navLink}>
                    Champions
                </Link>
            </div>

            {/* Boutons S'inscrire et Se connecter */}
            <div className={styles.navButtons}>
                <Link href="/inscription">
                    <button className={styles.btnInscription}>S'inscrire</button>
                </Link>
                <Link href="/connexion">
                    <button className={styles.btnConnexion}>Se connecter</button>
                </Link>
            </div>
        </nav>
    );
}