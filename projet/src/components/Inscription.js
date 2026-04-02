// Composant Inscription - Création de compte utilisateur

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// React Icons
import { FaUser, FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { MdEmail, MdError } from 'react-icons/md';
import { GiCrossedSwords } from 'react-icons/gi';

// Styles
import styles from '../styles/Auth.module.css';

export default function Inscription() {
    const router = useRouter();

    // States
    const [formData, setFormData] = useState({
        name: '',
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

        if (!formData.name.trim()) {
            newErrors.name = 'Le nom d\'utilisateur est requis';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'Minimum 3 caractères';
        } else if (formData.name.trim().length > 28) {
            newErrors.name = 'Maximum 28 caractères';
        }

        if (!formData.email) {
            newErrors.email = 'L\'email est requis';
        } else if (!formData.email.endsWith('@univ-tlse2.fr')) {
            newErrors.email = 'Email @univ-tlse2.fr requis';
        }

        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Minimum 6 caractères';
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
        const response = await fetch('http://localhost:3001/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                name: formData.name.trim(),
                password: formData.password
            })
        });

        const data = await response.json();

        if (data.data && data.data.id) {
            setAlert({
                type: 'success',
                message: 'Compte créé ! Redirection...'
            });

            setTimeout(() => {
                router.push('/connexion');
            }, 2000);

        } else if (data.message) {
            // Affiche le vrai message d'erreur de l'API
            setAlert({ type: 'error', message: data.message });
        } else {
            setAlert({ type: 'error', message: 'le compte est crée' });
        }

    } catch (error) {
        // Seulement si le serveur est vraiment inaccessible
        console.error('Erreur:', error);
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
                    <h1 className={styles.title}>Créer un compte</h1>
                    <p className={styles.subtitle}>Rejoignez l'arène</p>
                </div>

                {/* Alerte */}
                {alert.message && (
                    <div className={`${styles.alert} ${alert.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
                        <span className={styles.alertIcon}>
                            {alert.type === 'success' ? <FaCheckCircle /> : <MdError />}
                        </span>
                        {alert.message}
                    </div>
                )}

                {/* Formulaire */}
                <form className={styles.form} onSubmit={handleSubmit}>

                    {/* Nom d'utilisateur */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>
                            <span className={styles.labelIcon}><FaUser /></span>
                            Nom d'utilisateur
                        </label>
                        <input
                            type="text"
                            name="name"
                            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                            placeholder="Votre pseudo"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name ? (
                            <p className={styles.error}>{errors.name}</p>
                        ) : (
                            <p className={styles.hint}>Entre 3 et 28 caractères</p>
                        )}
                    </div>

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
                            placeholder="email@univ-tlse2.fr"
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

                    {/* Bouton */}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Création...' : 'S\'inscrire'}
                    </button>

                </form>

                {/* Lien vers connexion */}
                <p className={styles.switchPage}>
                    Déjà un compte ?{' '}
                    <Link href="/connexion" className={styles.switchPageLink}>
                        Se connecter
                    </Link>
                </p>

            </div>
        </div>
    );
}