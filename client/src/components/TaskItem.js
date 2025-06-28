import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";

const TaskItem = ({ task, onDelete, onToggle, onEdit, darkMode }) => {
  const [swipeOffset, setSwipeOffset] = useState(0);

  const handlers = useSwipeable({
    onSwiping: (eventData) => setSwipeOffset(eventData.deltaX),
    onSwipedLeft: () => {
      onDelete(task._id);
      setSwipeOffset(0);
    },
    onSwipedRight: () => {
      onToggle(task);
      setSwipeOffset(0);
    },
    onSwiped: () => setSwipeOffset(0),
    trackMouse: true,
  });

  let swipeColor = darkMode ? "#212529" : "white";
  if (swipeOffset > 0) swipeColor = darkMode ? "darkgreen" : "green";
  if (swipeOffset < 0) swipeColor = darkMode ? "darkred" : "red";

  return (
    <li
      {...handlers}
      onClick={() => onEdit(task)}
      className={`list-group-item mb-2 position-relative ${darkMode ? "bg-dark text-light border-secondary" : ""}`}
      style={{
        transform: `translateX(${swipeOffset}px)`,
        backgroundColor: swipeColor,
        transition: swipeOffset === 0 ? "transform 0.3s, background-color 0.3s" : "none",
        cursor: "pointer",
        textDecoration: task.completed ? "line-through" : "none",
        paddingLeft: "30px",  // make space for bullet
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: task.completed ? "gray" : (darkMode ? "#0dcaf0" : "#0d6efd"), // nice accent color
        }}
      ></span>
      {task.title}
    </li>
  );
};

export default TaskItem;
