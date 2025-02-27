using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyBackend.Models;
using MyBackend.Data;
using MyBackend.Service;

namespace MyBackend.Controllers
{
    [Route("api/tasks")]
    [ApiController]
    public class TaskController: ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // Get all tasks controller
        [HttpGet("all")]
        public async Task<ActionResult<ApiResponse<IEnumerable<TodoTask>>>> GetTasks()
        {

            var tasks = await _taskService.GetTasksAsync();
            return Ok(new ApiResponse<IEnumerable<TodoTask>>(tasks, "Tasks fetched successfully."));

        }

        // add task controller
        [HttpPost("add")]
        public async Task<ActionResult<ApiResponse<TodoTask>>> CreateTask([FromBody] TodoTask task)
        {

            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse<TodoTask>("Invalid task data."));

            var createdTask = await _taskService.CreateTaskAsync(task);
            return CreatedAtAction(nameof(GetTasks), new { id = createdTask.Id }, new ApiResponse<TodoTask>(createdTask, "Task Added Successfully."));

        }

        [HttpPut("mark-as-done/{id}")]
        public async Task<ActionResult<ApiResponse<TodoTask>>> MarkTaskAsDone(int id)
        {

            try{
                var task = await _taskService.MarkTaskAsDoneAsync(id);
                return Ok(new ApiResponse<TodoTask>(task, "Task marked as done successfully."));
            }
            catch (TaskNotFoundException ex)
            {
                return NotFound(new ApiResponse<TodoTask>(ex.Message));
            }
            catch (TaskAlreadyCompletedException ex)
            {
                return BadRequest(new ApiResponse<TodoTask>(ex.Message));
            }
            
        }
    }
}
