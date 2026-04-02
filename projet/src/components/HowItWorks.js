// Composant HowItWorks - Comment jouer avec vidéo en fond

import styles from '../styles/HowItWorks.module.css';

// React Icons
import { FaUserPlus, FaUsers, FaLayerGroup, FaGamepad, FaLightbulb } from 'react-icons/fa';
import { GiFireDash } from 'react-icons/gi';


export default function HowItWorks() {
    const steps = [
        {
            number: 1,
            title: 'Inscription/Connexion',
            description: 'Inscrivez-vous avec votre email universitaire pour accéder au jeu.',
            backInfo: 'Utilisez votre email @univ-tlse2.fr pour créer un compte. La connexion est sécurisée.',
            icon: <FaUserPlus />,
            backIcon: <FaLightbulb />
        },
        {
            number: 2,
            title: 'Trouvez un adversaire',
            description: 'Rejoignez le matchmaking et affrontez d\'autres joueurs.',
            backInfo: 'Envoyez une demande à un joueur en ligne. Dès qu\'il accepte, le match commence !',
            icon: <FaUsers />,
            backIcon: <FaLightbulb />
        },
        {
            number: 3,
            title: 'Construisez votre deck',
            description: 'Sélectionnez 20 champions parmi tous ceux disponibles.',
            backInfo: 'Chaque champion a des stats uniques (ATK/DEF). Choisissez stratégiquement !',
            icon: <FaLayerGroup />,
            backIcon: <FaLightbulb />
        },
        {
            number: 4,
            title: 'Combattez !',
            description: 'Utilisez vos cartes stratégiquement pour vaincre votre adversaire.',
            backInfo: 'Piochez, jouez vos cartes, attaquez ! Le premier à 0 PV perd la partie.',
            icon: <GiFireDash />,
            backIcon: <FaLightbulb />
        }
    ];

    return (
        <section id="how-it-works" className={styles.container}>

            {/* Vidéo en arrière-plan */}
            <video
                className={styles.backgroundVideo}
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/video/videohow.mp4" type="video/mp4" />
            </video>

            {/* Overlay sombre */}
            <div className={styles.overlay}></div>

            {/* Contenu */}
            <div className={styles.content}>
                <h2 className={styles.title}>Comment jouer ?</h2>
                <p className={styles.subtitle}>
                    Suivez ces étapes simples pour commencer votre aventure
                </p>

                <div className={styles.steps}>
                    {steps.map((step) => (
                        <div key={step.number} className={styles.cardContainer}>
                            <div className={styles.card}>
                                
                                {/* Face avant */}
                                <div className={styles.cardFront}>
                                    <div className={styles.stepIcon}>{step.icon}</div>
                                    <h3 className={styles.stepTitle}>{step.title}</h3>
                                    <p className={styles.stepDescription}>{step.description}</p>
                                </div>

                                {/* Face arrière */}
                                <div className={styles.cardBack}>
                                    <div className={styles.backIcon}>{step.backIcon}</div>
                                    <h3 className={styles.backTitle}>En savoir plus</h3>
                                    <p className={styles.backInfo}>{step.backInfo}</p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
}