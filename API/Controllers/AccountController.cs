using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Member");


            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username");

            var result = await _signInManager
                .CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Id = user.Id,
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        [HttpPost("delete/{userID}")]
        public async Task<ActionResult> DeleteAccount(int userID)
        {
            Console.WriteLine(">>>> run DeleteAccount " + userID + ".");
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.Id == userID);

            if (user == null) return BadRequest("Invalid username");

            await _userManager.DeleteAsync(user);

            return Accepted();
        }

        [HttpPost("change-password/{username}")]
        public async Task<ActionResult> ChangePassword(string username, string oldPass, string newPass)
        {
            Console.WriteLine(">>>> run ChangePassword " + username + ".");
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);

            if (user == null) return BadRequest("Invalid username");
            var roleResult = await _userManager.ChangePasswordAsync(user, oldPass, newPass);
            Console.WriteLine(">>>>>>" + roleResult.ToString());
            if (!roleResult.Succeeded)
            {
                Console.WriteLine(">>>>>> change pass fail");
                return BadRequest(roleResult.Errors);
            }
            Console.WriteLine(">>>>>> change pass ok");

            return Accepted();
        }

        [HttpPost("reset-pass")]
        public async Task<ActionResult> ResetPassword(string email, string phone, string newPass)
        {
            Console.WriteLine(">>>> run ResetPassword1 " + email + ".");
            //Console.WriteLine(">>>> run ResetPassword2 " + phone + ".");
            //Console.WriteLine(">>>> run ResetPassword3 " + newPass + ".");
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.Emailuser == email && x.Phone == phone);

            if (user == null) return BadRequest("Incorrect recovery information entered.");
            Console.WriteLine(">>>> run ResetPassword 4" + user.UserName + ".");
            if (_userManager.PasswordHasher != null)
            {
                Console.WriteLine(">>>> run ResetPassword 5" + user.UserName + ".");
                await _userManager.RemovePasswordAsync(user);
            }
            //Console.WriteLine(">>>> run ResetPassword 6" + user.UserName + ".");

            await _userManager.AddPasswordAsync(user, newPass);
            //Console.WriteLine(">>>> run ResetPassword 7" + user.UserName + ".");
            return Accepted();
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}