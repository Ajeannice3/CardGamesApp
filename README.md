# CardGamesApp
ASP.NET Core w/Razor pages app containing different card games.  The scripts to create the SQL database and tables are in the /wwwroot/sql folder.

Known issues in the 1st commit:
1 - The form field validation in the Razor pages is not working properly.     
2 - JS - 2 issues in the stand() function:  1) if the dealerHandTotal = playerHandTotal, when you press the Stand button, it should add a card to the dealer's hand but nothing happens.  2) When you press the Stand button, the while loop continues to execute for several iterations after the dealerHandTotal > 21.     
3 - JS - When a player gets blackjack on the first hand, the bet amount and totals are not updated.     
4 - When a player clicks 'End Game', the data is saved to a sql database. I want to redirect to the Player Scores page but get an error.  If I reload the Single Player blackjack page, the totals are not cleared unless you click 'Restart Game'.  I don't think that is very intuitive for a player.  'End Game' posts the form to the Single Player page model.
