namespace MyBackend.Models
{
    public class ApiResponse<T>
    {
        public T Data { get; set; }
        public string Message { get; set; }
        public bool Success { get; set; } = true;

        public ApiResponse(T data, string message)
        {
            Data = data ?? throw new ArgumentNullException(nameof(data), "Data cannot be null");
            Message = message;
        }

        // Constructor for error responses
        public ApiResponse(string message)
        {
            Data = default!;
            Message = message;
            Success = false;
        }
    }


}
