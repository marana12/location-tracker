import { AxiosResponse } from "axios";
import HTTP from "../Fetch";
import Link from "../../models/link";

export async function AddVisitor(hashedUrl: string | undefined, lat: number | undefined, lon: number | undefined): Promise<AxiosResponse<Link>> {
    const params = {
        hashedUrl: hashedUrl,
        lat: lat?.toString(),
        lon: lon?.toString(),
    }

    return await HTTP.post<Link>(`/api/visitor`, params);
}