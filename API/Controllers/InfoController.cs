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

        [HttpPut("update-user-info/{userId}")]
        public async Task<ActionResult<AppBook>> UpdateUserInfo(int userId, int te)
        {
            ////if (await _context.SaveChangesAsync()) return NoContent();
            return await _context.Books.FindAsync(userId);
        }
        //[HttpPut]
        /* public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
         {

             var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

             _mapper.Map(memberUpdateDto, user);

             _userRepository.Update(user);

             if (await _userRepository.SaveAllAsync()) return NoContent();

             return BadRequest("Failed to update user");
         }*/
    }
}