// Composant Champions - Carrousel des champions

import styles from '../styles/Champions.module.css';

export default function Champions() {
    // Liste des champions (clé pour l'image)
    const champions = [
        'Ahri',
        'Akali',
        'Yasuo',
        'Zed',
        'Lux',
        'Jinx',
        'LeeSin',
        'Thresh',
        'Vayne',
        'Riven',
        'Katarina',
        'Darius',
        'Garen',
        'Teemo',
        'Ezreal',
        'Ashe'
    ];

    // Générer l'URL de l'image
    const getImage = (champion) => {
        return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`;
    };

    // Doubler la liste pour créer l'effet infini
    const allChampions = [...champions, ...champions];

    return (
        <section id="champions" className={styles.container}>
            <h2 className={styles.title}>Nos Champions</h2>

            <div className={styles.carousel}>
                <div className={styles.track}>
                    {allChampions.map((champion, index) => (
                        <div key={index} className={styles.card}>
                            <img
                                src={getImage(champion)}
                                alt={champion}
                                className={styles.cardImage}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}