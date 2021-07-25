using System;
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
                    if (info == null)
                    {
                        book.Isbn = " ";
                        book.Title = " ";
                    }
                    else
                    {
                        book.Isbn = info.Isbn;
                        book.Title = info.Title;
                    }
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

        [HttpPost("add-book")]
        public async Task<ActionResult> AddNewBook(
                                                    string isbn,
                                                    string condition)
        {
            BookInfo isbnItem = await _context.Infos.FirstOrDefaultAsync(x => x.Isbn == isbn.ToUpper());
            if (isbnItem != null)
            {
                AppBook book = new AppBook();
                book.IdISNB = isbnItem.Id;
                book.Isbn = isbnItem.Isbn;
                book.Title = isbnItem.Title;
                book.Condition = condition;
                book.Addtime = DateTime.Now;

                _context.Books.Add(book);
                var result = await _context.SaveChangesAsync();
                return Ok(result);
            }
            else
            {
                return BadRequest("The ISBN is not available.");
            }
        }

        [HttpPost("update-book")]
        public async Task<ActionResult> UpdateBook(int id,
                                                string isbn,
                                                string condition,
                                                DateTime adddate)
        {
            BookInfo isbnItem = await _context.Infos.FirstOrDefaultAsync(x => x.Isbn == isbn.ToUpper());
            if (isbnItem != null)
            {
                AppBook book = await _context.Books.FindAsync(id);
                if (book == null) return BadRequest("The book is not exist");
                book.IdISNB = isbnItem.Id;
                book.Isbn = isbnItem.Isbn;
                book.Title = isbnItem.Title;
                book.Condition = condition;
                book.Addtime = adddate;

                _context.Books.Update(book);
                var result = await _context.SaveChangesAsync();
                return Ok(result);
            }
            else
            {
                return BadRequest("The ISBN is not available.");
            }


            // Ok("Success");
        }
    }
}