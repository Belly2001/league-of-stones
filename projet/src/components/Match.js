// Composant Match - Combat

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// React Icons
import { FaArrowLeft, FaHeart, FaLayerGroup } from 'react-icons/fa';
import { GiCardPick, GiCrossedSwords } from 'react-icons/gi';

// Styles
import styles from '../styles/Match.module.css';

export default function Match() {
    const router = useRouter();

    // State du match
    const [matchData, setMatchData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // State pour les interactions
    const [selectedCard, setSelectedCard] = useState(null);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [cardPicked, setCardPicked] = useState(false);

    // Info du joueur connecté
    const [myId, setMyId] = useState('');
    const [myName, setMyName] = useState('');

    // Charger le match au démarrage
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        setMyId(userId);
        setMyName(userName);

        fetchMatch();

        // Rafraîchir toutes les 3 secondes
        const interval = setInterval(fetchMatch, 3000);
        return () => clearInterval(interval);
    }, []);

    // Récupérer l'état du match
    const fetchMatch = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                router.push('/connexion');
                return;
            }

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
                setError('Réponse invalide du serveur');
                return;
            }

            console.log('Match data:', data);

            if (data && data.player1) {
                setMatchData(data);

                // Déterminer si c'est mon tour
                const userId = localStorage.getItem('userId');
                const amIPlayer1 = data.player1.id === userId;
                const myPlayer = amIPlayer1 ? data.player1 : data.player2;

                setIsMyTurn(myPlayer.turn === true);
                setCardPicked(myPlayer.cardPicked === true);
            } else if (data.message) {
                setError(data.message);
            }

        } catch (err) {
            console.error('Erreur fetchMatch:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Piocher une carte
    const pickCard = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:3001/match/pickCard', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            const text = await response.text();
            console.log('Réponse pickCard:', text);

            if (response.ok) {
                setCardPicked(true);
                fetchMatch();
            } else {
                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                }
                setError(data.message || 'Erreur lors de la pioche');
            }

        } catch (err) {
            setError('Erreur de connexion');
        }
    };

    // Jouer une carte
    const playCard = async (cardKey) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:3001/match/playCard?card=${cardKey}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            const text = await response.text();
            console.log('Réponse playCard:', text);

            if (response.ok) {
                fetchMatch();
            } else {
                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                }
                setError(data.message || 'Erreur lors du jeu de la carte');
            }

        } catch (err) {
            setError('Erreur de connexion');
        }
    };

    // Attaquer une carte adverse
    const attackCard = async (myCardKey, enemyCardKey) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:3001/match/attack?card=${myCardKey}&ennemyCard=${enemyCardKey}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            const text = await response.text();
            console.log('Réponse attack:', text);

            setSelectedCard(null);

            if (response.ok) {
                fetchMatch();
            } else {
                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                }
                setError(data.message || 'Erreur lors de l\'attaque');
            }

        } catch (err) {
            setError('Erreur de connexion');
        }
    };

    // Attaquer le joueur adverse
    const attackPlayer = async (myCardKey) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:3001/match/attackPlayer?card=${myCardKey}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            const text = await response.text();
            console.log('Réponse attackPlayer:', text);

            setSelectedCard(null);

            if (response.ok) {
                fetchMatch();
            } else {
                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                }
                setError(data.message || 'Erreur lors de l\'attaque du joueur');
            }

        } catch (err) {
            setError('Erreur de connexion');
        }
    };

    // Fin de tour
    const endTurn = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:3001/match/endTurn', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            const text = await response.text();
            console.log('Réponse endTurn:', text);

            if (response.ok) {
                setSelectedCard(null);
                fetchMatch();
            } else {
                let data;
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                }
                setError(data.message || 'Erreur lors de la fin de tour');
            }

        } catch (err) {
            setError('Erreur de connexion');
        }
    };

    // Terminer le match
    const finishMatch = async () => {
        try {
            const token = localStorage.getItem('token');

            await fetch('http://localhost:3001/match/finishMatch', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'www-authenticate': token
                }
            });

            router.push('/');

        } catch (err) {
            router.push('/');
        }
    };

    // Générer l'URL de l'image
    const getChampionImage = (card) => {
        const key = card.key || card.name;
        return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${key}_0.jpg`;
    };

    // Obtenir mes infos et celles de l'adversaire
    const getPlayersInfo = () => {
        if (!matchData) return { me: null, enemy: null };

        const amIPlayer1 = matchData.player1.id === myId;

        return {
            me: amIPlayer1 ? matchData.player1 : matchData.player2,
            enemy: amIPlayer1 ? matchData.player2 : matchData.player1,
            enemyName: amIPlayer1 ? matchData.player2.name : matchData.player1.name
        };
    };

    // Vérifier si le match est terminé
    const isGameOver = () => {
        if (!matchData || !matchData.status) return false;
        return matchData.status.includes('won');
    };

    // Vérifier si j'ai gagné
    const didIWin = () => {
        if (!matchData || !matchData.status) return false;
        const amIPlayer1 = matchData.player1.id === myId;
        if (amIPlayer1) {
            return matchData.status === 'Player 1 won';
        } else {
            return matchData.status === 'Player 2 won';
        }
    };

    // Clic sur une carte de mon plateau
    const handleMyBoardCardClick = (card) => {
        if (!isMyTurn) return;
        if (card.attack === true) return; // Déjà attaqué ce tour

        if (selectedCard && selectedCard.key === card.key) {
            setSelectedCard(null);
        } else {
            setSelectedCard(card);
        }
    };

    // Clic sur une carte adverse
    const handleEnemyBoardCardClick = (card) => {
        if (!isMyTurn || !selectedCard) return;
        attackCard(selectedCard.key, card.key);
    };

    // Clic sur le joueur adverse (zone)
    const handleEnemyPlayerClick = () => {
        if (!isMyTurn || !selectedCard) return;
        const { enemy } = getPlayersInfo();
        if (enemy.board && enemy.board.length === 0) {
            attackPlayer(selectedCard.key);
        }
    };

    // Loading
    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Chargement du match...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Pas de match
    if (!matchData) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.loading}>
                        <p>{error || 'Aucun match trouvé'}</p>
                        <Link href="/" className={styles.backButton}>
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const { me, enemy, enemyName } = getPlayersInfo();

    // Game Over
    if (isGameOver()) {
        return (
            <div className={styles.gameOver}>
                <h1 className={`${styles.gameOverTitle} ${didIWin() ? styles.victory : styles.defeat}`}>
                    {didIWin() ? '🏆 VICTOIRE !' : '💀 DÉFAITE...'}
                </h1>
                <p className={styles.gameOverText}>
                    {didIWin() 
                        ? 'Félicitations ! Vous avez vaincu votre adversaire !' 
                        : 'Vous avez perdu ce combat. Retentez votre chance !'}
                </p>
                <button className={styles.gameOverBtn} onClick={finishMatch}>
                    Retour à l'accueil
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>

                {/* Header */}
                <header className={styles.header}>
                    <Link href="/" className={styles.backButton}>
                        <FaArrowLeft />
                        Quitter
                    </Link>

                    <div className={styles.turnInfo}>
                        {isMyTurn ? "🎮 C'est votre tour !" : "⏳ Tour de l'adversaire..."}
                    </div>

                    <div style={{ width: 100 }}></div>
                </header>

                {/* Erreur */}
                {error && <div className={styles.error}>{error}</div>}

                {/* Zone de combat */}
                <div className={styles.battleArea}>

                    {/* Mon plateau (gauche) */}
                    <div className={`${styles.playerZone} ${styles.myZone}`}>
                        <div className={styles.playerInfo}>
                            <h2 className={styles.playerName}>{myName} (Moi)</h2>
                            <div className={styles.playerStats}>
                                <span className={`${styles.stat} ${styles.statHp}`}>
                                    <FaHeart /> {me.hp}
                                </span>
                                <span className={`${styles.stat} ${styles.statDeck}`}>
                                    <FaLayerGroup /> {me.deck}
                                </span>
                            </div>
                        </div>

                        <p className={styles.boardTitle}>Mon Plateau</p>

                        <div className={styles.board}>
                            {me.board && me.board.length > 0 ? (
                                me.board.map((card, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.boardCard} 
                                            ${selectedCard && selectedCard.key === card.key ? styles.boardCardSelected : ''} 
                                            ${card.attack === false ? styles.boardCardCanAttack : ''}`}
                                        onClick={() => handleMyBoardCardClick(card)}
                                    >
                                        <img
                                            src={getChampionImage(card)}
                                            alt={card.name}
                                            className={styles.boardCardImage}
                                        />
                                        <div className={styles.boardCardInfo}>
                                            <p className={styles.boardCardName}>{card.name}</p>
                                            <div className={styles.boardCardStats}>
                                                <span className={styles.atkStat}>⚔️ {card.info.attack}</span>
                                                <span className={styles.defStat}>🛡️ {card.info.defense}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.emptyBoard}>
                                    Aucune carte sur le plateau
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Plateau adverse (droite) */}
                    <div 
                        className={`${styles.playerZone} ${styles.enemyZone}`}
                        onClick={handleEnemyPlayerClick}
                    >
                        <div className={styles.playerInfo}>
                            <h2 className={styles.playerName}>{enemyName} (Adversaire)</h2>
                            <div className={styles.playerStats}>
                                <span className={`${styles.stat} ${styles.statHp}`}>
                                    <FaHeart /> {enemy.hp}
                                </span>
                                <span className={`${styles.stat} ${styles.statDeck}`}>
                                    <FaLayerGroup /> {enemy.deck}
                                </span>
                            </div>
                        </div>

                        <p className={styles.boardTitle}>Son Plateau</p>

                        <div className={styles.board}>
                            {enemy.board && enemy.board.length > 0 ? (
                                enemy.board.map((card, index) => (
                                    <div
                                        key={index}
                                        className={styles.boardCard}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEnemyBoardCardClick(card);
                                        }}
                                    >
                                        <img
                                            src={getChampionImage(card)}
                                            alt={card.name}
                                            className={styles.boardCardImage}
                                        />
                                        <div className={styles.boardCardInfo}>
                                            <p className={styles.boardCardName}>{card.name}</p>
                                            <div className={styles.boardCardStats}>
                                                <span className={styles.atkStat}>⚔️ {card.info.attack}</span>
                                                <span className={styles.defStat}>🛡️ {card.info.defense}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={styles.emptyBoard}>
                                    {selectedCard 
                                        ? 'Cliquez ici pour attaquer le joueur !' 
                                        : 'Aucune carte sur le plateau'}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Ma main */}
                <div className={styles.handArea}>
                    <h3 className={styles.handTitle}>
                        <GiCardPick /> Ma Main ({Array.isArray(me.hand) ? me.hand.length : me.hand} cartes)
                    </h3>

                    <div className={styles.hand}>
                        {Array.isArray(me.hand) && me.hand.map((card, index) => (
                            <div
                                key={index}
                                className={styles.handCard}
                                onClick={() => isMyTurn && playCard(card.key)}
                            >
                                <img
                                    src={getChampionImage(card)}
                                    alt={card.name}
                                    className={styles.handCardImage}
                                />
                                <div className={styles.handCardInfo}>
                                    <p className={styles.handCardName}>{card.name}</p>
                                    <div className={styles.handCardStats}>
                                        <span className={styles.atkStat}>⚔️ {card.info.attack}</span>
                                        <span className={styles.defStat}>🛡️ {card.info.defense}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Boutons d'action */}
                <div className={styles.actions}>
                    <button
                        className={`${styles.actionBtn} ${styles.pickBtn}`}
                        onClick={pickCard}
                        disabled={!isMyTurn || cardPicked}
                    >
                        <GiCardPick />
                        {cardPicked ? 'Déjà pioché' : 'Piocher'}
                    </button>

                    <p className={styles.infoMessage}>
                        {selectedCard 
                            ? `Carte sélectionnée : ${selectedCard.name} - Cliquez sur une cible !` 
                            : isMyTurn 
                                ? 'Sélectionnez une carte de votre plateau pour attaquer' 
                                : 'Attendez votre tour...'}
                    </p>

                    <button
                        className={`${styles.actionBtn} ${styles.endTurnBtn}`}
                        onClick={endTurn}
                        disabled={!isMyTurn}
                    >
                        <GiCrossedSwords />
                        Fin de tour
                    </button>
                </div>

            </div>
        </div>
    );
}