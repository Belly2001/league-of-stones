import styles from '../styles/HowItWorks.module.css';

export default function HowItWorks() {
    const steps = [
        {
            number: 1,
            title: "Créez votre compte",
            description: "Inscrivez-vous gratuitement"
        },
        {
            number: 2,
            title: "Construisez votre deck",
            description: "Choisissez 20 champions"
        },
        {
            number: 3,
            title: "Trouvez un adversaire",
            description: "Matchmaking en ligne"
        },
        {
            number: 4,
            title: "Combattez !",
            description: "Réduisez ses PV à 0"
        }
    ];

    return (
        <section id="how-it-works" className={styles.section}>
            <h2 className={styles.title}>Comment jouer ?</h2>
            
            <div className={styles.stepsContainer}>
                {steps.map((step) => (
                    <div key={step.number} className={styles.step}>
                        <div className={styles.stepNumber}>{step.number}</div>
                        <h3 className={styles.stepTitle}>{step.title}</h3>
                        <p className={styles.stepDescription}>{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}