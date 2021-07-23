using CardGames.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CardGames.Data
{
    public class CardGamesDataContext : DbContext
    {
        public CardGamesDataContext(DbContextOptions<CardGamesDataContext> options) : base(options)
        { 
        
        }

        public DbSet<Player> Player { get; set; }

        public DbSet<Scores> Scores { get; set; }
    }
}
