import  type {UsersType} from "../types/types"
import { useState } from "react"

const MySubscriptions = () => {
    const [users, setUsers] = useState<UsersType[]>([])

  return (
    <div>MySubscriptions</div>
  )
}

export default MySubscriptions