// ============================================
// COMPOSANT CONNEXION
// Permet à un utilisateur de se connecter
// ============================================

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// React Icons
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdEmail, MdError } from 'react-icons/md';

// Styles
import styles from '../styles/Auth.module.css';

export default function Connexion() {
    // ----------------
    // HOOKS
    // ----------------
    const router = useRouter();

    // ----------------
    // STATES
    // ----------------

    // Données du formulaire
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Erreurs de validation
    const [errors, setErrors] = useState({});

    // Message d'erreur global
    const [alert, setAlert] = useState({ type: '', message: '' });

    // État de chargement
    const [isLoading, setIsLoading] = useState(false);

    // Afficher/Masquer le mot de passe
    const [showPassword, setShowPassword] = useState(false);

    // ----------------
    // HANDLERS
    // ----------------

    /**
     * Gère les changements dans les inputs
     * @param {Event} e - Événement de changement
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Mettre à jour la valeur
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Effacer l'erreur du champ si elle existe
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    /**
     * Valide le formulaire avant soumission
     * @returns {boolean} - True si le formulaire est valide
     */
    const validateForm = () => {
        const newErrors = {};

        // Vérifier l'email
        if (!formData.email) {
            newErrors.email = 'L\'email est requis';
        }

        // Vérifier le mot de passe
        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Soumet le formulaire à l'API
     * @param {Event} e - Événement de soumission
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Réinitialiser l'alerte
        setAlert({ type: '', message: '' });

        // Valider le formulaire
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Appel API pour se connecter
            const response = await fetch('http://localhost:3000/login', {
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

            // Vérifier la réponse
            if (data.data && data.data.token) {
                // Succès : stocker les infos utilisateur
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('userId', data.data.id);
                localStorage.setItem('userName', data.data.name);
                localStorage.setItem('userEmail', data.data.email);

                // Rediriger vers la page deck
                router.push('/deck');

            } else if (data.message) {
                // Erreur retournée par l'API
                setAlert({
                    type: 'error',
                    message: data.message
                });
            }

        } catch (error) {
            // Erreur de connexion au serveur
            setAlert({
                type: 'error',
                message: 'Impossible de contacter le serveur. Vérifiez que le backend est lancé.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    // ----------------
    // RENDU
    // ----------------
    return (
        <div className={styles.container}>
            <div className={styles.card}>

                {/* En-tête */}
                <div className={styles.header}>
                    <h1 className={styles.title}>Connexion</h1>
                    <p className={styles.subtitle}>
                        Accédez à votre espace de jeu
                    </p>
                </div>

                {/* Alerte d'erreur */}
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

                    {/* Champ Email */}
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

                    {/* Champ Mot de passe */}
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

                    {/* Lien Mot de passe oublié */}
                    <div className={styles.forgotPassword}>
                        <Link href="#" className={styles.forgotPasswordLink}>
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    {/* Bouton Submit */}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>

                </form>

                {/* Lien vers Inscription */}
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