import React, { useEffect, useState } from "react";

var nextId = 0;
// Check if tasks are stored in local storage, otherwise use initial data
let initialArtists = JSON.parse(localStorage.getItem("tasklist")) || [
  { id: 0, task: "Visit Kafka Museum", done: true },
  { id: 1, task: "Watch a puppet show", done: false },
  { id: 2, task: "Lennon Wall pic", done: false },
];

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasklist, setTasklist] = useState(initialArtists);
  const [isComplete, setComplete] = useState(null);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    // Save tasks to local storage whenever tasklist changes
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
  }, [tasklist]);

  function onChangeHandler(e) {
    setTask(e.target.value);
  }

  function taskHandler(e) {
    if (task !== "") {
      if (editItemId !== null) {
        // Editing existing task
        setTasklist((prevTaskList) =>
          prevTaskList.map((item) =>
            item.id === editItemId ? { ...item, task: task } : item
          )
        );
        setEditItemId(null);
      } else {
        // Adding new task
        setTasklist([
          {
            id: nextId++,
            task: task,
            isComplete: isComplete,
          },
          ...tasklist,
        ]);
      }

      setTask("");
    }
  }

  function handelEnter(e) {
    if (e.key === "Enter") {
      taskHandler();
    }
  }

  function deleteHandler(item) {
    setTasklist(tasklist.filter((del) => del.id !== item.id));
  }
  function editHandler(item) {
    setEditItemId(item.id);
    setTask(item.task);
  }

  function checkHandler(e) {
    console.log(e.target.checked);
    setComplete(e.target.checked);
  }
  console.log(tasklist);
  return (
    <>
      <div className="flex  container mx-auto">
        <input
          type="text"
          placeholder="Add Todo"
          value={task}
          onChange={onChangeHandler}
          onKeyUp={handelEnter}
          className="mt-1 block w-full px-3 py-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
        />
        <button className="" onClick={taskHandler}>
          <i class="ri-add-box-fill text-xl  w-24"></i>
        </button>
      </div>

      <div className="list container">
        <ul>
          {tasklist.map((item) => (
            <div
              key={item.id}
              className="flex justify-evenly p-2 align-middle  bg-slate-50 my-3 rounded-lg"
            >
              <input
                type="checkbox"
                value={isComplete}
                onChange={checkHandler}
                name=""
                id=""
              />
              <li
                className="py-2 text-left text-lg pr-3"
                
              >
                {editItemId === item.id ? (
                  <input
                    type="text"
                    value={task}
                    onChange={onChangeHandler}
                    onKeyUp={handelEnter}
                    className={`
                        "outline-none border-none focus:ring-0 focus:border-transparent"`}
                  />
                ) : (
                  item.task
                )}
                {editItemId === item.id ? (
                  <i
                    className="ri-check-line ml-2 cursor-pointer"
                    onClick={taskHandler}
                  ></i>
                ) : (
                  <>
                    <i
                      className="ri-edit-box-line ml-2 cursor-pointer"
                      onClick={() => editHandler(item)}
                    ></i>
                    <i
                      className="ri-delete-bin-5-line ml-2 cursor-pointer"
                      onClick={() => deleteHandler(item)}
                    ></i>
                  </>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
