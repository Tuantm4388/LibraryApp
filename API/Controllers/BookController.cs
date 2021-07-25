using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{
    public class BookController : BaseApiController
    {
        private readonly DataContext _context;
        public BookController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppBook>>> GetBooks()
        {
            var bookList = await _context.Books.ToListAsync();
            if (bookList.Any())
            {
                foreach (var book in bookList)
                {
                    BookInfo info = await _context.Infos.FindAsync(book.IdISNB);
                    if (info == null) book.Title = " ";
                    else book.Title = info.Title;
                }
                await _context.SaveChangesAsync();
            }

            return bookList;

        }

        [HttpGet("no-dto")]
        public async Task<ActionResult<IEnumerable<AppBook>>> GetBooksNoDTO()
        {
            return await _context.Books.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppBook>> GetBook(int id)
        {
            return await _context.Books.FindAsync(id);
        }

        [HttpPost("delete/{id}")]
        public async Task<ActionResult> DeleleBook(int id)
        {
            AppBook book = await _context.Books.FindAsync(id);
            if (book == null) return BadRequest("The book is not exist");
            _context.Books.Remove(book);
            var result = await _context.SaveChangesAsync();
            return Ok(result);
        }
    }
}