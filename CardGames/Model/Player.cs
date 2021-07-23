using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CardGames.Model
{
    public class Player
    {
        public int PlayerID { get; set; }
        public string PlayerName { get; set; }
        public string ScreenName { get; set; }
        public string Password { get; set; }
    }
}
