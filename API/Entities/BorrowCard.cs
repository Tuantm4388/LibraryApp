using System;

namespace API.Entities
{
    public class BorrowCard
    {
        public int Id { get; set; }
        public int Idbook { get; set; }
        public int Iduser { get; set; }
        public DateTime Borrowtime { get; set; } = DateTime.Now;
        public DateTime Returntime { get; set; } = DateTime.Now;
        public string States { get; set; }

    }
}