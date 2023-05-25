import { activePageState, moodState } from '@/atoms/playerAtom';
import { HomeIcon, MagnifyingGlassIcon, UserIcon, } from '@heroicons/react/24/solid';
import { CiFaceSmile, CiFaceMeh, CiFaceFrown, } from 'react-icons/ci';
import { useRecoilState } from 'recoil';

export default function Sidebar({ active }) {
    const [activePage, setActivePage] = useRecoilState(activePageState);
    const [mood] = useRecoilState(moodState);

    const changePage = (e) => setActivePage(e.target.id === "" ? activePage : e.target.id);

    return (
        <section 
            className="fixed bottom-0 z-50 flex items-center backdrop-blur-md bg-black/30
                        sm:flex-col sm:w-[90px] sm:h-screen sm:space-x-0 sm:justify-normal sm:px-0 
                        sm:from-[rgba(202,92,205,0.5)] sm:bg-gradient-to-r sm:backdrop-blur-none sm:bg-transparent
                        min-[375px]:w-screen h-[60px] space-x-8 justify-center px-4 w-[375px]"
        >
            <div 
                className="sm:space-y-8 sm:space-x-0 sm:flex-col sm:mt-10
                            space-x-16 flex"
            >
                <HomeIcon 
                    className={`sidebar-icon ${activePage === "home" && "sidebar-icon-active"}`}
                    onClick={changePage}
                    id="home"
                 />
                <MagnifyingGlassIcon 
                    className={`sidebar-icon ${activePage === "search" && "sidebar-icon-active"}`}
                    onClick={changePage}
                    id="search"
                 />
                <CiFaceSmile 
                    className={`sidebar-icon ${activePage === "mood" && "sidebar-icon-active"}
                                w-7 h-7`}
                    onClick={changePage}
                    id="mood"
                />
                <UserIcon
                    className={`sidebar-icon ${activePage === "aboutUs" && "sidebar-icon-active"}`}
                    onClick={changePage}
                    id="aboutUs"
                />
            </div>
        </section>
    );
};
