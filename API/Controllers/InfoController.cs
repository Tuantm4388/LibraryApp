using System.Threading.Tasks;
using API.Data;
using System.Collections.Generic;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace API.Controllers
{
    public class InfoController : BaseApiController
    {
        private readonly DataContext _context;
        public InfoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookInfo>>> GetInfoList()
        {
            return await _context.Infos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookInfo>> GetInfoByID(int id)
        {
            return await _context.Infos.FindAsync(id);
        }

        [HttpGet("getbyisbn/{isbn}")]
        public async Task<ActionResult<BookInfo>> GetInfoByIsbn(string isbn)
        {
            return await _context.Infos.FirstOrDefaultAsync(x => x.Isbn == isbn);
        }

        [HttpPost("add-info")]
        public async Task<ActionResult> AddNewISBN(
                                                    string isbn,
                                                    string title,
                                                    string author,
                                                    string origin,
                                                    string language,
                                                    string catalogue,
                                                    string summary,
                                                    DateTime adddate,
                                                    DateTime publishdate,
                                                    string photourl
        )
        {
            if (await _context.Infos.AnyAsync(x => x.Isbn == isbn.ToUpper())) return BadRequest("The isbn is already available.");
            //var item =  await _context.Infos.FirstOrDefaultAsync(x => x.Isbn == isbn);
            // if(item == null) return BadRequest(item);
            BookInfo info = new BookInfo();
            info.Isbn = isbn;
            info.Title = title.ToUpper();
            info.Language = language;
            info.Author = author;
            info.Origin = origin;
            info.Catalogue = catalogue;
            info.Summary = summary;
            info.Addtime = adddate;
            info.Publishtime = publishdate;
            info.Photourl = photourl;

            _context.Infos.Add(info);
            var result = await _context.SaveChangesAsync();
            return Ok(result);
            // Ok("Success");
        }

        [HttpPost("update-info")]
        public async Task<ActionResult> UpdateBookinfo(int id,
                                                    string isbn,
                                                    string title,
                                                    string author,
                                                    string origin,
                                                    string language,
                                                    string catalogue,
                                                    string summary,
                                                    DateTime adddate,
                                                    DateTime publishdate,
                                                    string photourl
        )
        {
            BookInfo info = await _context.Infos.FindAsync(id);
            if (info == null) return BadRequest("The info is not exist");
            if (info.Isbn != isbn.ToUpper())
            {
                if (await _context.Infos.AnyAsync(x => x.Isbn == isbn.ToUpper()))
                    return BadRequest("The isbn is already available.");
            }
            
            info.Isbn = isbn;
            info.Title = title.ToUpper();
            info.Language = language;
            info.Author = author;
            info.Origin = origin;
            info.Catalogue = catalogue;
            info.Summary = summary;
            info.Addtime = adddate;
            info.Publishtime = publishdate;
            info.Photourl = photourl;

            _context.Infos.Update(info);
            var result = await _context.SaveChangesAsync();
            return Ok(result);
            // Ok("Success");
        }

        [HttpPost("delete/{id}")]
        public async Task<ActionResult> DeleleISBN(int id)
        {
            BookInfo info = await _context.Infos.FindAsync(id);
            if (info == null) return BadRequest("The info is not exist");
            _context.Infos.Remove(info);
            var result = await _context.SaveChangesAsync();
            return Ok(result);
        }
    }
}