import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import HowItWorks from '../components/HowItWorks';
import navStyles from '../styles/PageNav.module.css';

export default function CommentJouerPage() {
    return (
        <>
            <NavBar />
            <main>
                <HowItWorks />
            </main>
            <Link href="/fonctionnalites" className={navStyles.navBtn}>
                Fonctionnalités <FaArrowRight />
            </Link>
        </>
    );
}
