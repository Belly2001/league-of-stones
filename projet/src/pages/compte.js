import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaArrowLeft, FaGamepad } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';
import styles from '../styles/Auth.module.css';

export default function ComptePage() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/connexion');
        } else {
            setIsAuthorized(true);
            setUserName(localStorage.getItem('userName') || '');
            setUserEmail(localStorage.getItem('userEmail') || '');
        }
    }, [router]);

    // Fonction de déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        router.push('/');
    };

    if (!isAuthorized) return null;

    return (
        <div className={styles.container}>
            {/* Bouton retour */}
            <Link href="/" className={styles.backButton}>
                <FaArrowLeft /> Accueil
            </Link>

            {/* Card du profil */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <GiCrossedSwords className={styles.logo} />
                    <h1 className={styles.title}>Mon Compte</h1>
                </div>

                {/* Infos utilisateur */}
                <div className={styles.profileInfo}>
                    <div className={styles.profileItem}>
                        <FaUser className={styles.profileIcon} />
                        <div>
                            <p className={styles.profileLabel}>Nom d'utilisateur</p>
                            <p className={styles.profileValue}>{userName}</p>
                        </div>
                    </div>

                    <div className={styles.profileItem}>
                        <FaEnvelope className={styles.profileIcon} />
                        <div>
                            <p className={styles.profileLabel}>Email</p>
                            <p className={styles.profileValue}>{userEmail}</p>
                        </div>
                    </div>
                </div>

                {/* Boutons */}
                <Link href="/participer" className={styles.submitButton}>
                    <FaGamepad /> Jouer
                </Link>

                <button onClick={handleLogout} className={styles.logoutButton}>
                    Déconnexion
                </button>
            </div>
        </div>
    );
}