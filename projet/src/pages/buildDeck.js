import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BuildDeck from '../components/BuildDeck';

export default function BuildDeckPage() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/connexion');
        } else {
            setIsAuthorized(true);
        }
    }, [router]);

    if (!isAuthorized) return null;

    return <BuildDeck />;
}