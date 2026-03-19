package com.example.To_Do.Task.Manager.repository;

import com.example.To_Do.Task.Manager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
