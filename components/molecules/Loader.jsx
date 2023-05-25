import { RotateLoader } from "react-spinners";

export default function Loader() {
    return (
        <div className="h-screen w-screen bg-black flex items-center justify-center">
            <RotateLoader 
                color="rgba(255,255,255,1)"
                loading={true}
                size={50}
            />
        </div>
    );
};
