package com.example.To_Do.Task.Manager.controller;

import com.example.To_Do.Task.Manager.entity.Task;
import com.example.To_Do.Task.Manager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {


    @Autowired
    private TaskService service;

    // ➕ Add Task
    @PostMapping
    public Task addTask(@RequestBody Task task) {
        return service.addTask(task);
    }

    // 📄 Get All Tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return service.getAllTasks();
    }

    // ✏️ Update Task
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return service.updateTask(id, task);
    }

    // ❌ Delete Task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        service.deleteTask(id);
    }
}