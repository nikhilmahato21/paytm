import comet from "../assets/comet2.png";
export const Appbar = ({name}) => {
    return <div className="shadow  h-20 py-5 flex justify-between">
        <div className="flex flex-col font-bold font-xl font-mono justify-center h-full ml-4">
            <div className="flex justify-center items-center gap-1"> <h1>Parallel Pay </h1> <img src={comet} alt="" className="w-6"/> </div>
        
        </div>
        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello {name}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {name[0]}
                </div>
            </div>
        </div>
    </div>
}