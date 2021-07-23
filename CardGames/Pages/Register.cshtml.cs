using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using CardGames.Data;
using CardGames.Model;

namespace CardGames.Pages
{
    public class RegisterModel : PageModel
    {
        private readonly CardGames.Data.CardGamesDataContext _context;

        public RegisterModel(CardGames.Data.CardGamesDataContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Player Player { get; set; }

        public string DuplicateMessage { get; set; }
 
        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            if (!ScreenNameExists(Player.ScreenName))
            {
                _context.Player.Add(Player);
                await _context.SaveChangesAsync();
                return RedirectToPage("./Index");
            }
            else
            {
                this.DuplicateMessage = "This screen name already exists.";
                return RedirectToPage("./Register", new { dupMessage =  DuplicateMessage });
            }

        }

        private bool ScreenNameExists(string screenName)
        {
            return _context.Player.Any(n => n.ScreenName == screenName);
        }
    }
}
