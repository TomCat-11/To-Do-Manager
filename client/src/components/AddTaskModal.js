import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddTaskModal = ({ show, handleClose, onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post("/api/tasks", { title });
      setTitle("");
      onTaskAdded();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>New To-do</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Add a To-do item"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mt-3 w-100"
          >
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;
