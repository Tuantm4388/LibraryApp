using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers
{
    public class BookController: BaseApiController
    {
        private readonly DataContext _context;
        public BookController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppBook>>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppBook>> GetBook(int id)
        {
            return await _context.Books.FindAsync(id);
        }
    }
}