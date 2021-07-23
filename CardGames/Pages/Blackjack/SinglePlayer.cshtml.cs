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
    public class SinglePlayerModel : PageModel
    {
        private readonly CardGames.Data.CardGamesDataContext _context;

        public SinglePlayerModel(CardGames.Data.CardGamesDataContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            string screenName = Request.Cookies["screenName"];
            string playerId = Request.Cookies["playerId"];

            //if (String.IsNullOrEmpty(screenName) || String.IsNullOrEmpty(playerId))
            //{
            //    string statusMsg = "Please Log In";
            //    return RedirectToPage("./Index", new { loginStatus = statusMsg });
            //}
            //else
            //{
                return Page();
            //}
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

            int winningAmt = Convert.ToInt32(Scores.Winnings);
            int gameScoreAmt = Convert.ToInt32(Scores.GameScore);
            int lossesAmt = Convert.ToInt32(Scores.Losses);
            int playerId = Convert.ToInt32(Request.Cookies["playerId"]); 

            Scores.PlayerID = playerId;
            Scores.GameType = "Blackjack";
            Scores.DateOfPlay = DateTime.Today;
            Scores.Winnings = winningAmt;
            Scores.GameScore = gameScoreAmt;
            Scores.Losses = lossesAmt;

            _context.Scores.Add(Scores);
            await _context.SaveChangesAsync();

            return Page();
        }
    }
}
