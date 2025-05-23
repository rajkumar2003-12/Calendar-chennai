import { useEffect, useState } from "react";
import { Navbar } from "./navbar";

interface Event {
  title: string;
  date: string;
  time: string;
  duration: string;
}

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  const getEventsForDate = (date: string) =>
    events.filter((event) => event.date === date);

  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4 sm:p-6 w-full max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 mb-4">
          <button
            className="bg-cyan-900 text-white px-4 py-2 rounded-full text-sm sm:text-base"
            onClick={() => changeMonth(-1)}
          >
            ← Prev
          </button>

          <h2 className="text-lg sm:text-2xl font-semibold text-center">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h2>

          <button
            className="bg-cyan-900 text-white px-4 py-2 rounded-full text-sm sm:text-base"
            onClick={() => changeMonth(1)}
          >
            Next →
          </button>
        </div>
        <div className="grid grid-cols-7 text-xs sm:text-sm font-semibold text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-gray-600">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 mt-2 text-xs sm:text-sm">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`}></div>
          ))}

          {calendarDays.map((day) => {
            const dateStr = `${currentDate.getFullYear()}-${String(
              currentDate.getMonth() + 1
            ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            const dayEvents = getEventsForDate(dateStr);

            return (
              <div
                key={day}
                className={`p-2 sm:p-3 border rounded relative h-auto min-h-[60px] sm:min-h-[80px] ${
                  isToday(day) ? "bg-sky-200 font-bold" : "bg-white"
                }`}
              >
                <div className="font-semibold">{day}</div>
                <div className="mt-1 space-y-1 max-h-20 overflow-y-auto">
                  {dayEvents.slice(0, 2).map((event, index) => (
                    <div
                      key={index}
                      className={`text-xs p-1 rounded truncate ${
                        index % 2 === 0 ? "bg-teal-100" : "bg-green-100"
                      }`}
                      title={`${event.title} at ${event.time}`}
                    >
                      {event.title} ({event.time})
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-[10px] text-red-500">
                      + More Events
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
