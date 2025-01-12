import { Menu, Transition } from "@headlessui/react";
import { Fragment } from 'react';
import { ArrowLeftOnRectangleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { AiTwotoneExperiment } from 'react-icons/ai';
import { signOut, useSession } from "next-auth/react"
import { experimentalPlayerState } from "@/atoms/atoms";
import { useRecoilState } from "recoil";

export default function Dropdown() {
    const { data: session } = useSession();
    const [experimentalPlayer, setExperimentalPlayer] = useRecoilState(experimentalPlayerState);

    return (
        <Menu as="div" className="w-24 h-12 relative flex items-center">
            <div className="w-full absolute right-1 group">
                <Menu.Button className="flex items-center w-full px-4 py-3 text-sm font-medium text-white bg[#1a1a1a] rounded-full hover:bg[#3e3e3e]">
                    <ChevronDownIcon className="w-6 glow-sm" aria-hidden="true" />
                    {session.user.image ? (
                        <img 
                            src={session.user.image} 
                            alt={session.user.name} 
                            className="rounded-full w-11 h-11 absolute -right-1 object-cover"
                        />
                    ) : (
                        <div className="rounded-full w-11 h-11 absolute -right-1 object-cover flex items-center justify-center border-2 border-[#262626] bg-[#101010]">
                            {session.user.name[0]}
                        </div>
                    )}
                </Menu.Button>
            </div>
            <Transition 
                as={Fragment}
                enter="transition ease-in-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in-out duration-75"
                leaveFrom="transform ease-in-out duration-300 opacity-100 scale-100"
                leaveTo="transform ease-in-out duration-300 opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 w-56 mt-24 origin-top-right bg-black/40 backdrop-blur-lg divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active && "bg-white/[0.08]"} group glow flex rounded-md items-center w-full px-2 py-2 text-sm font-sembibold tracking-wide text-white cursor-pointer smooth-transition`}
                                    onClick={() => signOut({ redirect: false })}
                                >
                                        <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                                        Log Out
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${active && "bg-white/[0.08]"} group glow flex rounded-md items-center w-full px-2 py-2 text-sm font-sembibold tracking-wide text-white cursor-pointer smooth-transition`}
                                    onClick={() => setExperimentalPlayer(!experimentalPlayer)}
                                >
                                        <AiTwotoneExperiment className="w-5 h-5 mr-2" aria-hidden="true" />
                                        {experimentalPlayer ? "Quit" : "Enter"} Experimental
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
