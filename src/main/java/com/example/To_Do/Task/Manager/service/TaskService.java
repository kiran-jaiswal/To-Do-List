package com.example.To_Do.Task.Manager.service;

import com.example.To_Do.Task.Manager.entity.Task;
import com.example.To_Do.Task.Manager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repo;

    // ➕ Add Task
    public Task addTask(Task task) {
        return repo.save(task);
    }

    // 📄 Get All Tasks
    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    // ✏️ Update Task
    public Task updateTask(Long id, Task newTask) {
        Task existing = repo.findById(id).orElseThrow();

        existing.setTitle(newTask.getTitle());
        existing.setCompleted(newTask.isCompleted());

        return repo.save(existing);
    }

    // ❌ Delete Task
    public void deleteTask(Long id) {
        repo.deleteById(id);
    }
}
