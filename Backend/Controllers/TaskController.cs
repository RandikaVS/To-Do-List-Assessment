using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyBackend.Models;
using MyBackend.Data;

namespace MyBackend.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskController(TodoDbContext context) : ControllerBase
    {
        private readonly TodoDbContext _context = context;

        // Get all tasks controller
        [HttpGet("all")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TodoTask>>>> GetTasks()
        {
            var tasks = await _context.Tasks
                               .Where(t => t.Status != "done")
                               .OrderByDescending(t => t.CreatedAt)
                               .Take(5)
                               .ToListAsync();

            if (tasks.Any())
            {
                return Ok(new ApiResponse<IEnumerable<TodoTask>>(tasks, "Tasks fetched successfully."));
            }

            return Ok(new ApiResponse<IEnumerable<TodoTask>>([], "No tasks found."));
        }

        // add task controller
        [HttpPost("add")]
        public async Task<ActionResult<ApiResponse<TodoTask>>> CreateTask([FromBody] TodoTask task)
        {
            if (task == null)
            {
                return BadRequest(new ApiResponse<TodoTask>("Task cannot be null."));
            }

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, new ApiResponse<TodoTask>(task, "Task Added Successfully."));
        }

    }
}
