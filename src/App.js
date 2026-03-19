import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container, TextField, Button, Typography,
  Card, CardContent, IconButton, Checkbox
} from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const API_URL = "http://localhost:8080/tasks";

  const fetchTasks = () => {
    axios.get(API_URL)
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    if (!title.trim()) return;

    axios.post(API_URL, { title, completed: false })
      .then(() => {
        setTitle("");
        fetchTasks();
      });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`).then(fetchTasks);
  };

  const toggleTask = (task) => {
    axios.put(`${API_URL}/${task.id}`, {
      ...task,
      completed: !task.completed
    }).then(fetchTasks);
  };

  const updateTask = (task) => {
    const newTitle = prompt("Edit task", task.title);
    if (!newTitle) return;

    axios.put(`${API_URL}/${task.id}`, {
      ...task,
      title: newTitle
    }).then(fetchTasks);
  };

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      padding: "40px"
    }}>

      <Container maxWidth="sm">

        {/* Header */}
        <Typography variant="h4" align="center" gutterBottom style={{
          color: "white",
          fontWeight: "bold"
        }}>
          🚀 Smart To-Do
        </Typography>

        {/* Glass Box */}
        <div style={{
          backdropFilter: "blur(15px)",
          background: "rgba(255,255,255,0.15)",
          padding: "20px",
          borderRadius: "15px"
        }}>

          {/* Search */}
          <TextField
            fullWidth
            placeholder="🔍 Search tasks..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ marginBottom: 2, background: "white", borderRadius: "10px" }}
          />

          {/* Input */}
          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              fullWidth
              placeholder="Enter task"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ background: "white", borderRadius: "10px" }}
            />

            <Button
              variant="contained"
              onClick={addTask}
              sx={{
                background: "linear-gradient(45deg, #ff6a00, #ee0979)",
                borderRadius: "10px"
              }}
            >
              Add
            </Button>
          </div>

          {/* Tasks */}
          <div style={{ marginTop: "20px" }}>
            {filteredTasks.map(t => (
              <Card key={t.id} sx={{
                marginBottom: "12px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.9)"
              }}>
                <CardContent sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>

                  <div>
                    <Checkbox
                      checked={t.completed}
                      onChange={() => toggleTask(t)}
                    />
                    <span style={{
                      textDecoration: t.completed ? "line-through" : "none",
                      fontSize: "16px",
                      fontWeight: "500"
                    }}>
                      {t.title}
                    </span>
                  </div>

                  <div>
                    <IconButton onClick={() => updateTask(t)} color="primary">
                      <Edit />
                    </IconButton>

                    <IconButton onClick={() => deleteTask(t.id)} color="error">
                      <Delete />
                    </IconButton>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </Container>
    </div>
  );
}

export default App;