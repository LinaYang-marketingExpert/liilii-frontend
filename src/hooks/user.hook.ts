import { useGlobalContext } from "@/context"

export const useUser = () => {
    const { state, update }: any = useGlobalContext();

    return {
        user: state.userInfo
    }
}

