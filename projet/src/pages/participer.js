// Page Participer - Gère l'affichage de Participer ou Demande

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Composants
import Participer from '../components/Participer';
import Demande from '../components/Demande';

// Styles
import styles from '../styles/Matchmaking.module.css';

export default function ParticiperPage() {
    const router = useRouter();

    // Protection de route
    const [isAuthorized, setIsAuthorized] = useState(false);

    // State : l'utilisateur a rejoint ou pas ?
    const [hasJoined, setHasJoined] = useState(false);

    // States pour Participer
    const [isJoining, setIsJoining] = useState(false);
    const [joinError, setJoinError] = useState('');

    // States pour Demande
    const [participants, setParticipants] = useState([]);
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [isLoadingList, setIsLoadingList] = useState(false);
    const [listError, setListError] = useState('');

    // Vérifier si l'utilisateur est connecté
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/connexion');
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    // Vérifier périodiquement si un match a été créé
    useEffect(() => {
        if (!hasJoined || !isAuthorized) return;

        const checkMatch = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const response = await fetch('http://localhost:3001/matchmaking/participate', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'www-authenticate': token
                    }
                });

                const text = await response.text();
                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    return;
                }

                console.log('Check match:', data);

                // Si un match existe, rediriger vers BuildDeck
                if (data.match) {
                    router.push('/buildDeck');
                }

                // Mettre à jour les demandes reçues
                if (data.request && Array.isArray(data.request)) {
                    setReceivedRequests(data.request);
                }

            } catch (err) {
                console.error('Erreur check match:', err);
            }
        };

        // Vérifier toutes les 3 secondes
        const interval = setInterval(checkMatch, 3000);

        return () => clearInterval(interval);

    }, [hasJoined, isAuthorized, router]);

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

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                data = { message: text };
            }

            console.log('Réponse participate:', data);

            if (response.ok) {
                // Si un match existe déjà, rediriger
                if (data.match) {
                    router.push('/buildDeck');
                    return;
                }

                setHasJoined(true);
                
                // Stocker les demandes reçues
                if (data.request && Array.isArray(data.request)) {
                    setReceivedRequests(data.request);
                }
                
                fetchParticipants();
            } else {
                setJoinError(data.message || 'Erreur');
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

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                data = [];
            }

            console.log('Participants reçus:', data);

            if (Array.isArray(data)) {
                setParticipants(data);
            } else if (data.data && Array.isArray(data.data)) {
                setParticipants(data.data);
            }

            // Récupérer aussi les demandes reçues
            const responseParticipate = await fetch('http://localhost:3001/matchmaking/participate', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            const textParticipate = await responseParticipate.text();
            let dataParticipate;
            try {
                dataParticipate = JSON.parse(textParticipate);
            } catch {
                dataParticipate = {};
            }

            // Si un match existe, rediriger
            if (dataParticipate.match) {
                router.push('/buildDeck');
                return;
            }

            if (dataParticipate.request && Array.isArray(dataParticipate.request)) {
                setReceivedRequests(dataParticipate.request);
            }

        } catch (err) {
            setListError('Impossible de charger les participants.');
        } finally {
            setIsLoadingList(false);
        }
    };

    // Afficher rien si pas autorisé
    if (!isAuthorized) {
        return null;
    }

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
                    receivedRequests={receivedRequests}
                    isLoading={isLoadingList}
                    error={listError}
                    onRefresh={fetchParticipants}
                />
            )}
        </div>
    );
}