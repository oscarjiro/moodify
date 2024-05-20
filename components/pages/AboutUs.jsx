import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import members from '@/lib/aboutUsData';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { activePageState } from '@/atoms/atoms';

export default function AboutUs() {
    const [activePage, setActivePage] = useRecoilState(activePageState);
    const [selectedMember, setSelectedMember] = useState("oscar");

    const changeMemberView = (e) => setSelectedMember(e.target.id ? e.target.id : selectedMember);

    return (
        <section className={`text-white relative ${activePage === "aboutUs" ? "active-page" : "inactive-page"}`}>
            
            {/* Header */}
            <h1 className="header">About us</h1>

            {/* Nav Buttons */} 
            <div 
                className="right-0 absolute flex items-center justify-between 
                            min-[1100px]:w-[calc(100vw-620px)]
                            sm:w-[calc(100vw-340px)] sm:px-5 space-x-5
                            w-full z-30 sm:top-[70px]"
            >
                {members.map((member, i) => (
                    <button
                        key={member.id}
                        id={member.id}
                        onClick={changeMemberView}
                        className={`border-2 border-white/30 w-full text-center
                                    rounded-lg
                                    font-bold hover:text-white smooth-transition
                                    bg-gradient-to-br from-[#ca5ccd]/60 from-20%
                                    hover:bg-black/50 hover:scale-105
                                    ${member.id === selectedMember ?
                                        "text-white bg-black/50"
                                        : "text-white/50"}`}
                    >
                        <span className="gradient-text glow-sm">{i + 1}</span>
                    </button>
                ))}
            </div>

            <motion.div
                key={selectedMember}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex items-start space-x-8 sm:mt-0 mt-16 py-5">

                    {/* Image */}
                    <Image 
                        src={members?.find(member => member.id === selectedMember).image}
                        alt={members?.find(member => member.id === selectedMember).name}
                        width={200}
                        height={200}
                        className="rounded-2xl max-[450px]:w-[150px]"
                        unoptimized
                    />
                    
                    {/* Profile */}
                    <div className="flex flex-col justify-center sm:mt-16 mt-6 space-y-6">
                        <div className="flex flex-col space-y-1">
                            <h1 
                                className="gradient-text glow-sm font-bold
                                            min-[450px]:text-3xl text-xl"
                            >
                                {members?.find(member => member.id === selectedMember).name}
                            </h1>
                            <p 
                                className="font-light glow text-white/90
                                            min-[450px]:text-sm text-[10px]"
                            >
                                {members?.find(member => member.id === selectedMember).nim}
                            </p>
                        </div>
                        <p 
                            className="font-medium gradient-text glow bg-gradient-to-tr
                                        min-[450px]:text-base text-xs"
                        >
                            {members?.find(member => member.id === selectedMember).text}
                        </p>
                    </div>

                </div>
            </motion.div>
            
        </section>
    );
}


/*
{/* Header 
<h1 className='header'>About us</h1>

{/* Profile 
<div className="flex flex-col sm:flex-row">

    {/* Image 
    <div className="w-full sm:w-1/2">
        <div className="rounded-lg overflow-hidden">
            <Image
                src={members.find(member => member.id === selectedMember).image}
                alt={members.find(member => member.id === selectedMember).name}
                width={250}
                height={250}
                unoptimized
            />
        </div>
    </div>

    {/* Member Info 
    <div className="w-full sm:w-1/2">
        <div className="flex flex-col justify-center space-y-8">

            {/* Nav Buttons 
            <div className="flex justify-between mb-8">
                {members.map((member, i) => (
                    <button
                        id={member.id}
                        className={`p-2 text-purple-500 font-semibold hover:bg-purple-500 hover:text-white transition-colors duration-300 ease-in-out 
                                    ${member.id === selectedMember ? 'bg-purple-500 text-white' : 'bg-transparent'}`}
                        onClick={changeMemberView}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Name and Overview 
            <div className="flex flex-col">
                <h3 className="text-xl font-bold text-white mb-4">
                    {members.find(member => member.id === selectedMember).name}
                </h3>
                <p className="text-lg font-normal text-white mb-4">
                    {members.find(member => member.id === selectedMember).text}
                </p>
            </div>
           
        </div>
    </div>
</div>
*/