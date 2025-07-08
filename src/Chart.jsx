  import Chart from 'chart.js/auto'
  import { useRef,useEffect,useMemo } from "react";
  export default function MyChart(props){
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const exerciseData = useMemo(()=>days.map(day =>props.weekData?.[day]?.exercise ?? 1),[props.weekData]) ;
    const moodData = useMemo(()=>days.map(day=> props.weekData?.[day]?.mood ?? 1),[props.weekData]) 
    const hydrationData = useMemo(()=>days.map(day=> props.weekData?.[day]?.hydration ?? 1),[props.weekData]) 
    const sleepData = useMemo(()=>days.map(day=> props.weekData?.[day]?.sleep ?? 1),[props.weekData]) 
    const myChart = useRef()
    useEffect(() => {
      if (!myChart.current) return;
      const chartInstance = new Chart(myChart.current, {
        type: 'line',
        data: {
          labels:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: "Mood",
            data: moodData,
            borderColor: '#3b82f6',
            backgroundColor:'rgb(59,130,246,0.1)',
            borderWidth: 2,
            tension:0.2,
            pointHoverRadius: 7,
            pointBackgroundColor: '#3b82f6',  
          },
          {
              label: "Exercise",
              data: exerciseData,
              borderColor: '#10b981',
              backgroundColor:'rgb(16,185,129,0.1)',
              borderWidth: 2,
              tension:0.2,
              pointHoverRadius: 7,
              pointBackgroundColor: '#10b981',  
          },
          {
              label: "Sleep",
              data: sleepData,
              borderColor: '#ec4899',
              backgroundColor:'rgb(236,72,153,0.1)',
              borderWidth: 2,
              tension:0.2,
              pointHoverRadius: 7,
              pointBackgroundColor: '#ec4899',  
          },
          {
              label: "Hydration",
              data: hydrationData,
              borderColor: 'rgb(128, 128, 128)',
              backgroundColor:'rgb(128, 128, 128,0.1)',
              borderWidth: 2,
              tension:0.2,
              pointHoverRadius: 7,
              pointBackgroundColor: 'rgb(128, 128, 128)',  
          },
      ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
      return () => {
        chartInstance.destroy();
      };
    }, [exerciseData,hydrationData,sleepData,moodData]);
      return(
          <section className='shadow-xl  bg-white dark:bg-black/70 sm:col-span-2 lg:col-span-3 sm:row-start-4 lg:row-span-2 row-start-7 row-span-1 rounded-2xl w-full flex flex-col justify-around items-center h-full p-4'>
              <canvas ref={myChart} className="w-full h-full" ></canvas>
          </section>
      )
  } 