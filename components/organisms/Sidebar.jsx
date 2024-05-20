import { activePageState, artistViewState, moodState, playlistViewState } from '@/atoms/atoms';
import { HomeIcon, MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/24/outline';
import { CiFaceSmile, CiFaceMeh, CiFaceFrown, } from 'react-icons/ci';
import { BsInfoCircle } from 'react-icons/bs';
import { useRecoilState } from 'recoil';

export default function Sidebar({ active }) {
    const [activePage, setActivePage] = useRecoilState(activePageState);
    const [artistView, setArtistView] = useRecoilState(artistViewState);
    const [playlistView, setPlaylistView] = useRecoilState(playlistViewState);
    const [mood] = useRecoilState(moodState);

    const changePage = (e) => {
        setArtistView("");
        setPlaylistView("");
        setActivePage(e.target.id === "" ? activePage : e.target.id);
    };

    return (
        <section 
            className="fixed bottom-0 z-50 flex items-center backdrop-blur-md bg-black/30
                        sm:flex-col sm:w-[90px] sm:h-screen sm:space-x-0 sm:justify-normal sm:px-0 
                        sm:from-[rgba(202,92,205,0.5)] sm:bg-gradient-to-r sm:backdrop-blur-none sm:bg-transparent
                        min-[375px]:w-screen h-[60px] space-x-8 justify-center px-4 w-screen"
        >
            <div 
                className="sm:space-y-8 sm:space-x-0 sm:flex-col sm:mt-10
                            space-x-16 flex max-[375px]:scale-75 max-[275px]:scale-50 max-[180px]:scale-[0.3]"
            >   
                <HomeIcon
                    className={`sidebar-icon ${activePage === "home" && "sidebar-icon-active"}`}
                    onClick={changePage}
                    id="home"
                />
                <SearchIcon
                    className={`sidebar-icon ${activePage === "search" && "sidebar-icon-active"}`}
                    onClick={changePage}
                    id="search"
                />
                <CiFaceFrown 
                    className={`sidebar-icon ${activePage === "mood" && "sidebar-icon-active"}
                                w-7 h-7 ${mood !== "Negative" && "hidden"}`}
                    onClick={changePage}
                    id="mood"
                />
                <CiFaceMeh 
                    className={`sidebar-icon ${activePage === "mood" && "sidebar-icon-active"}
                                w-7 h-7 ${mood !== "Neutral" && "hidden"}`}
                    onClick={changePage}
                    id="mood"
                />
                <CiFaceSmile 
                    className={`sidebar-icon ${activePage === "mood" && "sidebar-icon-active"}
                                w-7 h-7 ${mood !== "Positive" && "hidden"}`}
                    onClick={changePage}
                    id="mood"
                />
                <BsInfoCircle
                    className={`sidebar-icon ${activePage === "aboutUs" && "sidebar-icon-active"}
                                w-7 h-7 scale-[0.86]`}
                    onClick={changePage}
                    id="aboutUs"
                />
            </div>
        </section>
    );
};
