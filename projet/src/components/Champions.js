import styles from '../styles/Champions.module.css';

export default function Champions() {
    const champions = [
        { name: "Aatrox", attack: 8, defense: 4, key: "Aatrox" },
        { name: "Ahri", attack: 3, defense: 4, key: "Ahri" },
        { name: "Teemo", attack: 5, defense: 3, key: "Teemo" },
        { name: "Thresh", attack: 6, defense: 6, key: "Thresh" }
    ];

    return (
        <section id="champions" className={styles.section}>
            <h2 className={styles.title}>Aperçu des champions</h2>
            
            <div className={styles.championsGrid}>
                {champions.map((champion) => (
                    <div key={champion.key} className={styles.card}>
                        <div className={styles.cardImage}>
                            <img 
                                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.key}_0.jpg`}
                                alt={champion.name}
                            />
                        </div>
                        <div className={styles.cardInfo}>
                            <h3 className={styles.cardName}>{champion.name}</h3>
                            <div className={styles.cardStats}>
                                <span className={styles.statAttack}>⚔️ {champion.attack}</span>
                                <span className={styles.statDefense}>🛡️ {champion.defense}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <p className={styles.moreChampions}>+ de 150 champions disponibles</p>
        </section>
    );
}