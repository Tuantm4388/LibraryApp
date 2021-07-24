using System;

namespace API.DTOs
{
    public class BookDto
    {
        public int Id { get; set; }
        public int IdISNB { get; set; }
        public string Isbn { get; set; }
        public string Title { get; set; }
        public string Condition { get; set; }
        public DateTime Addtime { get; set; } = DateTime.Now;
    }
}