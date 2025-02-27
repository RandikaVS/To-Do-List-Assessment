
namespace MyBackend.Service{

    public class TaskNotFoundException : Exception
    {
        public TaskNotFoundException(string message) : base(message) { }
    }

    public class TaskAlreadyCompletedException : Exception
    {
        public TaskAlreadyCompletedException(string message) : base(message) { }
    }
}