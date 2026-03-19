import styles from '../styles/Rules.module.css';

export default function Rules() {
    const rules = [
        { number: "150", label: "Points de vie" },
        { number: "20", label: "Cartes par deck" },
        { number: "5", label: "Cartes max sur plateau" },
        { number: "4", label: "Cartes de départ" }
    ];

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Règles du jeu</h2>
            
            <div className={styles.rulesGrid}>
                {rules.map((rule, index) => (
                    <div key={index} className={styles.rule}>
                        <p className={styles.ruleNumber}>{rule.number}</p>
                        <p className={styles.ruleLabel}>{rule.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}