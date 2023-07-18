import { Session } from "next-auth";

export default function getTokenBearer(session: Session | null) {
    return session?.user !== undefined ? 'Bearer ' + session.user.access_token : ''
}