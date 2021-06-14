import {useMoralis} from "./useMoralis";

export default function useAuth() {
    const {Moralis} = useMoralis();
    return {
        login: async () => {
            try {
                const user = await Moralis?.Web3.authenticate();
                window.location.reload()
                return user
            } catch (e) {
                console.error(e.message, e);
            }
        },

        logout: async () => {
            try {
                await Moralis?.User.logOut();
                window.location.reload()
            } catch (e) {
                console.error(e.message, e);
            }
        },

    };
}
