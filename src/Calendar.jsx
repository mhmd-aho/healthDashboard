import { useEffect } from "react";
import { format,startOfMonth,endOfMonth,getDate,getYear} from "date-fns";
export default function Calendar(props){
    const today = new Date();
    const todayName = format(today,'EEE');
    const dayNumber = getDate(today);
    const currentMonth = format(today,'MMMM');
    const startDay = startOfMonth(today);
    const start = getDate(startDay);
    const end = getDate(endOfMonth(today));
    const startName =  format(startDay,'EEE');
    const weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    const startIndex = weekDays.indexOf(startName);
    const reorderedWeekDays = weekDays.slice(startIndex).concat(weekDays.slice(0, startIndex));
    const year = getYear(today);
    const daysElements = [];
    for(let day = start; day<=end;day++){
        daysElements.push(<p className={`size-fit px-2 py-0.5 ${day === dayNumber ?'bg-emerald-500 rounded-full': ''}`}key={day} >{day}</p>)
    }
    useEffect(()=>{
        props.setDay(todayName);
    },[todayName])
    return(
        <section className="w-full h-full p-4 lg:col-end-3 lg:row-end-4 sm:col-end-3  sm:row-start-2 sm:row-end-3 col-start-1 row-start-3  flex flex-col gap-3 items-center shadow-xl bg-white dark:bg-black/70 rounded-2xl" >
            <h2 className="text-xl font-bold self-baseline">{currentMonth},{year}</h2>
            <div className="w-full flex justify-around ">
                {reorderedWeekDays.map((day,index)=>(
                    <p key={index}>{day}</p>
                ))}
                
            </div>
            <div className="w-full h-3/4 grid grid-cols-7 grid-rows-4 place-items-center">
            {daysElements}
            </div>
        </section>
    )
}