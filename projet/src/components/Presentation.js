// Composant Presentation - Présentation du jeu

import styles from '../styles/Presentation.module.css';

export default function Presentation() {
    return (
        <section id="presentation" className={styles.container}>
            <div className={styles.content}>

                {/* Partie gauche - Texte */}
                <div className={styles.textSection}>
                    <h2 className={styles.title}>PRÉSENTATION</h2>
                    <p className={styles.description}>
                        League Of Stones est un mashup de deux jeux vidéos. En utilisant le système de jeu de Hearthstone (HS) 1 développé par Blizzard™.
                         Y sont integré les données ouvertes du jeu League Of Legends (LoL) 2 développé par
                        Riot Games™.  League of Stones propose un jeu de cartes
                        dont les cartes proviennent de LoL. Deux joueurs s’affrontant possèdent un deck 
                        de 20 cartes et 150 points de vie. Chaque carte décrit un champion avec une statistique
                        d’attaque et une de défense. Les joueurs jouent chacun leur tour dans l’objectif de réduire
                        les points de vie de l’adversaire à 0 pour gagner la partie.
                    </p>
                </div>

                {/* Partie droite - Card */}
                <div className={styles.cardSection}>
                    <div className={styles.card}>
                        <img 
                            src="/image/image8.jpg" 
                            alt="Hearthstone" 
                            className={styles.cardImage}
                        />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Découvrez Hearthstone</h3>
                            <p>Notre Inspiration</p>
                            <a 
                                href="https://hearthstone.blizzard.com/fr-fr" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles.cardButton}
                            >
                                En savoir plus
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}