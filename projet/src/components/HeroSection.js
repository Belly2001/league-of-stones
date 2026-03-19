import styles from '../styles/HeroSection.module.css';

export default function HeroSection() {
    return (
        <section className={styles.heroContainer}>
            {/* Vidéo en arrière-plan */}
            <video
                className={styles.videoBackground}
                autoPlay
                muted
                loop
                playsInline
            >
                <source src="/video/video1.mp4" type="video/mp4" />
            </video>

            {/* Ombre/dégradé côté gauche */}
            <div className={styles.shadowOverlay}></div>

            {/* Contenu texte aligné à gauche */}
            <div className={styles.heroContent}>
                <span className={styles.heroTag}>Jeu de cartes stratégique</span>
                
                <h1 className={styles.heroTitle}>League of Stones</h1>
                
                <p className={styles.heroDescription}>
                    Affrontez vos adversaires avec les champions de League of Legends 
                    dans des duels de cartes épiques. Construisez votre deck et 
                    prouvez votre valeur.
                </p>

                <div className={styles.heroButtons}>
                    <button className={styles.btnPrimary}>S'inscrire</button>
                    <button className={styles.btnSecondary}>Se connecter</button>
                </div>
            </div>
        </section>
    );
}