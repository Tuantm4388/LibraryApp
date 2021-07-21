using System;

namespace API.DTOs
{
    public class BorrowCardDto
    {
        public int Id { get; set; }
        public int Idbook { get; set; }
        public int Iduser { get; set; }
        public DateTime Borrowtime { get; set; } = DateTime.Now;
        public DateTime Returntime { get; set; } = DateTime.Now;
        public string States { get; set; }
    }
}