import cron from 'node-cron';
import { gameService } from '../services/services';

export function startGameCronJobs() {

    // Everyday at 6h, 15h, 17h , 19h and 23h (UTC) - get upcoming games
    cron.schedule('0 6,15,17,19,23 * * *', async () => {
        console.log('[GameCron] Syncing upcoming games...');
        try {
            await gameService.syncUpcomingGames();
            console.log('[GameCron] Upcoming games synced successfully.');
        } catch (err) {
            console.error('[GameCron] Error syncing upcoming games:', err);
        }
    });

    // Everyday at 6h, 15h, 17h , 19h and 23h (UTC) - get ended games to update scores
    cron.schedule('0 6,15,17,19,23 * * *', async () => {
        console.log('[GameCron] Syncing games scores...');
        try {
            await gameService.syncGameScores();
            console.log('[GameCron] Games scores synced successfully.');
        } catch (err) {
            console.error('[GameCron] Error syncing games scores:', err);
        }
    });
}