// ============================================
// COMPOSANT INSCRIPTION
// Permet à un utilisateur de créer un compte
// ============================================

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// React Icons
import { FaUser, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import { MdEmail, MdError } from 'react-icons/md';

// Styles
import styles from '../styles/Auth.module.css';

export default function Inscription() {
    // ----------------
    // HOOKS
    // ----------------
    const router = useRouter();

    // ----------------
    // STATES
    // ----------------
    
    // Données du formulaire
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // Erreurs de validation
    const [errors, setErrors] = useState({});

    // Message global (succès ou erreur)
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

        // Vérifier le nom (3-28 caractères selon l'API)
        if (!formData.name.trim()) {
            newErrors.name = 'Le nom d\'utilisateur est requis';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'Le nom doit avoir au moins 3 caractères';
        } else if (formData.name.trim().length > 28) {
            newErrors.name = 'Le nom ne doit pas dépasser 28 caractères';
        }

        // Vérifier l'email
        if (!formData.email) {
            newErrors.email = 'L\'email est requis';
        } else if (!formData.email.endsWith('@univ-tlse2.fr')) {
            newErrors.email = 'L\'email doit se terminer par @univ-tlse2.fr';
        }

        // Vérifier le mot de passe
        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Le mot de passe doit avoir au moins 6 caractères';
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
            // Appel API pour créer le compte
            const response = await fetch('http://localhost:3000/user', {
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

            // Vérifier la réponse
            if (data.data && data.data.id) {
                // Succès : afficher le message et rediriger
                setAlert({
                    type: 'success',
                    message: 'Compte créé avec succès ! Redirection vers la connexion...'
                });

                // Rediriger après 2 secondes
                setTimeout(() => {
                    router.push('/connexion');
                }, 2000);

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
                    <h1 className={styles.title}>Créer un compte</h1>
                    <p className={styles.subtitle}>
                        Rejoignez League of Stones et commencez à jouer
                    </p>
                </div>

                {/* Alerte (succès ou erreur) */}
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

                    {/* Champ Nom d'utilisateur */}
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
                            placeholder="votre.email@univ-tlse2.fr"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email ? (
                            <p className={styles.error}>{errors.email}</p>
                        ) : (
                            <p className={styles.hint}>Utilisez votre email universitaire (@univ-tlse2.fr)</p>
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

                    {/* Bouton Submit */}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Création en cours...' : 'S\'inscrire'}
                    </button>

                </form>

                {/* Lien vers Connexion */}
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
