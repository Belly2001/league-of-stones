import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GiCrossedSwords } from 'react-icons/gi';
import { FaUser, FaGamepad } from 'react-icons/fa';
import styles from '../styles/NavBar.module.css';

export default function NavBar() {
    const router = useRouter();
    const [isConnected, setIsConnected] = useState(false);
    const [userName, setUserName] = useState('');

    // Vérifier si l'utilisateur est connecté
    useEffect(() => {
        const checkConnection = () => {
            const token = localStorage.getItem('token');
            const name = localStorage.getItem('userName');
            if (token) {
                setIsConnected(true);
                setUserName(name || 'Joueur');
            } else {
                setIsConnected(false);
                setUserName('');
            }
        };

        checkConnection();

        window.addEventListener('storage', checkConnection);
        return () => window.removeEventListener('storage', checkConnection);
    }, []);

    // Fonction de déconnexion
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');

            await fetch('http://localhost:3001/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

        } catch (err) {
            console.log('Erreur logout:', err);
        }

        // Supprimer les données locales
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');

        setIsConnected(false);
        setUserName('');
        router.push('/');
    };

    return (
        <nav className={styles.navbar}>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
                <GiCrossedSwords /> League of Stones
            </Link>

            {/* Liens de navigation */}
            <div className={styles.navLinks}>
                <Link href="#presentation" className={styles.navLink}>
                    Présentation
                </Link>
                <Link href="#how-it-works" className={styles.navLink}>
                    Comment jouer
                </Link>
                <Link href="#champions" className={styles.navLink}>
                    Champions
                </Link>
                <Link href="#features" className={styles.navLink}>
                    Fonctionnalités
                </Link>
            </div>

            {/* Boutons selon l'état de connexion */}
            <div className={styles.navButtons}>
                {isConnected ? (
                    <>
                        <Link href="/participer" className={styles.btnInscription}>
                            <FaGamepad /> Jouer
                        </Link>
                        <button onClick={handleLogout} className={styles.btnConnexion}>
                            Déconnexion
                        </button>
                        <Link href="/compte" className={styles.btnProfil}>
                            <FaUser /> {userName}
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/inscription">
                            <button className={styles.btnInscription}>S'inscrire</button>
                        </Link>
                        <Link href="/connexion">
                            <button className={styles.btnConnexion}>Se connecter</button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}