using System;

namespace API.Entities
{
    public class AppBook
    {
        public int Id { get; set; }
        public int IdISNB { get; set; }
        public string Isbn { get; set; }
        public string Title { get; set; }
        public string Condition { get; set; }
        public DateTime Addtime { get; set; } = DateTime.Now;

        public bool isborrowed { get; set; } = false;
        public bool isreserved { get; set; } = false;

        public string Author { get; set; }
        public string Origin { get; set; }
        public string Language { get; set; }
        public string Catalogue { get; set; }
        public string Summary { get; set; }

        public DateTime Publishtime { get; set; } = DateTime.Now;

        public string Photourl { get; set; }
        public int Count { get; set; }
    }
}