import { useState, useEffect } from "react";

function TaskList() {
  const [taskData, setTaskData] = useState([]);
  useEffect(() => {
    getTaskListData();
  }, []);

  const getTaskListData = async () => {
    let list = await fetch("http://localhost:8000/tasks");
    list = await list.json();
    // console.log(list)
    if (list.success) {
      setTaskData(list.result);
    }
  };

  return (
    <>
      <div>
        <h1>To Do List</h1>
        <ul>
          <li>SR.No</li>
          <li>Title</li>
          <li>Description</li>
        </ul>

        {taskData.map((item, index) => {
          return (
            <>
              <ul key={index}>
                <li>{index + 1}</li>
                <li>{item.Title}</li>
                <li>{item.Description}</li>
              </ul>
            </>
          );
        })}
      </div>
    </>
  );
}

export default TaskList;


// 1) avoid error give empty arr to initial value in usestate;
// 2) put condition on map && to avoid run the map method