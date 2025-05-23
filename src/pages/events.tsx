import { useEffect, useState } from "react";

interface EventItem {
  title: string;
  date: string;
  time: string;
  duration: string;
}

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  const groupEventsByMonth = (events: EventItem[]) => {
    const monthMap: { [month: string]: EventItem[] } = {};
    events.forEach((event) => {
      const date = new Date(event.date);
      const month = date.toLocaleString("default", { month: "long" });
      if (!monthMap[month]) {
        monthMap[month] = [];
      }
      monthMap[month].push(event);
    });
    return monthMap;
  };

  const groupedEvents = groupEventsByMonth(events);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Events</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedEvents).map(([month, monthEvents]) => (
            <div key={month}>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{month}</h3>
              <ul className="space-y-2">
                {monthEvents.map((event, index) => (
                  <li
                    key={index}
                    className="bg-white shadow rounded-lg p-4 border border-gray-200"
                  >
                    <div className="font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-600">
                      {event.date} — {event.time} — {event.duration}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}