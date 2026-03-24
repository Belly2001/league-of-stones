// Composant Participer 

import Link from 'next/link';

// React Icons
import { GiCrossedSwords } from 'react-icons/gi';
import { FaArrowLeft } from 'react-icons/fa';

// Styles
import styles from '../styles/Matchmaking.module.css';

export default function Participer({ onJoin, isLoading, error }) {
    return (
        <div className={styles.card}>

            {/* Logo */}
            <div className={styles.logo}>
                <GiCrossedSwords className={styles.logoIcon} />
                <span className={styles.logoText}>League of Stones</span>
            </div>

            {/* Titre */}
            <h1 className={styles.title}>Rejoindre une partie</h1>

            {/* Description */}
            <p className={styles.description}>
                Vous êtes sur le point d'intégrer la liste des joueurs disponibles. 
                Une fois inscrit, vous pourrez envoyer des demandes aux autres joueurs.
            </p>

            {/* Erreur */}
            {error && <div className={styles.error}>{error}</div>}

            {/* Bouton */}
            <button 
                className={styles.btnBlue}
                onClick={onJoin}
                disabled={isLoading}
            >
                {isLoading ? 'Inscription...' : 'Je souhaite intégrer le jeu'}
            </button>

            {/* Lien retour */}
            <Link href="/" className={styles.backLink}>
                <FaArrowLeft />
                Retour à l'accueil
            </Link>

        </div>
    );
}