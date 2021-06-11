import Moralis from "moralis";


export function useMoralis() {
    if (typeof window !== `undefined`) {
        Moralis.initialize('oV0ZAdwVov2GjbuqDjdBqFrPvXOfQri51RyzQ7F4',  "myMasterKey");
        Moralis.serverURL = 'https://3j9q4lvawiw5.moralis.io:2053/server';
    }
    return { Moralis };
}
