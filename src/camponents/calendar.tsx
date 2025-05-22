import { useEffect, useState } from "react";

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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => changeMonth(-1)}
        >
          ← Prev
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => changeMonth(1)}
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center font-semibold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mt-2">
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
              className={`p-2 border rounded relative ${
                isToday(day) ? "bg-green-600 font-bold" : "bg-white"
              }`}
            >
              <div>{day}</div>
              {dayEvents.map((event, index) => (
                <div
                  key={index}
                  className={`text-xs mt-1 p-1 rounded ${
                    index % 2 === 0 ? "bg-green-600" : "bg-green-100"
                  }`}
                >
                  {event.title} ({event.time})
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-red-500">+ More Events</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
