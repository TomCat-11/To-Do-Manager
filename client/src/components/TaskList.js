import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

const TaskList = ({ reloadFlag, onTasksChanged }) => {
  const [tasks, setTasks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [reloadFlag]);

  // delete
  const handleDelete = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    onTasksChanged();
  };

  // toggle complete
  const handleToggle = async (task) => {
    await axios.put(`/api/tasks/${task._id}`, { completed: !task.completed });
    onTasksChanged();
  };

  // edit
  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setEditTaskTitle(task.title);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    await axios.put(`/api/tasks/${editTaskId}`, { title: editTaskTitle });
    setEditTaskId(null);
    setEditTaskTitle("");
    setShowEditModal(false);
    onTasksChanged();
  };

  return (
    <div>
      <ul className="list-group mb-5">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEdit}
            
          />
        ))}
      </ul>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit To-do</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control"
                  placeholder="Enter updated task"
                  value={editTaskTitle}
                  onChange={(e) => setEditTaskTitle(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSaveEdit}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
