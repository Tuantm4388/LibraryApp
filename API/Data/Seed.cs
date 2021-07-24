using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedDataLibrary.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Librarian"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");
            }

            var admin = new AppUser
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] { "Admin", "Librarian" });

            var librarian = new AppUser
            {
                UserName = "librarian"
            };

            await userManager.CreateAsync(librarian, "Pa$$w0rd");
            await userManager.AddToRoleAsync(librarian, "Librarian");

            var member = new AppUser
            {
                UserName = "member"
            };

            await userManager.CreateAsync(member, "Pa$$w0rd");
            await userManager.AddToRoleAsync(member, "Member");
        }


        public static async Task SeedBooks(DataContext context)
        {
            if (await context.Books.AnyAsync()) return;

            var itemData = await System.IO.File.ReadAllTextAsync("Data/BookSeedDataLibrary.json");
            Console.WriteLine("\n >>>>>>  data" + itemData);
            var itemInfos = JsonSerializer.Deserialize<List<BookInfo>>(itemData);
            //Console.WriteLine("\n >>>>>> users : "+ items);
            if (itemInfos == null) return;
            int i = 0;
            BookInfo info;
            for (i = 0; i < itemInfos.Count; i++)
            {
                info = itemInfos[i];
                info.Isbn = info.Isbn.ToUpper();
                info.Addtime = DateTime.Now;
                info.Publishtime = DateTime.Now;
                info.Count = 0;
                info.Condition = "";
                context.Infos.Add(info);
            }
            await context.SaveChangesAsync();

            if (await context.Books.AnyAsync()) return;
            BookInfo _info = new BookInfo();
            if (itemInfos.Count > 0)
            {
                _info = context.Infos.Find(1);
            }
            if (_info == null) return;
            
            for (i = 0; i < itemInfos.Count; i++)
            {
                AppBook book = new AppBook();
                book.IdISNB = _info.Id;
                book.Isbn = _info.Isbn.ToUpper();
                book.Title = _info.Title;
                book.Addtime = DateTime.Now;
                book.Condition = "New";

                context.Books.Add(book);
            }
            await context.SaveChangesAsync();
        }
    }
}
