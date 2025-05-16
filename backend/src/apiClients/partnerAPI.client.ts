import { Request, Response as ExpressRes } from 'express';

export class PartnerApi {

    BASE_URL = 'https://www.thesportsdb.com';

    // top14 leagueID -> 4430
    async getTop14Games(req: Request, res: ExpressRes) {
        console.log("IN IN IN GET GAMEs");
        const response: Response = await fetch(this.BASE_URL + "/api/v1/json/3/search_all_leagues.php?c=France&s=Rugby",);

        if (!response.ok)
            console.log("ERROR ERROR getGames")

        const data = await response.json();
        console.log("RUGBY **** ", data);





        return res.status(200).json(data);

    }
}