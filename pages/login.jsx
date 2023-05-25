
import Image from "next/image";
import Head from "next/head";
import Loader from "@/components/molecules/Loader";
import { getProviders, useSession } from "next-auth/react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login({ providers }) {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session && session.user.accessToken) router.push("/");
    }, [session]);
    
    if (session) return <Loader />;

    return (
        <>
            <Head>
                <title>Login - Moodify</title>
            </Head>
            <div className="h-screen w-screen flex flex-col items-center justify-center space-y-8">
                {/* Logo */}
                <Image 
                    src="/logo.png"
                    width={400}
                    height={0}
                    alt="Logo"
                    className="opacity-100 animate-pulse"
                    style={{ filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.75))" }}
                />

                {/* Provider Logins */}
                {Object.values(providers).map(provider => (
                    <div key={provider.name}>
                        <button 
                            onClick={() => {signIn(provider.id, { callbackUrl: "/" })}}
                            className="text-white py-4 px-6 rounded-full bg-[#101010] transition duration-400 ease-in-out text-base tracking-wider hover:scale-105 hover:bg-[#202020]"
                        >
                            Connect with <strong>{provider.name}</strong>
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};      

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: { 
            providers,
        },
    };
};
