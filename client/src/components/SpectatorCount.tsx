import eyeIcon from "../assets/EyeIcon.svg";

type SpectatorCountProps = {
    count: number
}

const SpectatorCount = ({count}: SpectatorCountProps) => {
    return (
        <div className='fixed bottom-5 right-7 text-4xl text-white font-bold items-center flex'>
            <div className='float-left scale-90'>
                <img src={eyeIcon} alt="EyeIcon" />
            </div>
            <p className='float-right ml-3'>{count}</p>
        </div>
    );
};

export default SpectatorCount;