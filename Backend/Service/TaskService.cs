using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBackend.Models;
using MyBackend.Data;

namespace MyBackend.Service
{
    public interface ITaskService
    {
        Task<IEnumerable<TodoTask>> GetTasksAsync();
        Task<TodoTask> CreateTaskAsync(TodoTask task);
        Task<TodoTask> MarkTaskAsDoneAsync(int id);
    }

    public class TaskService : MyBackend.Service.ITaskService
    {
        private readonly TodoDbContext _context;

        public TaskService(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TodoTask>> GetTasksAsync()
        {
            return await _context.Tasks
                .Where(t => t.Status != "done")
                .OrderByDescending(t => t.CreatedAt)
                .Take(5)
                .ToListAsync();
        }

        public async Task<TodoTask> CreateTaskAsync(TodoTask task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<TodoTask> MarkTaskAsDoneAsync(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                throw new TaskNotFoundException("Task not found.");

            if (task.Status == "done")
                throw new TaskAlreadyCompletedException("Task is already marked as done.");
                
            task.Status = "done";
            task.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return task;
        }
    }
}