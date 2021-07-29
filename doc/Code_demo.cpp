/*########################### code1 ##################*/

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await _context.Users 
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}

/*########################### code2 ##################*/
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();

            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _userRepository.GetMemberAsync(username);
        }

         [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepository.GetUserByUsernameAsync(username);

            _mapper.Map(memberUpdateDto, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }
    }
}
/*########################### code3  member-card.component.css##################*/
.card:hover img {
    transform: scale(1.2, 1.2);
    transition-duration: 500ms;
    transition-timing-function: ease-out;
    opacity: 0.7;
}

.card img {
    transform: scale(1.0, 1.0);
    transition-duration: 500ms;
    transition-timing-function: ease-out;
}

.card-img-wrapper {
    overflow: hidden;
    position: relative;
}

.member-icons {
    position: absolute;
    bottom: -30%;
    left: 0;
    right: 0;
    margin-right: auto;
    margin-left: auto;
    opacity: 0;
}

.card-img-wrapper:hover .member-icons {
    bottom: 0;
    opacity: 1;
}

.animate {
    transition: all 0.3s ease-in-out;
}


/*########################### code4  member-card.component.html ##################*/
<div class="card mb-4">
    <div class="card-img-wrapper">
        <img src="{{member.photoUrl || './assets/user.png'}}" alt="{{member.knownAs}}" class="card-img-top">
        <ul class="list-inline member-icons animate text-center">
            <li class="list-inline-item"><button routerLink='/members/{{member.username}}' class="btn btn-primary">
                <i class="fa fa-user-circle-o"></i></button></li>
            <li class="list-inline-item"><button class="btn btn-primary">
                <i class="fa fa-heart"></i></button></li>
            <li class="list-inline-item"><button class="btn btn-primary">
                <i class="fa fa-envelope"></i></button></li>
        </ul>
    </div>
    <div class="card-body p-1">
        <h6 class="card-title text-center mb-1"><i class="fa fa-user mr-2"></i>
            {{member.knownAs}}
        </h6>
        <p class="card-text text-muted text-center">{{member.city}}</p>
    </div>
</div>

/*########################### code5 member-card.component.ts ##################*/
import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;

  constructor() { }

  ngOnInit(): void {
  }

}

/*########################### code6 member-detail.component.html##################*/
<div class="row" *ngIf="member">
    <div class="col-4">
        <div class="card">
            <img src="{{member.photoUrl || './assets/user.png'}}" alt="{{member.knownAs}}" 
                class="card-img-top img-thumbnail">
            <div class="card-body">
                <div>
                    <strong>Location:</strong>
                    <p>{{member.city}}, {{member.country}}</p>
                </div>
                <div>
                    <strong>Age:</strong>
                    <p>{{member.age}}</p>
                </div>
                <div>
                    <strong>Last Active:</strong>
                    <p>{{member.lastActive}}</p>
                </div>
                <div>
                    <strong>Member since:</strong>
                    <p>{{member.created}}</p>
                </div>
            </div>
            <div class="card-footer">
                <div class="btn-group d-flex">
                    <button class="btn btn-primary">Like</button>
                    <button class="btn btn-success">Message</button>
                </div>
            </div>
        </div>
    </div>

    <div class="col-8">
        <tabset class="member-tabset">
            <tab heading='About {{member.knownAs}}'>
                <h4>Description</h4>
                <p>{{member.introduction}}</p>
                <h4>Looking for</h4>
                <p>{{member.lookingFor}}</p>
            </tab>
            <tab heading='Interests'>
                <h4>Interests</h4>
                <p>{{member.interests}}</p>
            </tab>
            <tab heading='Photos'>
                <ngx-gallery [options]="galleryOptions" [images]="galleryImages" 
                    style="display: inline-block; margin-bottom: 20px;"></ngx-gallery>
            </tab>
            <tab heading='Messages'>
                <p>Messages will go here</p>
            </tab>
        </tabset>
    </div>
</div>

/*########################### code7 member-detail.component.ts##################*/
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
      this.galleryImages = this.getImages();
    })
  }

}

