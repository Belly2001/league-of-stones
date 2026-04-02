import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import Presentation from '../components/Presentation';
import navStyles from '../styles/PageNav.module.css';

export default function PresentationPage() {
    return (
        <>
            <NavBar />
            <main>
                <Presentation />
            </main>
            <Link href="/comment-jouer" className={navStyles.navBtn}>
                Comment jouer <FaArrowRight />
            </Link>
        </>
    );
}
