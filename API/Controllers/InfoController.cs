using System.Threading.Tasks;
using API.Data;
using System.Collections.Generic;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<IEnumerable<AppBook>>> GetBookList()
        {
            return await _context.Books.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppBook>> GetBookByID(int id)
        {
            AppBook itemBook = _context.Books.Find(id);
            itemBook.Author = "testjfdak";
            _context.Update(itemBook);
            _context.SaveChanges();
            return await _context.Books.FindAsync(id);
        }

        [HttpPut("update-user-info/{userId}")]
        public async Task<ActionResult<AppBook>> UpdateUserInfo(int userId,int te)
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