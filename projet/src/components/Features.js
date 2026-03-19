import styles from '../styles/Features.module.css';

export default function Features() {
    const features = [
        {
            icon: "🎯",
            title: "Simple à apprendre",
            description: "Des règles claires pour commencer rapidement"
        },
        {
            icon: "🧠",
            title: "Stratégie et réflexion",
            description: "Chaque décision compte pour la victoire"
        },
        {
            icon: "👥",
            title: "Jouez avec vos amis",
            description: "Défiez vos amis en ligne"
        },
        {
            icon: "🏆",
            title: "Champions de LoL",
            description: "Tous vos champions préférés en cartes"
        }
    ];

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Fonctionnalités</h2>
            
            <div className={styles.featuresGrid}>
                {features.map((feature, index) => (
                    <div key={index} className={styles.feature}>
                        <span className={styles.featureIcon}>{feature.icon}</span>
                        <div className={styles.featureContent}>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}