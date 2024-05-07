

const semiCircle3dots = () => {
  return (
      <div className="h-36 w-60 bg-indigo-500 rounded-tl-full rounded-tr-full transform rotate-180">
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full"></div>   
        </div>
    
  )
}

export default semiCircle3dots
