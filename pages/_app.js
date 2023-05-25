import '@/styles/globals.css';
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from 'recoil';
import { Space_Grotesk } from '@next/font/google';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Wave from '@/components/organisms/Wave';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700",],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <main className={`${spaceGrotesk.className} scrollbar-hide min-[375px]:overflow-x-hidden overflow-y-scroll overflow-x-scroll`}>
          {/* 3D Wavey Background */}
          <div className="opacity-40 fixed z-[-100] w-screen h-screen">
            <Canvas>
              <OrbitControls />
              <ambientLight intensity={0.5} />
              <pointLight position={[20, 0, 20]} intensity={3} />
              <Wave color="#ca5ccd" segments={150} />
            </Canvas>
          </div>

          {/* Content */}
          <div className="min-w-fit min-[375px]:w-screen h-screen overflow-y-scroll min-[375px]:overflow-x-hidden overflow-x-scroll scrollbar-hide">
            <Component {...pageProps} />
          </div>
        </main>
      </RecoilRoot>
    </SessionProvider>
  );
};
