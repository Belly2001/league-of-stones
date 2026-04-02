import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import Champions from '../components/Champions';
import navStyles from '../styles/PageNav.module.css';

export default function NosChampionsPage() {
    return (
        <>
            <NavBar />
            <main>
                <Champions />
            </main>
            <Link href="/regles" className={navStyles.navBtn}>
                Règles du jeu <FaArrowRight />
            </Link>
        </>
    );
}
