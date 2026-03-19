import NavBar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Champions from '../components/Champions';
import Rules from '../components/Rules';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <>
            <NavBar />
            <main>
                <HeroSection />
                <HowItWorks />
                <Features />
                <Champions />
                <Rules />
                <CallToAction />
            </main>
            <Footer />
        </>
    );
}
