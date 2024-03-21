import Filters from "./components/Filters";
import Map from "./components/Map";
import Table from "./components/Table";

import { useEffect, useState } from "react";
import TimeRangePicker from "./components/TimeRangePicker";
import { personsData } from "../data";
import TimeRangePicker2 from "./components/TimeRangePicker2";

function App() {
  const [map, setMap] = useState(true);
  const [filterState, setFilterState] = useState({
    tasks: [],
    call: { from: null, to: null },
    sms: { from: null, to: null },
  });
  const [tasks, setTasks] = useState([]);

  const handleFilterState = (state) => {
    setFilterState(state);
  };

  useEffect(() => {
    let newTasks = [];
    const { tasks, call: CALL, sms: SMS } = filterState;
    personsData.forEach((person) => {
      const currentTasks = person.tasks;
      const { call, sms, data } = currentTasks;

      if (tasks.includes("Call")) {
        newTasks.push(...call.callRecords);
      }

      if (tasks.includes("Data")) {
        newTasks.push(data);
      }

      if (tasks.includes("SMS")) {
        newTasks.push(...sms);
      }

      if (!tasks.length) {
        newTasks.push(...call.callRecords);
        newTasks.push(data);
        newTasks.push(...sms);
      }

      if (CALL.from && CALL.to) {
        let newTasksCopy = [];
        newTasks.forEach((task) => {
          const [currentHours, currentMinutes] = task.time
            .split(":")
            .map(Number);
          const [fromHours, fromMinutes] = CALL.from.split(":").map(Number);
          const [toHours, toMinutes] = CALL.to.split(":").map(Number);

          const taskDate = new Date(0, 0, 0, currentHours, currentMinutes);
          const fromDate = new Date(0, 0, 0, fromHours, fromMinutes);
          const toDate = new Date(0, 0, 0, toHours, toMinutes);

          if (
            fromDate.getTime() <= taskDate.getTime() &&
            taskDate.getTime() >= toDate.getTime()
          ) {
            newTasksCopy.push(task);
          }

          newTasks = newTasksCopy;
        });
      }

      if (SMS.from && SMS.to) {
        let newTasksCopy = [];
        newTasks.forEach((task) => {
          const [currentHours, currentMinutes] = task.time
            .split(":")
            .map(Number);
          const [fromHours, fromMinutes] = CALL.from.split(":").map(Number);
          const [toHours, toMinutes] = CALL.to.split(":").map(Number);

          const taskDate = new Date(0, 0, 0, currentHours, currentMinutes);
          const fromDate = new Date(0, 0, 0, fromHours, fromMinutes);
          const toDate = new Date(0, 0, 0, toHours, toMinutes);

          if (
            fromDate.getTime() <= taskDate.getTime() &&
            taskDate.getTime() >= toDate.getTime()
          ) {
            newTasksCopy.push(task);
          }

          newTasks = newTasksCopy;
        });
      }
    });

    setTasks(newTasks);
  }, [filterState]);

  return (
    <div className="w-screen h-screen relative">
      {map ? <Map tasks={tasks} /> : <Table />}
      <button
        className="absolute top-4 right-4 p-2 bg-black text-white rounded-md"
        onClick={() => setMap(!map)}
      >
        switch
      </button>
      {map && (
        <>
          <Filters
            filterState={filterState}
            handleFilterState={handleFilterState}
          />
          <TimeRangePicker
            filterState={filterState}
            handleFilterState={handleFilterState}
          />
          <TimeRangePicker2
            filterState={filterState}
            handleFilterState={handleFilterState}
          />
        </>
      )}
    </div>
  );
}

export default App;
