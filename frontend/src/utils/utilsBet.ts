
// 2 versions because BetsAPi has changed their name
export enum Country {
    "New Zealand (W)" = "NZL",
    "Ireland (W)" = "IRL",
    "Spain (W)" = "ESP",
    "Japan (W)" = "JPN",
    "Wales (W)" = "WAL",
    "Fiji (W)" = "FIJ",
    "Canada (W)" = "CAN",
    "Scotland (W)" = "SCO",
    "England (W)" = "ENG",
    "Australia (W)" = "AUS",
    "Samoa (W)" = "SAM",
    "USA (W)" = "USA",
    "France (W)" = "FRA",
    "South Africa (W)" = "RSA",
    "Italy (W)" = "ITA",
    "Brazil (W)" = "BRA",

    "New Zealand Women" = "NZL",
    "Ireland Women" = "IRL",
    "Spain Women" = "ESP",
    "Japan Women" = "JPN",
    "Wales Women" = "WAL",
    "Fiji Women" = "FIJ",
    "Canada Women" = "CAN",
    "Scotland Women" = "SCO",
    "England Women" = "ENG",
    "Australia Women" = "AUS",
    "Samoa Women" = "SAM",
    "USA Women" = "USA",
    "France Women" = "FRA",
    "South Africa Women" = "RSA",
    "Italy Women" = "ITA",
    "Brazil Women" = "BRA"
}

export function getCountryCode(countryName: string): string | undefined {
    if (countryName in Country)
        return Country[countryName as keyof typeof Country];
    return undefined;
}

export type GamesByDay = Map<string, { id: string, isUpdatable: boolean }[]>;

export function getGameIDsByDay(games: { id: string, date: string }[]): GamesByDay {
    const gamesByDays: GamesByDay = new Map();
    for (const game of games) {
        const gameDay: string = formatMatchDate(game.date);
        if (!gamesByDays.has(gameDay))
            gamesByDays.set(gameDay, []);
        const isUpdatable: boolean = new Date(game.date).getTime() > Date.now();
        gamesByDays.get(gameDay)!.push({ id: game.id, isUpdatable }); // non null assertion ONLY because the check is made beforre
    }
    return gamesByDays;
}

//return the format: Friday, August 22
function formatMatchDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "long",
    });
}