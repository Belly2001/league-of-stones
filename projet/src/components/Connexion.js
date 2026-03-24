// Composant Connexion - Authentification utilisateur

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// React Icons
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { MdEmail, MdError } from 'react-icons/md';
import { GiCrossedSwords } from 'react-icons/gi';

// Styles
import styles from '../styles/Auth.module.css';

export default function Connexion() {
    const router = useRouter();

    // States
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Gère les changements dans les inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Valide le formulaire
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'L\'email est requis';
        }

        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Soumet le formulaire
    // Soumet le formulaire
const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: '', message: '' });

    if (!validateForm()) return;

    setIsLoading(true);

    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        });

        const data = await response.json();

        if (data.token) {
            // Stocker les infos utilisateur
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.id);
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userEmail', data.email);

            router.push('/buildDeck');

        } else if (data.message) {
            setAlert({ type: 'error', message: data.message });
        } else {
            setAlert({ type: 'error', message: 'Erreur de connexion.' });
        }

    } catch (error) {
        setAlert({
            type: 'error',
            message: 'Serveur inaccessible.'
        });
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className={styles.container}>

            {/* Bouton retour */}
            <Link href="/" className={styles.backButton}>
                <span className={styles.backButtonIcon}><FaArrowLeft /></span>
                Accueil
            </Link>

            <div className={styles.card}>

                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}><GiCrossedSwords /></span>
                    <span className={styles.logoText}>League of Stones</span>
                </Link>

                {/* En-tête */}
                <div className={styles.header}>
                    <h1 className={styles.title}>Connexion</h1>
                    <p className={styles.subtitle}>Accédez à l'arène</p>
                </div>

                {/* Alerte */}
                {alert.message && (
                    <div className={`${styles.alert} ${styles.alertError}`}>
                        <span className={styles.alertIcon}>
                            <MdError />
                        </span>
                        {alert.message}
                    </div>
                )}

                {/* Formulaire */}
                <form className={styles.form} onSubmit={handleSubmit}>

                    {/* Email */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>
                            <span className={styles.labelIcon}><MdEmail /></span>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            placeholder="votre.email@exemple.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <p className={styles.error}>{errors.email}</p>
                        )}
                    </div>

                    {/* Mot de passe */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>
                            <span className={styles.labelIcon}><FaLock /></span>
                            Mot de passe
                        </label>
                        <div className={styles.inputWrapper}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className={`${styles.input} ${styles.inputPassword} ${errors.password ? styles.inputError : ''}`}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className={styles.error}>{errors.password}</p>
                        )}
                    </div>

                    {/* Mot de passe oublié */}
                    <div className={styles.forgotPassword}>
                        <Link href="#" className={styles.forgotPasswordLink}>
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    {/* Bouton */}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Connexion...' : 'Se connecter'}
                    </button>

                </form>

                {/* Lien vers inscription */}
                <p className={styles.switchPage}>
                    Pas encore de compte ?{' '}
                    <Link href="/inscription" className={styles.switchPageLink}>
                        Créer un compte
                    </Link>
                </p>

            </div>
        </div>
    );
}
