using System;
using System.ComponentModel.DataAnnotations;

namespace MyBackend.Models
{
    public class TodoTask
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public required string Title { get; set; } = string.Empty;

        public string? Description { get; set; } = string.Empty;

        [Required]
        public string Status { get; set; } = "pending";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

