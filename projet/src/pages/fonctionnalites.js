import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import Features from '../components/Features';
import navStyles from '../styles/PageNav.module.css';

export default function FonctionnalitesPage() {
    return (
        <>
            <NavBar />
            <main>
                <Features />
            </main>
            <Link href="/nos-champions" className={navStyles.navBtn}>
                Nos Champions <FaArrowRight />
            </Link>
        </>
    );
}
