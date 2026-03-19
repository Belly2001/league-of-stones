import styles from '../styles/CallToAction.module.css';

export default function CallToAction() {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Prêt à combattre ?</h2>
            <p className={styles.description}>
                Rejoignez des milliers de joueurs et prouvez votre valeur
            </p>
            <button className={styles.btnStart}>Commencer maintenant</button>
        </section>
    );
}