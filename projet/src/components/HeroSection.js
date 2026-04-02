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

                <h1 className={styles.heroTitle}>League of Stones</h1>

                <p className={styles.heroDescription}>
                    Affrontez vos adversaires avec les champions de League of Legends
                    dans des duels de cartes de notre application. Construisez votre deck et
                    prouvez à votre adversaire votre puissance. <br />
                    Sélectionnez vos 20 champions, affrontez vos adversaires en temps réel <br />  
                    Pour en savoir plus sur l'application, l'historique et son inspiration , cliquez ici bas!             
                </p>

                <div className={styles.heroButtons}>
                    <a href="#presentation" className={styles.btnPresentation}>
                        Présentation
                    </a>
                </div>
            </div>
        </section>
    );
}