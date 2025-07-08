import { useState,useEffect } from "react";
import Header from "./Header";
import Mood from "./mood/Mood";
import SleepAndWater from "./SleepAndWater";
import Calendar from "./Calendar";
import Info from "./Info";
import Exercise from './Exercise'
import MyChart from "./Chart";
import {getISOWeek} from 'date-fns'
export default function App() {
  const [darkMode, setDarkMode] = useState("");
  const [weight, setWeight] = useState(0);
  const [mins, setMins] = useState(0);
  const [activity, setActivity] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [caloriesGoal, setCaloriesGoal] = useState(0);
  const [day,setDay] = useState();
  const defaultWeekData = {
      'Mon':{
      mood:null,
      exercise: null,
      sleep:null,
      hydration:null
    },
    'Tue':{
      mood:null,
      exercise: null,
      sleep:null,
      hydration:null
    },
    'Wed':{
      mood:null,
      exercise: null,
      sleep:null,
      hydration:null
    },
    'Thu':{
      mood:null,
      exercise: null,
      sleep:null,
      hydration:null
    },
    'Fri':{
      mood:null,
      exercise: null,
      sleep:null,
      hydration:null
    },
    'Sat':{
      mood:null,
      exercise: null,
      sleep:null,
      hydration:null
    },
    'Sun':{
      mood:null,
      exercise: null,
      sleep:null,
      hydration:null
    },
    }
  const [weekData,setWeekData]= useState(()=>{
    const saved = localStorage.getItem('weekData');
    return saved ? JSON.parse(saved): defaultWeekData}
  )
  useEffect(() => {
  const savedWeek = localStorage.getItem('weekData');
  const savedWeekTimestamp = localStorage.getItem('weekStart');
  const now = new Date();
  const currentWeek = getISOWeek(now);
  if (!savedWeek || !savedWeekTimestamp || parseInt(savedWeekTimestamp) !== currentWeek) {
    setWeekData(defaultWeekData);
    localStorage.setItem('weekData', JSON.stringify(defaultWeekData));
    localStorage.setItem('weekStart', currentWeek.toString());
  }
}, []);
  useEffect(() => {
  localStorage.setItem('weekData', JSON.stringify(weekData));
}, [weekData]);
  const apiKey = 'haqdLVAdWGiEcfewhtsv8w==fUTKNYAekoC60T2U';
  async function getFetch() {
  const url = `https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}&weight=${weight}&duration=${mins}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error(`API error: ${response.status} ${response.statusText}`);
    const data = await response.json();
    if (activity === 'soccer' || activity === 'football') {
      setCaloriesBurned(data[1]?.total_calories || 0);
    } else {
      setCaloriesBurned(data[0]?.total_calories || 0);
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error.message);
    return null;
  }
}

  return (
    <div className={`${darkMode} font-chillax w-full  p-6 flex flex-col items-center justify-basline text-stone-900 bg-gradient-to-br   from-emerald-200 to-20% to-emerald-100 dark:from-stone-900 dark:to-stone-900 dark:text-emerald-50 `}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="lg:h-[1000px] h-[1800px]  max-w-[1300px] lg:p-5 gap-3 lg:gap-6 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-rows-5 sm:grid-rows-4 grid-rows-7 dark:bg-stone-900">
        <Mood day={day} weekData={weekData} setWeekData={setWeekData}/>
        <SleepAndWater day={day} weekData={weekData} setWeekData={setWeekData}/>
        <Calendar setDay={setDay} />
        <Info weekData={weekData}  day= {day} />
        <Exercise weekData={weekData} setWeekData={setWeekData} day={day} setCaloriesGoal={setCaloriesGoal} caloriesGoal={caloriesGoal} getFetch={getFetch} setActivity={setActivity} caloriesBurned={caloriesBurned} activity={activity} setMins={setMins} mins={mins} setWeight={setWeight} weight={weight}/>
        <MyChart weekData={weekData} />
      </main>
    </div>
  )
}

