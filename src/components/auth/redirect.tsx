import { createClient } from "@/supabase/server"
import { getURl } from "@/utils/env.util";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export async function RedirectRole () {
    let userAuth = null;
    const { data } = await createClient(cookies()).auth.getUser();
    if(userAuth) {
        return <></>
    }

    if(data && data["user"]) {
        userAuth = data;
        const userInfo = await (await fetch(getURl() + "/api/user-profiles/" + data["user"]["id"], {
            cache: "no-cache"
        })).json();

        if(userInfo["datas"]["user_role"] == "admin" && userInfo) {
            redirect("/dashboard");
        }

    } else {
        redirect("/")
    }

    return (
        <></>
    )
}