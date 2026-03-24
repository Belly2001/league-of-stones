// Composant Demande - Liste des joueurs disponibles

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// React Icons
import { FaUsers, FaSync, FaArrowLeft } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';

// Styles
import styles from '../styles/Matchmaking.module.css';

export default function Demande({ participants, isLoading, error, onRefresh }) {
    const router = useRouter();

    // État des demandes : { odUserId: 'pending' | 'accepted' | null }
    const [requests, setRequests] = useState({});
    const [localError, setLocalError] = useState('');

    // Envoyer une demande à un joueur
    const sendRequest = async (userId) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:3001/matchmaking/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                },
                body: JSON.stringify({ odUserId: userId })
            });

            const data = await response.json();

            if (response.ok) {
                setRequests(prev => ({ ...prev, [userId]: 'pending' }));
            } else {
                setLocalError(data.message || 'Erreur lors de l\'envoi.');
            }

        } catch (err) {
            setLocalError('Erreur de connexion.');
        }
    };

    // Annuler une demande
    const cancelRequest = (userId) => {
        setRequests(prev => {
            const updated = { ...prev };
            delete updated[userId];
            return updated;
        });
    };

    // Accepter une demande
    const acceptRequest = async (userId) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:3001/matchmaking/acceptRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                },
                body: JSON.stringify({ odUserId: userId })
            });

            const data = await response.json();

            if (response.ok) {
                setRequests(prev => ({ ...prev, [userId]: 'accepted' }));
                setTimeout(() => {
                    router.push('/buildDeck');
                }, 1500);
            } else {
                setLocalError(data.message || 'Erreur.');
            }

        } catch (err) {
            setLocalError('Erreur de connexion.');
        }
    };

    // Obtenir les initiales d'un nom
    const getInitials = (name) => {
        if (!name) return '?';
        return name.charAt(0).toUpperCase();
    };

    // Afficher le bon bouton selon l'état
    const renderButton = (participant) => {
        const status = requests[participant.id];

        if (status === 'accepted') {
            return <button className={styles.btnAccepted}>Accepté(e)</button>;
        }

        if (status === 'pending') {
            return (
                <button 
                    className={styles.btnCancel}
                    onClick={() => cancelRequest(participant.id)}
                >
                    Annuler
                </button>
            );
        }

        return (
            <button 
                className={styles.btnYellow}
                onClick={() => sendRequest(participant.id)}
            >
                Demander
            </button>
        );
    };

    return (
        <div className={styles.cardLarge}>

            {/* Header */}
            <div className={styles.listHeader}>
                <h1 className={styles.listTitle}>
                    <FaUsers className={styles.listTitleIcon} />
                    Joueurs disponibles
                </h1>

                <button className={styles.refreshBtn} onClick={onRefresh}>
                    <FaSync />
                    Actualiser
                </button>
            </div>

            {/* Erreur */}
            {(error || localError) && (
                <div className={styles.error}>{error || localError}</div>
            )}

            {/* Contenu */}
            {isLoading ? (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Chargement...</p>
                </div>
            ) : participants.length === 0 ? (
                <div className={styles.emptyMessage}>
                    <GiCrossedSwords className={styles.emptyIcon} />
                    <p className={styles.emptyText}>
                        Aucun joueur disponible pour le moment.<br />
                        Attendez que d'autres joueurs rejoignent.
                    </p>
                </div>
            ) : (
                <div className={styles.participantsList}>
                    {participants.map(participant => (
                        <div key={participant.id} className={styles.participant}>
                            <div className={styles.participantInfo}>
                                <div className={styles.participantAvatar}>
                                    {getInitials(participant.name)}
                                </div>
                                <div>
                                    <p className={styles.participantName}>{participant.name}</p>
                                    <p className={styles.participantEmail}>{participant.email}</p>
                                </div>
                            </div>

                            {renderButton(participant)}
                        </div>
                    ))}
                </div>
            )}

            {/* Lien retour */}
            <Link href="/" className={styles.backLink}>
                <FaArrowLeft />
                Retour à l'accueil
            </Link>

        </div>
    );
}