import React from "react";

function AddTask() {
  return (
    <>
      <form action="">
        <div className="p-7 max-h-screen flex flex-col items-center justify-center">
          <div className="border border-slate-400 shadow-slate-300 p-8 flex flex-col gap-4 max-w-md">
            <h1 className="text-center">Add New Task</h1>
            <div className="flex flex-col">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="border border-slate-400 rounded px-2 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="discription">Discription:</label>
              <textarea
                name=""
                id=""
                cols="30"
                className="border border-slate-400 rounded px-2 py-2"
              ></textarea>
            </div>
            <button className="bg-green-300 w-full cursor-pointer py-2 rounded font-medium text-white">
              Add Task
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddTask;
