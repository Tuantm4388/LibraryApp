using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BorrowController : BaseApiController
    {
        private readonly DataContext _context;
        public BorrowController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BorrowCard>>> GetBorrowCards()
        {
            return await _context.BorrowCards.ToListAsync();
        }

        [HttpPost("add-card")]
        public async Task<ActionResult> AddBorrowCard(int idbook,
                                                        int iduser,
                                                        DateTime borrowtime,
                                                        DateTime returntime,
                                                        string states)
        {
            Console.WriteLine(">>>> run AddBorrowCard  iduser" + iduser + ".");
            var card = new BorrowCard
            {
                Idbook = idbook,
                Iduser = iduser,
                Borrowtime = borrowtime,
                Returntime = returntime,
                States = states
            };
            _context.BorrowCards.Add(card);

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("delete-card")]
        public async Task<ActionResult> DeleteAccount()
        {
            var card = await _context.BorrowCards.SingleOrDefaultAsync(x => x.Id == 2);
            if (card == null) return BadRequest("Not found");
            _context.BorrowCards.Remove(card);
            await _context.SaveChangesAsync();

            return Ok();
        }

    }
}