import React, { useEffect, useState } from "react";

var nextId = 0;
let initialArtists = [
  { id: 0, task: "Visit Kafka Museum", done: true },
  { id: 1, task: "Watch a puppet show", done: false },
  { id: 2, task: "Lennon Wall pic", done: false },
];

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasklist, setTasklist] = useState(initialArtists);

  function onChangeHandler(e) {
    setTask(e.target.value);
  }

  function taskHandler(e) {
    if (task !== "") {
      setTasklist([
        {
          id: nextId++,
          task: task,
        },
        ...tasklist,
      ]);
      setTask("");
    }
  }
  console.log("tasklist", tasklist);

  function handelEnter(e) {
    if (e.key === "Enter") {
      taskHandler();
    }
  }

  function deleteHandler(item) {
    setTasklist(tasklist.filter((del) => del.id !== item.id));
  }
  return (
    <>
      <div className="flex">
        <input
          type="text"
          placeholder="Add Todo"
          value={task}
          onChange={onChangeHandler}
          onKeyUp={handelEnter}
          className="mt-1 block w-full px-3 py-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
        <button className="" onClick={taskHandler} >
          <i class="ri-add-box-fill text-xl bg-slate-600 text-white w-24"></i>
        </button>
      </div>
      <div className="list">
        <ul>
          {tasklist.map((item) => (
            <div className="flex justify-evenly p-2 align-middle  bg-slate-50 my-3 rounded-lg">
              <input type="checkbox" name="" id="" />
              <li key={item.id} className="py-2 text-left text-lg pr-3">
                {item.task}
                <i
                  class="ri-edit-box-line ml-5"
                  onClick={() => deleteHandler(item)}
                ></i>
                <i
                  class="ri-delete-bin-5-line ml-2"
                  onClick={() => deleteHandler(item)}
                ></i>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
