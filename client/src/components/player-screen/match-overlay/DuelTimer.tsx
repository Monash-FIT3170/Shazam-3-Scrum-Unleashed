type duelTimerProps = {
    time: number;
}

const DuelTimer = ({time}: duelTimerProps ) => {
    return (
        <div className="hidden md:block">
            <div className="fixed text-white font-bold text-2xl px-8 rounded-2xl">
                <h2>Timer: {time}</h2>
            </div>
        </div>
    );
};

export default DuelTimer;