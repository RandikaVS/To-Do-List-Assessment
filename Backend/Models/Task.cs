using System;
using System.ComponentModel.DataAnnotations;

namespace MyBackend.Models
{
    public class TodoTask
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(20, ErrorMessage = "Title cannot be longer than 20 characters.")]
    public required string Title { get; set; } = string.Empty;

    [StringLength(50, ErrorMessage = "Description cannot be longer than 50 characters.")]
    public string? Description { get; set; } = string.Empty;

    [Required]
    public string Status { get; set; } = "pending";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
}

