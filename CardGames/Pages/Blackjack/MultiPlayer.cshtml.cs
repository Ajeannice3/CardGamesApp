using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using CardGames.Data;
using CardGames.Model;

namespace CardGames.Pages.Blackjack
{
    public class MultiPlayerModel : PageModel
    {
        private readonly CardGames.Data.CardGamesDataContext _context;

        public MultiPlayerModel(CardGames.Data.CardGamesDataContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public Scores Scores { get; set; }

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Scores.Add(Scores);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
