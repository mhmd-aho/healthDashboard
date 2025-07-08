export default function Header(props){
    const handleOnSwitch = e =>{
        props.darkMode === 'dark'?
        props.setDarkMode(null) :
        props.setDarkMode(e.target.value)
    }
    return(
        <header className="flex justify-between items-center sm:px-10 w-full h-20 sm:mb-6 mb-2">
            <h1 className="sm:text-3xl text-xl font-extrabold">Health Dashboard</h1>
            <div className="flex sm:justify-between gap-1 items-center  h-full">
                <h2 className="font-medium">Light</h2>
            <label htmlFor="toggle" className="w-12 h-6 rounded-full relative bg-gray-950/50 ">
                <input type="checkbox" onClick={handleOnSwitch} id="toggle" value='dark'  className="sr-only peer" />
                <span className="w-2/5 h-4/5 absolute rounded-full left-1 top-[3px] bg-green-50 peer-checked:left-[22px] peer-checked:bg-green-50/60 duration-300"></span>
            </label>
            <h2 className="font-medium">Dark</h2>
            </div>
        </header>
    )
}