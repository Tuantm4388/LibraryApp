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
            var cardList = await _context.BorrowCards.ToListAsync();
            if (cardList.Any())
            {
                foreach (var card in cardList)
                {
                    AppUser user = await _context.Users.FindAsync(card.Iduser);
                    if (user == null)
                    {
                        card.Username = "";
                    }
                    else
                    {
                        card.Username = user.UserName;
                    }
                    AppBook book = await _context.Books.FindAsync(card.Idbook);
                    if (book == null)
                    {
                        card.Idbook = -1;
                    }
                    else
                    {
                        card.Isbnid = book.IdISNB;
                        BookInfo info = await _context.Infos.FindAsync(card.Isbnid);
                        if (info == null)
                        {
                            card.Isbnname = " ";
                            card.Titlebook = " ";
                        }
                        else
                        {
                            card.Isbnname = info.Isbn;
                            card.Titlebook = info.Title;
                        }
                    }

                }
                await _context.SaveChangesAsync();
            }

            return cardList;
        }

        [HttpGet("no-dto")]
        public async Task<ActionResult<IEnumerable<BorrowCard>>> GetBorrowCardsNoDTO()
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