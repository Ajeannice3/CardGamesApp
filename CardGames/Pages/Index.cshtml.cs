using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardGames.Data;
using CardGames.Model;
using System.Net;

namespace CardGames.Pages
{
    public class IndexModel : PageModel
    {
        private readonly CardGames.Data.CardGamesDataContext _context;

        public IndexModel(CardGames.Data.CardGamesDataContext context)
        {
            _context = context;
        }

        //private readonly ILogger<IndexModel> _logger;

        //public IndexModel(ILogger<IndexModel> logger)
        //{
        //    _logger = logger;
        //}

        [BindProperty]
        public Model.Player Player { get; set; }

        public string LoginFailedMessage { get; set; }

        public void OnGet()
        {

        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            if (LoginIsSuccessful(Player.ScreenName, Player.Password))
            {
                Player.PlayerID = _context.Player
                    .Where(player => player.ScreenName == Player.ScreenName && player.Password == Player.Password)
                    .Select(player => player.PlayerID)
                    .FirstOrDefault();

                Response.Cookies.Append("screenName", Player.ScreenName);
                Response.Cookies.Append("playerId", Player.PlayerID.ToString());

                return RedirectToPage("./PlayerScores");
            }
            else
            {
                this.LoginFailedMessage = "Invalid Screen Name or Password";
                return RedirectToPage("./Index", new { status = LoginFailedMessage });
            }
        }

        private bool LoginIsSuccessful(string screenName, string pwd)
        {
            return _context.Player.Any(n => n.ScreenName == screenName && n.Password == pwd);
        }
    }
}
