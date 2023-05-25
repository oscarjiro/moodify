import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export default function Search({ search, setSearch }) {
    return (
        <div className="w-full bg-[#1a1a1a] rounded-full overflow-hidden border-2 border-[#333333] p-1.5 px-5 pr-8 flex items-center">
            <div className="h-4 w-4 rounded-full border-2 flex-shrink-0 animate-pulse" />
            <input 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="bg-[#1a1a1a] text-white border-none lg:w-full focus:ring-0 outline-none placeholder-[#fafafa] text-xs"
                placeholder="Search..."
            />

            <div className="flex items-center divide-dotted divide-x-4 divide-[#333] ml-auto">
                <div className="flex space-x-2 pr-5">
                    <button className="tag">Hip-Hop</button>
                    <button className="tag">House</button>
                    <button className="tag">Minimal</button>
                </div>

                <div className="flex items-center space-x-1.5 text-[#cecece] pl-4">
                    <AdjustmentsHorizontalIcon className="w-5 animate-pulse"/>
                    <span className="font-medium text-sm">Filters</span>
                </div>
            </div>
        </div>
    );
};