/*########################### code8 styless.css##################*/
.tab-panel {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 4px;
  }

  .nav-tabs > li.open, .member-tabset > .nav-tabs > li:hover {
    border-bottom: 4px solid #fbcdcf;
  }

  .member-tabset > .nav-tabs > li.open > a, .member-tabset > .nav-tabs > li:hover > a {
    border: 0;
    background: none !important;
    color: #333333;
  }

  .member-tabset > .nav-tabs > li.open > a > i, .member-tabset > .nav-tabs > li:hover > a > i {
    color: #a6a6a6;
  }

  .member-tabset > .nav-tabs > li.open .dropdown-menu, .member-tabset > .nav-tabs > li:hover .dropdown-menu {
    margin-top: 0px;
  }

  .member-tabset > .nav-tabs > li.active {
    border-bottom: 4px solid #E95420;
    position: relative;
  }

  .member-tabset > .nav-tabs > li.active > a {
    border: 0 !important;
    color: #333333;
  }

  .member-tabset > .nav-tabs > li.active > a > i {
    color: #404040;
  }

  .member-tabset > .tab-content {
    margin-top: -3px;
    background-color: #fff;
    border: 0;
    border-top: 1px solid #eee;
    padding: 15px 0;
  }

/*########################### code9 member-card.edit.html ##################*/
  <div class="row" *ngIf="member">
    <div class="col-4">
        <h1>Your profile</h1>
    </div>
    <div class="col-8">
        <div class="alert alert-info" *ngIf="editForm.dirty">
            <strong>Information: </strong> You have made changes.  Any unsaved changes will be lost
        </div>
    </div>
    <div class="col-4">
        <div class="card">
            <img src="{{member.photoUrl || './assets/user.png'}}" alt="{{member.knownAs}}" 
                class="card-img-top img-thumbnail">
            <div class="card-body">
                <div>
                    <strong>Location:</strong>
                    <p>{{member.city}}, {{member.country}}</p>
                </div>
                <div>
                    <strong>Age:</strong>
                    <p>{{member.age}}</p>
                </div>
                <div>
                    <strong>Last Active:</strong>
                    <p>{{member.lastActive}}</p>
                </div>
                <div>
                    <strong>Member since:</strong>
                    <p>{{member.created}}</p>
                </div>
            </div>
            <div class="card-footer">
                <button [disabled]="!editForm.dirty" form="editForm" type="submit" class="btn btn-success btn-block">Save Changes</button>
            </div>
        </div>
    </div>

    <div class="col-8">
        <tabset class="member-tabset">
            <tab heading='About {{member.knownAs}}'>
                <form #editForm="ngForm" id="editForm" (ngSubmit)="updateMember()">
                    <h4>Description</h4>
                    <textarea class="form-control" [(ngModel)]="member.introduction" name="introduction" rows="6"></textarea>
                    <h4 class="mt-2">Looking for</h4>
                    <textarea class="form-control" [(ngModel)]="member.lookingFor" name="lookingFor" rows="6"></textarea>
                    <h4 class="mt-2">Interests</h4>
                    <textarea class="form-control" [(ngModel)]="member.interests" name="interests" rows="6"></textarea>
                    <h4 class="mt-2">Location Details: </h4>
                    <div class="form-inline">
                        <label for="city">City: </label>
                        <input [(ngModel)]="member.city" type="text" name="city" class="form-control mx-2">
                        <label for="city">Country: </label>
                        <input [(ngModel)]="member.country" type="text" name="country" class="form-control mx-2">
                    </div>
                </form>
               
            </tab>
            <tab heading='Edit Photos'>
                <p>Photo edit will go here</p>
            </tab>
        </tabset>
    </div>
</div>


/*########################### code10 member-edit.component.ts ##################*/
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private memberService: MembersService, 
    private toastr: ToastrService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm.reset(this.member);
    })
  }
}

/*########################### code11 AccountController.cs ##################*/
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}
/*########################### code12 TokenService.cs ##################*/
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}

/*########################### code13 ##################*/
/*########################### code14 ##################*/
