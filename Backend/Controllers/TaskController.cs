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

        // Get all tasks
        [HttpGet("all")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TodoTask>>>> GetTasks()
        {
            var tasks = await _context.Tasks.ToListAsync();

            if (tasks.Count != 0)
            {
                return Ok(new ApiResponse<IEnumerable<TodoTask>>(tasks, "Tasks fetched successfully."));
            }

            return Ok(new ApiResponse<IEnumerable<TodoTask>>([], "No tasks found."));
        }

        [HttpPost("add")]
        public async Task<ActionResult<ApiResponse<TodoTask>>> CreateTask([FromBody] TodoTask task)
        {
            if (task == null)
            {
                return BadRequest(new ApiResponse<TodoTask>("Task cannot be null."));
            }

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, new ApiResponse<TodoTask>(task, "Task created successfully."));
        }

    }
}
