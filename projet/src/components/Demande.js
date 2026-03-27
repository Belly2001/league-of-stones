// Composant Demande - Liste des joueurs disponibles + Demandes reçues

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// React Icons
import { FaUsers, FaSync, FaArrowLeft, FaInbox } from 'react-icons/fa';
import { GiCrossedSwords } from 'react-icons/gi';

// Styles
import styles from '../styles/Matchmaking.module.css';

export default function Demande({ participants, receivedRequests = [], isLoading, error, onRefresh }) {
    const router = useRouter();

    // État des demandes envoyées
    const [requests, setRequests] = useState({});
    const [localError, setLocalError] = useState('');

    // Envoyer une demande à un joueur
    // Envoyer une demande à un joueur
    const sendRequest = async (matchmakingId) => {
        // Empêcher les demandes multiples
        if (requests[matchmakingId] === 'pending') return;

        // Marquer comme pending immédiatement
        setRequests(prev => ({ ...prev, [matchmakingId]: 'pending' }));

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:3001/matchmaking/request?matchmakingId=${matchmakingId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            const text = await response.text();
            console.log('Réponse request:', text);

            if (!response.ok) {
                // Si erreur, remettre le bouton "Demander"
                setRequests(prev => {
                    const updated = { ...prev };
                    delete updated[matchmakingId];
                    return updated;
                });

                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                }
                setLocalError(data.message || 'Erreur lors de l\'envoi.');
            }

        } catch (err) {
            console.error('Erreur:', err);
            setRequests(prev => {
                const updated = { ...prev };
                delete updated[matchmakingId];
                return updated;
            });
            setLocalError('Erreur de connexion.');
        }
    };

    // Annuler une demande
    const cancelRequest = (matchmakingId) => {
        setRequests(prev => {
            const updated = { ...prev };
            delete updated[matchmakingId];
            return updated;
        });
    };

    // Accepter une demande reçue
    const acceptRequest = async (matchmakingId) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:3001/matchmaking/acceptRequest?matchmakingId=${matchmakingId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            const text = await response.text();
            console.log('Réponse acceptRequest:', text);

            if (response.ok) {
                // Rediriger vers le buildDeck
                router.push('/buildDeck');
            } else {
                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                }
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

    // Afficher le bon bouton selon l'état (pour les joueurs disponibles)
    const renderButton = (participant) => {
        const matchmakingId = participant.matchmakingId;
        const status = requests[matchmakingId];

        if (status === 'pending') {
            return (
                <button 
                    className={styles.btnCancel}
                    onClick={() => cancelRequest(matchmakingId)}
                >
                    Annuler
                </button>
            );
        }

        return (
            <button 
                className={styles.btnYellow}
                onClick={() => sendRequest(matchmakingId)}
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

            {/* Section Demandes Reçues */}
            {receivedRequests.length > 0 && (
                <div className={styles.receivedSection}>
                    <h2 className={styles.receivedTitle}>
                        <FaInbox className={styles.receivedTitleIcon} />
                        Demandes reçues ({receivedRequests.length})
                    </h2>
                    <div className={styles.receivedList}>
                        {receivedRequests.map((request, index) => (
                            <div key={index} className={styles.receivedItem}>
                                <div className={styles.participantInfo}>
                                    <div className={styles.participantAvatar}>
                                        {getInitials(request.name)}
                                    </div>
                                    <div>
                                        <p className={styles.participantName}>{request.name}</p>
                                        <p className={styles.participantEmail}>Veut jouer avec vous</p>
                                    </div>
                                </div>
                                <button 
                                    className={styles.btnAccept}
                                    onClick={() => acceptRequest(request.matchmakingId)}
                                >
                                    Accepter
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Contenu - Liste des joueurs */}
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
                        <div key={participant.matchmakingId} className={styles.participant}>
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