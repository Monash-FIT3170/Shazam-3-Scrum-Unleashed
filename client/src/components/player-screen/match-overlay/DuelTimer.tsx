type duelTimerProps = {
    time: number;
}

const DuelTimer = ({time}: duelTimerProps ) => {
    return (
        // <div className="hidden md:block">
        // <div className="fixed text-white font-bold text-2xl px-8 rounded-2xl">
        //     <h2>Timer: {time}</h2>
        // </div>
        // </div>
        <div className="fixed text-white font-bold px-8 rounded-2xl">
            <h2 className="sm:text-xl md:text-2xl">Timer: {time}</h2>
        </div>    

);
};

export default DuelTimer;