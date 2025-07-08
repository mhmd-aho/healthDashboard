import Chart from 'chart.js/auto'
import { useRef,useEffect } from "react";
export default function Exercise(props){
    const activities = [
    "aerobics", "archery", "badminton", "basketball", "bicycling", "boxing", "climbing",
    "dancing", "fencing", "football", "golf", "gymnastics", "handball", "hiking", "hockey",
    "jogging", "jumping rope", "karate", "kayaking", "lacrosse", "martial arts", "pilates",
    "rowing", "running", "skating", "skiing", "soccer", "softball", "squash", "swimming",
    "table tennis", "tennis", "volleyball", "walking", "wrestling", "yoga"
  ];
    const doughnut = useRef();
    const goal = props.caloriesGoal;
    const burned = props.caloriesBurned;
    const remaining = burned >= goal ? 0 : goal - burned;
    useEffect(() => {
        if (!doughnut.current || !goal || !burned) return;
        const doughnutInstance = new Chart(doughnut.current, {
            type:'pie',
            data: {
                labels:['Calories Burned', 'Remaining'],
                datasets: [{
                    data: [burned , remaining],
                    backgroundColor: ['#10b981', 'rgb(128, 128, 128)'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins:{
                    legend:{ position: 'bottom' }
                }
            }
        });
        return () => doughnutInstance.destroy();
        
    }, [burned, goal, remaining]);
    const handleSubmit = e =>{
        e.preventDefault()
        props.getFetch(props.activity,props.weight,props.mins);
        }
    const handleClick = ()=>{
        const goal = props.caloriesGoal;
        const burned = props.caloriesBurned;
        let score = null;
        if(burned >= goal){
            score = 5
        }else if(burned < goal && burned > goal * 0.75){
            score = 4
        }else if(burned < goal * 0.75 && burned >= goal * 0.5){
            score = 3
        }else if(burned < goal * 0.5 && burned >= goal * 0.25){
            score = 2
        }else if(burned < goal * 0.25){
            score = 1
        }
        props.setWeekData(prev => ({...prev,[props.day]: {...prev[props.day],exercise: score}}));
    }    
    return(
        <section  className="w-full h-full sm:col-start-2 lg:col-start-3 col-start-1 row-start-5  row-end-7 sm:row-start-3 sm:row-end-4 lg:row-start-2 flex flex-col gap-3 items-center shadow-xl bg-white dark:bg-black/70 rounded-2xl p-4" >
        <h2 className="text-xl font-bold self-baseline">Exercise</h2>
        {
            props.weekData?.[props.day]?.exercise?
            <p className='m-auto text-xl'>Exercise logged successfully.</p>:
            <>
                <form onSubmit={handleSubmit}  className="flex flex-col gap-3 items-center w-full">
                    <div className="self-baseline flex items-center gap-2 w-full h-9 text-base">
                        <input onChange={e=>props.setMins(e.target.value)} min={0} type="number" className="border px-1 rounded-lg w-1/3 h-full" placeholder="duration"/>
                        <span className="text-gray-500">mins</span>
                        <input onChange={e=>props.setWeight(e.target.value)} min={0} type="number" className="border px-1 rounded-lg w-1/3 h-full" placeholder="Weight"/>
                        <span className="text-gray-500">lbs</span>
                        <input  className="border px-1 rounded-lg w-1/3 h-full"  onChange={e=>props.setCaloriesGoal(e.target.value)} min={0} type="number" placeholder='Goal' name="caloriesGoal" id="caloriesGoal" />
                        <span className="text-gray-500">Calories</span>
                    </div>  
                    <select onChange={e=>props.setActivity(e.target.value)}  className="w-full h-9 border rounded-lg" name="type" id="type"> 
                        {activities.map((activity,index)=>(<option key={index} value={activity}>{activity}</option>))}
                    </select>
                    <input type="submit" value='✓ Calculate' className="w-full h-9 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-500/80 duration-500"/>
                </form>
                <div className="w-full h-1/3">
                    <canvas ref={doughnut} className="w-full h-full"></canvas>            
                </div>
                <button onClick={handleClick}  className="px-2 sm:px-1 rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-500/80 duration-500">Submit</button>
            </>
        }
        </section>
    )
}