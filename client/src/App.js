import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";

function App() {
  const [reloadFlag, setReloadFlag] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const reloadTasks = () => setReloadFlag(prev => prev + 1);

  return (
    <div className="min-vh-100">
      <div className="container mt-3">
        {/* header row with theme toggle on the right */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="m-0">To-Do</h2>
          <button
            className="btn btn-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <TaskList
          reloadFlag={reloadFlag}
          onTasksChanged={reloadTasks}
          darkMode={darkMode}
        />

        {/* floating add button */}
        <button
          className="btn btn-primary rounded-circle"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            fontSize: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setShowModal(true)}
        >
          +
        </button>

        <AddTaskModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          onTaskAdded={reloadTasks}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;
