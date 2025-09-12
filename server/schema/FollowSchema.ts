import {z} from "zod"

export const SubscribeSchema = z.object(
    {
        follow_id:z.number()
    }
)