using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using CardGames.Data;
using CardGames.Model;

namespace CardGames.Pages
{
    public class PlayerScoresModel : PageModel
    {
        private readonly CardGames.Data.CardGamesDataContext _context;

        public PlayerScoresModel(CardGames.Data.CardGamesDataContext context)
        {
            _context = context;
        }

        public IList<Scores> Scores { get;set; }

        public IActionResult OnGetAsync()
        {
            string screenName = Request.Cookies["screenName"];
            string playerId = Request.Cookies["playerId"];
            int playerIdValue = Convert.ToInt32(Request.Cookies["playerId"]);

            if (String.IsNullOrEmpty(screenName) || String.IsNullOrEmpty(playerId))
            {
                string statusMsg = "Please Log In";
                return RedirectToPage("./Index", new { loginStatus = statusMsg });
            }
            else
            {
                Scores = _context.Scores.Where(s => s.PlayerID == playerIdValue)
                                        .ToList();
                return Page();
            }
        }
    }
}
