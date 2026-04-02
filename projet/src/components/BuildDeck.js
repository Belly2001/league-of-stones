// Composant BuildDeck - Création du deck de 20 cartes

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// React Icons
import { FaArrowLeft, FaSearch, FaTimes, FaCheck } from 'react-icons/fa';
import { GiCardPick, GiCrossedSwords, GiShield } from 'react-icons/gi';
import { BsCollectionFill } from 'react-icons/bs';

// Styles
import styles from '../styles/BuildDeck.module.css';

export default function BuildDeck() {
    const router = useRouter();

    // States
    const [allCards, setAllCards] = useState([]);
    const [deck, setDeck] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Nombre max de cartes dans le deck
    const MAX_DECK_SIZE = 20;

    // Récupérer toutes les cartes au chargement
    useEffect(() => {
        const init = async () => {
            await initMatchStatus();
            await fetchCards();
        };
        init();
    }, []);

    // Initialiser le statut du match (ajoute "Deck is pending" si absent)
    const initMatchStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            // Premier appel pour initialiser le statut
            await fetch('http://localhost:3001/match/getMatch', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            // Deuxième appel pour confirmer que le statut est bien mis
            const response = await fetch('http://localhost:3001/match/getMatch', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            const text = await response.text();
            console.log('Match status initialisé:', text);

        } catch (err) {
            console.log('Erreur init match status:', err);
        }
    };

    // Fonction pour récupérer les cartes depuis l'API
    const fetchCards = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                router.push('/connexion');
                return;
            }

            console.log('Appel de /cards...');

            const response = await fetch('http://localhost:3001/cards', {
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
                setError('Réponse invalide du serveur');
                return;
            }

            console.log('Cartes reçues:', data);

            // Gérer différents formats de réponse
            if (Array.isArray(data)) {
                setAllCards(data);
            } else if (data.data && Array.isArray(data.data)) {
                setAllCards(data.data);
            } else if (data.message) {
                setError(data.message);
            }

        } catch (err) {
            console.error('Erreur fetchCards:', err);
            setError('Impossible de charger les cartes.');
        } finally {
            setIsLoading(false);
        }
    };

    // Ajouter une carte au deck
    const addToDeck = (card) => {
        if (deck.length >= MAX_DECK_SIZE) return;

        // Vérifier si la carte est déjà dans le deck
        const cardId = card._id || card.id;
        const isAlreadyInDeck = deck.some(c => (c._id || c.id) === cardId);
        if (isAlreadyInDeck) return;

        setDeck(prev => [...prev, card]);
    };

    // Retirer une carte du deck
    const removeFromDeck = (card) => {
        const cardId = card._id || card.id;
        setDeck(prev => prev.filter(c => (c._id || c.id) !== cardId));
    };

    // Vérifier si une carte est dans le deck
    const isInDeck = (card) => {
        const cardId = card._id || card.id;
        return deck.some(c => (c._id || c.id) === cardId);
    };

    // Filtrer les cartes par recherche
    const filteredCards = allCards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Valider le deck
    const validateDeck = async () => {
        if (deck.length !== MAX_DECK_SIZE) return;

        try {
            const token = localStorage.getItem('token');
            
            // Créer un tableau des cartes avec leur key
            const deckKeys = deck.map(card => ({ key: card.key }));
            
            // Convertir en JSON string pour l'URL
            const deckJson = JSON.stringify(deckKeys);

            console.log('Deck envoyé:', deckJson);

            const response = await fetch(`http://localhost:3001/match/initDeck?deck=${encodeURIComponent(deckJson)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            const text = await response.text();
            console.log('Réponse initDeck:', text);

            if (response.ok) {
                // Attendre et vérifier si le match est prêt
                setError('');
                checkIfMatchReady();
            } else {
                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                }
                setError(data.message || 'Erreur lors de la validation du deck.');
            }

        } catch (err) {
            console.error('Erreur validateDeck:', err);
            setError('Erreur lors de la validation du deck.');
        }
    };

    // Vérifier si le match est prêt
    const checkIfMatchReady = async () => {
        const token = localStorage.getItem('token');

        const check = async () => {
            try {
                const response = await fetch('http://localhost:3001/match/getMatch', {
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
                    return false;
                }

                console.log('Match status:', data.status);

                // Si le statut contient "Turn", le match a commencé
                if (data.status && data.status.includes('Turn')) {
                    router.push('/match');
                    return true;
                }

                return false;

            } catch (err) {
                return false;
            }
        };

        // Vérifier immédiatement
        const ready = await check();
        if (ready) return;

        // Sinon vérifier toutes les 2 secondes
        const interval = setInterval(async () => {
            const ready = await check();
            if (ready) {
                clearInterval(interval);
            }
        }, 2000);
    };

    // Générer l'URL de l'image du champion
    const getChampionImage = (card) => {
        const key = card.key || card.name;
        return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${key}_0.jpg`;
    };

    // Obtenir l'attaque d'une carte
    const getAttack = (card) => {
        if (card.info && card.info.attack !== undefined) return card.info.attack;
        if (card.atk !== undefined) return card.atk;
        return '?';
    };

    // Obtenir la défense d'une carte
    const getDefense = (card) => {
        if (card.info && card.info.defense !== undefined) return card.info.defense;
        if (card.def !== undefined) return card.def;
        return '?';
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>

                {/* Header */}
                <header className={styles.header}>
                    <Link href="/" className={styles.backButton}>
                        <span className={styles.backButtonIcon}><FaArrowLeft /></span>
                        Accueil
                    </Link>

                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>
                            <span className={styles.titleIcon}><GiCardPick /></span>
                            Créer mon Deck
                        </h1>
                        <p className={styles.subtitle}>Sélectionnez 20 champions pour votre deck</p>
                    </div>

                    <div className={styles.deckCount}>
                        <p className={styles.deckCountNumber}>{deck.length}/{MAX_DECK_SIZE}</p>
                        <p className={styles.deckCountLabel}>cartes</p>
                    </div>
                </header>

                {/* Contenu principal */}
                <main className={styles.main}>

                    {/* Section cartes disponibles */}
                    <section className={styles.availableSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionTitleIcon}><BsCollectionFill /></span>
                                Champions disponibles
                            </h2>

                            <div className={styles.searchBar}>
                                <FaSearch className={styles.searchIcon} />
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {isLoading ? (
                            <div className={styles.loading}>
                                <div className={styles.spinner}></div>
                                <p>Chargement des champions...</p>
                            </div>
                        ) : error ? (
                            <div className={styles.loading}>
                                <p>{error}</p>
                            </div>
                        ) : (
                            <div className={styles.cardsGrid}>
                                {filteredCards.map(card => (
                                    <div
                                        key={card._id || card.id}
                                        className={`${styles.card} ${isInDeck(card) ? styles.cardSelected : ''}`}
                                        onClick={() => addToDeck(card)}
                                    >
                                        <img
                                            src={getChampionImage(card)}
                                            alt={card.name}
                                            className={styles.cardImage}
                                        />
                                        <div className={styles.cardInfo}>
                                            <p className={styles.cardName}>{card.name}</p>
                                            <div className={styles.cardStats}>
                                                <span className={`${styles.stat} ${styles.statAtk}`}>
                                                    <GiCrossedSwords /> {getAttack(card)}
                                                </span>
                                                <span className={`${styles.stat} ${styles.statDef}`}>
                                                    <GiShield /> {getDefense(card)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Section Mon Deck */}
                    <section className={styles.deckSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionTitleIcon}><GiCrossedSwords /></span>
                                Mon Deck
                            </h2>
                        </div>

                        {deck.length === 0 ? (
                            <div className={styles.emptyDeck}>
                                <GiCardPick className={styles.emptyDeckIcon} />
                                <p className={styles.emptyDeckText}>
                                    Cliquez sur les champions<br />pour les ajouter à votre deck
                                </p>
                            </div>
                        ) : (
                            <div className={styles.deckCards}>
                                {deck.map(card => (
                                    <div key={card._id || card.id} className={styles.deckCard}>
                                        <img
                                            src={getChampionImage(card)}
                                            alt={card.name}
                                            className={styles.deckCardImage}
                                        />
                                        <div className={styles.deckCardInfo}>
                                            <p className={styles.deckCardName}>{card.name}</p>
                                            <div className={styles.deckCardStats}>
                                                <span className={styles.statAtk}><GiCrossedSwords /> {getAttack(card)}</span>
                                                <span className={styles.statDef}><GiShield /> {getDefense(card)}</span>
                                            </div>
                                        </div>
                                        <button
                                            className={styles.removeButton}
                                            onClick={() => removeFromDeck(card)}
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button
                            className={styles.validateButton}
                            disabled={deck.length !== MAX_DECK_SIZE}
                            onClick={validateDeck}
                        >
                            <FaCheck className={styles.validateIcon} />
                            {deck.length === MAX_DECK_SIZE
                                ? 'Valider le deck'
                                : `Encore ${MAX_DECK_SIZE - deck.length} carte(s)`
                            }
                        </button>
                    </section>

                </main>

            </div>
        </div>
    );
}