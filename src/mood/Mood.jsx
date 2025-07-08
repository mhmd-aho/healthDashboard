import veryHappy from '/src/mood/img/laugh.svg';
import happy from '/src/mood/img/smile.svg';
import neutral from '/src/mood/img/meh.svg';
import sad from '/src/mood/img/frown.svg';
import angry from '/src/mood/img/angry.svg';
export default function Mood(props){
    return(
        <section className='col-start-1 sm:row-start-1 lg:row-start-1 row-start-2 shadow-xl p-4 bg-white dark:bg-black/70 rounded-2xl flex flex-col lg:gap-3 gap-10 sm:gap-35 items-center w-full h-full'>
            <h2 className='self-baseline text-2xl font-bold'>Mood</h2>
            {
              props.weekData?.[props.day]?.mood?
              <p className='mt-5'>Mood logged successfully.</p>:
              <>
              <div className='w-full flex flex-col gap-3'>
                  <div className='flex justify-around items-center w-full '>
                    <div>
                    <button onClick={() => props.setWeekData(prev => ({
                      ...prev,[props.day]: {...prev[props.day],mood: 1}}))}
                      className='hover:scale-110 duration-300'><img className='w-12 h-12' src={angry} alt="angry face"/></button>
                    </div>
                    <button onClick={() => props.setWeekData(prev => ({
                      ...prev,[props.day]: {...prev[props.day],mood: 2}}))}  
                      className='hover:scale-110 duration-300'><img className='w-12 h-12' src={sad} alt="sad face" /></button>
                    <button onClick={() => props.setWeekData(prev => ({
                      ...prev,[props.day]: {...prev[props.day],mood: 3}}))}  
                      className='hover:scale-110 duration-300'><img className='w-12 h-12' src={neutral} alt="neutral face" /></button>
                    <button onClick={() => props.setWeekData(prev => ({
                      ...prev,[props.day]: {...prev[props.day],mood: 4}}))}    
                      className='hover:scale-110 duration-300'><img className='w-12 h-12' src={happy} alt="smile face" /></button>
                    <button onClick={() => props.setWeekData(prev => ({
                      ...prev,[props.day]: {...prev[props.day],mood: 5}}))}  
                      className='hover:scale-110 duration-300'><img className='w-12 h-12' src={veryHappy} alt="happy face" /></button>
                  </div>
                  <div className='flex justify-around w-full text-xs'>
                    <p className='w-12 text-center'>Angry</p>
                    <p className='w-12 text-center'>Sad</p>
                    <p className='w-12 text-center'>Neutral</p>
                    <p className='w-12 text-center'>Happy</p>
                    <p className='w-12 text-center'>Excellent</p>
                  </div>
              </div>
            </>}
        </section>
    )
}