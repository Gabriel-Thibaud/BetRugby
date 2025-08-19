import cron from 'node-cron';
import { gameService } from '../services/services';

export function startGameCronJobs() {

    // Everyday at 8h, 14h and 20h - get upcoming games
    cron.schedule('0 8,14,20 * * *', async () => {
        console.log('[GameCron] Syncing upcoming games...');
        try {
            await gameService.syncUpcomingGames();
            console.log('[GameCron] Upcoming games synced successfully.');
        } catch (err) {
            console.error('[GameCron] Error syncing upcoming games:', err);
        }
    });

    // Everyday at 8h, 14h and 20h - get ended games to update scores
    cron.schedule('0 8,14,20 * * *', async () => {
        console.log('[GameCron] Syncing games scores...');
        try {
            await gameService.syncGameScores();
            console.log('[GameCron] Games scores synced successfully.');
        } catch (err) {
            console.error('[GameCron] Error syncing games scores:', err);
        }
    });
}