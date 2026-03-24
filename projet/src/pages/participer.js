// Page Participer - Gère l'affichage de Participer ou Demande

import { useState } from 'react';
import { useRouter } from 'next/router';

// Composants
import Participer from '../components/Participer';
import Demande from '../components/Demande';

// Styles
import styles from '../styles/Matchmaking.module.css';

export default function ParticiperPage() {
    const router = useRouter();

    // State : l'utilisateur a rejoint ou pas ?
    const [hasJoined, setHasJoined] = useState(false);

    // States pour Participer
    const [isJoining, setIsJoining] = useState(false);
    const [joinError, setJoinError] = useState('');

    // States pour Demande
    const [participants, setParticipants] = useState([]);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [listError, setListError] = useState('');

    // Fonction pour rejoindre le matchmaking
    const handleJoin = async () => {
        setIsJoining(true);
        setJoinError('');

        try {
            const token = localStorage.getItem('token');

            if (!token) {
                router.push('/connexion');
                return;
            }

            const response = await fetch('http://localhost:3001/matchmaking/participate', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            const data = await response.json();

            if (response.ok || !data.message) {
                setHasJoined(true);
                fetchParticipants();
            } else {
                setJoinError(data.message);
            }

        } catch (err) {
            setJoinError('Impossible de contacter le serveur.');
        } finally {
            setIsJoining(false);
        }
    };

    // Fonction pour récupérer la liste des participants
    const fetchParticipants = async () => {
        setIsLoadingList(true);
        setListError('');

        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:3001/matchmaking/getAll', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            const data = await response.json();

            if (Array.isArray(data)) {
                setParticipants(data);
            } else if (data.data && Array.isArray(data.data)) {
                setParticipants(data.data);
            } else if (data.message) {
                setListError(data.message);
            }

        } catch (err) {
            setListError('Impossible de charger les participants.');
        } finally {
            setIsLoadingList(false);
        }
    };

    return (
        <div className={styles.container}>
            {!hasJoined ? (
                <Participer 
                    onJoin={handleJoin}
                    isLoading={isJoining}
                    error={joinError}
                />
            ) : (
                <Demande 
                    participants={participants}
                    isLoading={isLoadingList}
                    error={listError}
                    onRefresh={fetchParticipants}
                />
            )}
        </div>
    );
}
