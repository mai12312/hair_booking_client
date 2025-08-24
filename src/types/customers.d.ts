import { CommentType } from "./comment-type"
import { Files } from "./files"
import { HookType } from "./hook-type"
import { Validators } from "./validators"
import { Editor } from "@tiptap/react"
/**
 * pending is use when fecting first time
 */
export declare module CustomerContext {
    type TCustomerContext = {
        customer: Customer,
        setCustomer: React.Dispatch<SetStateAction<Customer>>
    }
}