
export enum Country {
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

export function getCountryCode(countryName: keyof typeof Country): string {
    return Country[countryName];
}
