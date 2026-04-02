import { FaArrowRight } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import Presentation from '../components/Presentation';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Champions from '../components/Champions';
import Rules from '../components/Rules';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import SectionDivider from '../components/SectionDivider';
import navStyles from '../styles/SectionNav.module.css';

export default function Home() {
    return (
        <>
            <NavBar />
            <main>
                <HeroSection />

                <SectionDivider />

                <div id="presentation" className={navStyles.wrapper}>
                    <Presentation />
                    <a href="#how-it-works" className={navStyles.btn}>
                        Comment jouer <FaArrowRight />
                    </a>
                </div>

                <SectionDivider />

                <div id="how-it-works" className={navStyles.wrapper}>
                    <HowItWorks />
                    <a href="#features" className={navStyles.btn}>
                        Fonctionnalités <FaArrowRight />
                    </a>
                </div>

                <SectionDivider />

                <div id="features" className={navStyles.wrapper}>
                    <Features />
                    <a href="#champions" className={navStyles.btn}>
                        Nos Champions <FaArrowRight />
                    </a>
                </div>

                <SectionDivider />

                <div id="champions" className={navStyles.wrapper}>
                    <Champions />
                    <a href="#rules" className={navStyles.btn}>
                        Règles du jeu <FaArrowRight />
                    </a>
                </div>

                <SectionDivider />

                <div id="rules" className={navStyles.wrapper}>
                    <Rules />
                    <a href="/inscription" className={navStyles.btn}>
                        Jouer maintenant <FaArrowRight />
                    </a>
                </div>

                <SectionDivider />

                <CallToAction />
            </main>
            <Footer />
        </>
    );
}
