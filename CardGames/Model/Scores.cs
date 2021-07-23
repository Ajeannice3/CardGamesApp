using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CardGames.Model
{
    public class Scores
    {
        [Key]
        public int GameID { get; set; }
        public string GameType { get; set; }
        public int PlayerID { get; set; }
        public int Winnings { get; set; }
        public int Losses { get; set; }
        public int GameScore { get; set; }
        public DateTime DateOfPlay { get; set; }
    }
}
