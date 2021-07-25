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
        public string States { get; set; } /* reserved , borrowed , returned */

        public int Isbnid { get; set; }
        public DateTime Actborrowtime { get; set; } = DateTime.MinValue;
        public DateTime Actreturntime { get; set; } = DateTime.MinValue;


        public string Username { get; set; }
        public string Titlebook { get; set; }
        public string Isbnname { get; set; }
        public int Chargefine { get; set; } = 0;
        public bool isdeleted { get; set; } = false;

    }
}