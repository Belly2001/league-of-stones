import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import Rules from '../components/Rules';
import navStyles from '../styles/PageNav.module.css';

export default function ReglesPage() {
    return (
        <>
            <NavBar />
            <main>
                <Rules />
            </main>
            <Link href="/inscription" className={navStyles.navBtn}>
                Jouer maintenant <FaArrowRight />
            </Link>
        </>
    );
}
