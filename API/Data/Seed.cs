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
            /* ISBN */
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

            BookInfo info1 = new BookInfo();
            info1.Isbn = "000-000-0-00000-0";
            info1.Title = "Library App";
            info1.Author = "TuanTM14";
            info1.Language = "English";
            info1.Origin = "English";
            info1.Summary = "App is Angular";
            info1.Catalogue = "Novel";
            info1.Addtime = DateTime.Now;
            info1.Publishtime = DateTime.Now;
            info1.Photourl = "";
            info1.Condition = "";
            context.Infos.Add(info1);
            BookInfo info2 = new BookInfo();
            info2.Isbn = "000-000-0-00000-1";
            info2.Title = "System App";
            info2.Author = "Tuan tran";
            info2.Language = "VN";
            info2.Origin = "VN";
            info2.Summary = "App is dotnet";
            info2.Catalogue = "Education";
            info2.Addtime = DateTime.Now;
            info2.Publishtime = DateTime.Now;
            info2.Photourl = "";
            info2.Condition = "";
            context.Infos.Add(info2);
            await context.SaveChangesAsync();

            /* book */
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
                book.Condition = "Old";
                book.isborrowed = false;
                book.isreserved = false;

                context.Books.Add(book);
            }
            AppBook book1 = new AppBook();
            book1.IdISNB = info1.Id;
            book1.Isbn = info1.Isbn.ToUpper();
            book1.Title = info1.Title;
            book1.Addtime = DateTime.Now;
            book1.Condition = "New";
            book1.isborrowed = false;
            book1.isreserved = false;
            context.Books.Add(book1);
            AppBook book2 = new AppBook();
            book2.IdISNB = info1.Id;
            book2.Isbn = info1.Isbn.ToUpper();
            book2.Title = info1.Title;
            book2.Addtime = DateTime.Now;
            book2.Condition = "Broken";
            book2.isborrowed = false;
            book2.isreserved = false;
            context.Books.Add(book2);
            AppBook book3 = new AppBook();
            book3.IdISNB = info2.Id;
            book3.Isbn = info2.Isbn.ToUpper();
            book3.Title = info2.Title;
            book3.Addtime = DateTime.Now;
            book3.Condition = "Old";
            book3.isborrowed = false;
            book3.isreserved = false;
            context.Books.Add(book3);

            await context.SaveChangesAsync();
        }

        public static async Task SeedBorrow(DataContext context)
        {
            /* Borrow */
            if (await context.BorrowCards.AnyAsync()) return;
            AppUser user = await context.Users.SingleOrDefaultAsync(x => x.UserName.ToLower() == "admin");
            if (user == null) return;
            BookInfo info = new BookInfo();
            AppBook book = new AppBook();
            BorrowCard item1 = new BorrowCard();
            item1.Iduser = user.Id;
            item1.Username = user.UserName;
            item1.Idbook = 1;
            book = await context.Books.FindAsync(item1.Idbook);
            if (book == null) return;
            item1.Isbnid = book.IdISNB;
            info = await context.Infos.FindAsync(item1.Isbnid);
            if (info == null) return;
            item1.Isbnname = info.Isbn;
            item1.Titlebook = info.Title;
            item1.States = "reserved";
            context.BorrowCards.Add(item1);

            BorrowCard item2 = new BorrowCard();
            item2.Iduser = user.Id;
            item2.Username = user.UserName;
            item2.Idbook = 2;
            book = await context.Books.FindAsync(item2.Idbook);
            if (book == null) return;
            item2.Isbnid = book.IdISNB;
            info = await context.Infos.FindAsync(item2.Isbnid);
            if (info == null) return;
            item2.Isbnname = info.Isbn;
            item2.Titlebook = info.Title;
            item2.States = "borrowed";
            item2.Actborrowtime=DateTime.Now;
            context.BorrowCards.Add(item2);

            BorrowCard item3 = new BorrowCard();
            item3.Iduser = user.Id;
            item3.Username = user.UserName;
            item3.Idbook = 3;
            book = await context.Books.FindAsync(item3.Idbook);
            if (book == null) return;
            item3.Isbnid = book.IdISNB;
            info = await context.Infos.FindAsync(item3.Isbnid);
            if (info == null) return;
            item3.Isbnname = info.Isbn;
            item3.Titlebook = info.Title;
            item3.States = "returned";
            item3.Actborrowtime=DateTime.Now;
            item3.Actreturntime=DateTime.Now;
            context.BorrowCards.Add(item3);

            AppUser user2 = await context.Users.SingleOrDefaultAsync(x => x.UserName.ToLower() == "librarian");
            if (user2 == null) return;
            BorrowCard item4 = new BorrowCard();
            item4.Iduser = user2.Id;
            item4.Username = user2.UserName;
            item4.Idbook = 3;
            book = await context.Books.FindAsync(item4.Idbook);
            if (book == null) return;
            item4.Isbnid = book.IdISNB;
            info = await context.Infos.FindAsync(item4.Isbnid);
            if (info == null) return;
            item4.Isbnname = info.Isbn;
            item4.Titlebook = info.Title;
            item4.States = "reserved";
            context.BorrowCards.Add(item4);

            await context.SaveChangesAsync();
        }
    }
}
