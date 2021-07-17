namespace API.DTOs
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Isbn { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Origin { get; set; }
        public string Language { get; set; }
        public string Catalogue { get; set; }
        public string Summary { get; set; }
        public string Addtime { get; set; }
        public string Publishtime { get; set; }
        public string Condition { get; set; }
        public string Url { get; set; }
    }
}