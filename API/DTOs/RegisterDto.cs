using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] public string Username { get; set; }
        public string KnownAs { get; set; }
        public string Gender { get; set; }
        [Required] public DateTime DateOfBirth { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Emailuser { get; set; }
        public string Idcard { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }
    }
}