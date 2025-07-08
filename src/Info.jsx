export default function Info({ weekData, day }) {
    const todayData = weekData?.[day] || {};
    const { exercise = 0, hydration = 0, sleep = 0 } = todayData;
    const hasCompleteData = exercise && hydration && sleep;
    const getFeedback = (value, type) => {
        if (value === 5) return type === "exercise" ? "Awesome workout! You've reached your goal."
            : type === "hydration" ? "Excellent hydration! Your body is well-fueled."
            : "Great sleep! Your body thanks you.";
        if (value >= 3) return type === "exercise" ? "Good activity level. Try to hit your full goal."
            : type === "hydration" ? "You're staying fairly hydrated. Keep it up."
            : "Decent sleep. Aim for 8 hours to feel fully refreshed.";
        return type === "exercise" ? "Consider more movement today—even a short walk helps."
            : type === "hydration" ? "Drink more water to stay hydrated and alert."
            : "Try to get more rest. Sleep is essential for recovery.";
    };
    const avg = hasCompleteData ? Math.floor((exercise + hydration + sleep) / 3) : 0;
    return (
        <section className="sm:col-start-2 lg:col-start-3 col-start-1 row-start-1 rounded-2xl flex flex-col items-center p-4 shadow-xl bg-white dark:bg-black/70 w-full h-full">
            <div className="flex items-center justify-between w-full">
                <h2 className="text-xl font-bold self-baseline">Daily Summary</h2>
                <h2 className="text-lg font-bold">Score: {avg}/5</h2>
            </div>
            <div className="h-3/4 w-full text-sm font-semibold flex flex-col justify-around items-baseline">
                {hasCompleteData ? (
                    <>
                        <p>Exercise: {getFeedback(exercise, "exercise")}</p>
                        <p>Hydration: {getFeedback(hydration, "hydration")}</p>
                        <p>Sleep: {getFeedback(sleep, "sleep")}</p>
                    </>
                ) : (
                    <p className="self-center">Enter today's data to get insights.</p>
                )}
            </div>
        </section>
    );
}

