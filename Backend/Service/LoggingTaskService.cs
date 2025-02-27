using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBackend.Models;
using MyBackend.Data;
using MyBackend.Service;

namespace MyBackend.Service{

    public class LoggingTaskService : ITaskService
    {
        private readonly ITaskService _taskService;
        private readonly ILogger<LoggingTaskService> _logger;

        public LoggingTaskService(ITaskService taskService, ILogger<LoggingTaskService> logger)
        {
            _taskService = taskService;
            _logger = logger;
        }

        public async Task<IEnumerable<TodoTask>> GetTasksAsync()
        {
            _logger.LogInformation("Fetching tasks...");
            return await _taskService.GetTasksAsync();
        }

        public async Task<TodoTask> CreateTaskAsync(TodoTask task)
        {
            _logger.LogInformation("Creating a new task...");
            return await _taskService.CreateTaskAsync(task);
        }

        public async Task<TodoTask> MarkTaskAsDoneAsync(int id)
        {
            _logger.LogInformation("Marking task as done...");
            return await _taskService.MarkTaskAsDoneAsync(id);
        }
    }
}