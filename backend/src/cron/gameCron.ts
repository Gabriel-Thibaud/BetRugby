import cron from 'node-cron';
import { GameService } from '../services/game.service';

export function startGameCronJobs() {
    const gameService: GameService = new GameService();

    // Everyday at 8h, 14h and 20h
    cron.schedule('0 8,14,20 * * *', async () => {
        console.log('[GameCron] Syncing upcoming games...');
        try {
            await gameService.syncUpcomingGames();
            console.log('[GameCron] Games synced successfully.');
        } catch (err) {
            console.error('[GameCron] Error syncing games:', err);
        }
    });
}