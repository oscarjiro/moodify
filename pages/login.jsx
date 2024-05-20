
import Image from "next/image";
import Head from "next/head";
import Loader from "@/components/molecules/Loader";
import { motion } from "framer-motion";
import { getProviders, useSession } from "next-auth/react";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login({ providers }) {
    const router = useRouter();
    const { error } = router.query;
    const { data: session } = useSession();

    console.log("Login Error", error);

    useEffect(() => {
        if (session && session.user.accessToken) router.push("/");
    }, [session, router]);
    
    if (session) return <Loader />;

    return (
        <>
            <Head>
                <title>Login - Moodify</title>
            </Head>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 4, ease: "easeOut" }}
            >
                <div className="h-screen w-screen flex flex-col items-center justify-center min-[480px]:space-y-8 space-y-4 min-w-[375px] px-10">
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
                                className="max-[480px]:scale-75 text-white py-4 px-6 rounded-full bg-[#101010] transition duration-400 ease-in-out text-base tracking-wider hover:scale-105 hover:bg-[#202020]"
                            >
                                Connect with <strong>{provider.name}</strong>
                            </button>
                        </div>
                    ))}
                {error === 'OAuthCallback' && (
                    <div className="text-white font-light text-[10px] min-[450px]:text-xs sm:text-sm text-center whitespace-nowrap">
                        <p>
                            Your account has not been listed for Moodify.
                        </p>
                        <p>
                            Contact the owner on Instagram 
                            <a href="https://instagram.com/oscarjiro" className="font-bold glow-sm"> @oscarjiro</a>.
                        </p>
                    </div>
                )}
                </div>

            </motion.div>
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
