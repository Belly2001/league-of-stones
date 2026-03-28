// Composant HowItWorks - Comment jouer avec vidéo en fond

import styles from '../styles/HowItWorks.module.css';

export default function HowItWorks() {
    const steps = [
        {
            number: 1,
            title: 'Créez votre compte',
            description: 'Inscrivez-vous avec votre email universitaire pour accéder au jeu.'
        },
        {
            number: 2,
            title: 'Construisez votre deck',
            description: 'Sélectionnez 20 champions parmi tous ceux disponibles.'
        },
        {
            number: 3,
            title: 'Trouvez un adversaire',
            description: 'Rejoignez le matchmaking et affrontez d\'autres joueurs.'
        },
        {
            number: 4,
            title: 'Combattez !',
            description: 'Utilisez vos cartes stratégiquement pour vaincre votre adversaire.'
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
                        <div key={step.number} className={styles.step}>
                            <div className={styles.stepNumber}>{step.number}</div>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDescription}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
