import styles from '../styles/Features.module.css';
import { GiTargeting, GiBrain, GiLaurelsTrophy } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";

export default function Features() {
    const features = [
        {
            icon: <GiTargeting />,
            title: "Simple à apprendre",
            description: "Des règles claires pour commencer rapidement"
        },
        {
            icon: <GiBrain />,
            title: "Stratégie et réflexion",
            description: "Chaque décision compte pour la victoire"
        },
        {
            icon: <FaUsers />,
            title: "Jouez avec vos amis",
            description: "Défiez vos amis en ligne"
        },
        {
            icon: <GiLaurelsTrophy />,
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
                        <span className={styles.featureIcon}>
                            {feature.icon}
                        </span>
                        <div className={styles.featureContent}>
                            <h3 className={styles.featureTitle}>
                                {feature.title}
                            </h3>
                            <p className={styles.featureDescription}>
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}