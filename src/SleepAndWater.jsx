export default function SleepAndWater(props) {
    let sleep = null;
    let hydration = null
    const handleOnChangeSleep = e =>{
        const sleepInput = e.target.value;
        if ( sleepInput  < 4){
            sleep = 1;
        }
        else if(sleepInput  >= 4  && sleepInput  <= 5){
            sleep = 2;
        }
        else if(sleepInput  > 5 && sleepInput  <= 6){
            sleep = 3;
        }
        else if(sleepInput  > 6 && sleepInput  < 8 ){
            sleep = 4;
        }
        else if(sleepInput  >= 8){
            sleep = 5;
        }
        };
        const handleOnSubmitSleep = e =>{
            e.preventDefault()
            sleep && props.setWeekData(prev => ({
                ...prev,[props.day]: {...prev[props.day], sleep: sleep}}))
            }
        const handleOnChangeHydration = e =>{
            const hydrationInput = e.target.value
        if (hydrationInput <= 0.5){
            hydration = 1;
            }
        else if(hydrationInput> 0.5 && hydrationInput <= 1 ){
            hydration = 2;
        }
        else if(hydrationInput > 1 && hydrationInput <= 1.6){
            hydration = 3;
        }
        else if(hydrationInput > 1.6 && hydrationInput < 2){
            hydration = 4;
        }
        else if(hydrationInput >= 2){
            hydration = 5;
        }
        }
        const handleOnSubmitHydration =  e =>{
            e.preventDefault()
            hydration && props.setWeekData(prev => ({
                ...prev,[props.day]: {...prev[props.day],hydration: hydration}}))
        }
    return (
        <section className="shadow-md p-4 bg-white dark:bg-black/70 rounded-2xl flex flex-col lg:justify-around justify-evenly lg:col-start-2 sm:col-start-1 sm:row-start-3 row-start-4 lg:row-start-1 w-full h-full">
            <form onSubmit={handleOnSubmitSleep}  className="flex flex-col gap-2">
                <label className="font-bold text-lg" htmlFor="sleep">Sleep</label>
                <div className="w-full flex items-center justify-between" >
                    {props.weekData?.[props.day]?.sleep?
                    <p>Sleep hours logged successfully.</p>:
                    <>
                        <div className="flex w-3/4 ">
                            <input min={0} onChange={handleOnChangeSleep} type="number" name="sleep" id="sleep" className="border rounded-lg" />
                            <span className="text-gray-500" >Hrs</span>
                        </div>
                        <input type="submit" className="px-2 sm:px-1 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-500/80 duration-500"/>
                    </>
                    }
                </div>
            </form>
            <form onSubmit={handleOnSubmitHydration}   className="flex flex-col gap-2">
                <label className="font-bold text-lg" htmlFor="water">Hydration</label>
                <div className="w-full flex items-center  justify-between">
                    {props.weekData?.[props.day]?.hydration ?
                    <p>Water intake logged successfully.</p> :
                    <>
                        <div className="flex w-3/4" >
                            <input min={0} onChange={handleOnChangeHydration} type="number" name="water" id="water" className="border rounded-lg"/>
                            <span className="text-gray-500" >Liter</span>
                        </div>
                        <input type="submit" className="px-2 sm:px-0 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-500/80 duration-500"/>
                    </>
                    }
                </div>
            </form>
        </section>
  );
}
