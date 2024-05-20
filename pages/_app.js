import '@/styles/globals.css';
import Wave from '@/components/organisms/Wave';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";
import { Space_Grotesk } from 'next/font/google';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Stars } from '@react-three/drei';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { motion } from "framer-motion";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700",],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Moodify - Elevate your mood with music</title>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </Head>
      <RecoilRoot>
        <main 
          onMouseMove={(e) => {/*setMouseX(e.clientX/360), setMouseY(e.clientY/360)*/}}
          className={`${spaceGrotesk.className} scrollbar-hide min-[375px]:overflow-x-hidden overflow-y-scroll overflow-x-scroll`}
        >
          {/* 3D Wavey Background */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut", }}
          >
            <div className="opacity-40 fixed z-[-50] w-screen h-screen">
              <Canvas>
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <Stars fade count={5000} speed={3} />
                <pointLight position={[20, 0, 20]} intensity={3} />
                <Wave color="#ca5ccd" segments={150} x={mouseX} y={mouseY} />
              </Canvas>
            </div>
          </motion.div>

          {/* Content */}
          <div className="min-w-fit min-[375px]:w-screen h-screen overflow-y-scroll min-[375px]:overflow-x-hidden overflow-x-scroll scrollbar-hide">
            <Component {...pageProps} />
          </div>
        </main>
      </RecoilRoot>
    </SessionProvider>
  );
};
