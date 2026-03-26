// Composant Presentation - Présentation du jeu

import styles from '../styles/Presentation.module.css';

export default function Presentation() {
    return (
        <section id="presentation" className={styles.container}>
            <div className={styles.content}>

                {/* Partie gauche - Texte */}
                <div className={styles.textSection}>
                    <h2 className={styles.title}>LEAGUE OF STONES</h2>
                    <p className={styles.description}>
                        Dans ce projet, il est question de développer un mashup (mélange) 
                        de deux jeux vidéos. En utilisant le système de jeu de Hearthstone (HS) 
                        développé par Blizzard™ nous intégrerons les données ouvertes du jeu 
                        League Of Legends (LoL) développé par Riot Games.
                    </p>
                </div>

                {/* Partie droite - Card */}
                <div className={styles.cardSection}>
                    <div className={styles.card}>
                        <img 
                            src="/image/image9.jpg" 
                            alt="Hearthstone" 
                            className={styles.cardImage}
                        />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Découvrez Hearthstone</h3>
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