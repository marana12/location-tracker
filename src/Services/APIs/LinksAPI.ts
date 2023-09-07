import { AxiosResponse } from "axios";
import Link from "../../models/link";
import ShortUrlModel from "../../models/shortUrl";
import HTTP from "../Fetch";

export async function CreateShortUrl(originalUrl: string): Promise<AxiosResponse<Link>> {
  return await HTTP.post<Link>("/api/links/create?originalUrl=" + originalUrl);
}

export async function GetOriginalUrl(hashedUrl: string | undefined, lat: number | undefined, lon: number | undefined): Promise<Link | undefined> {

  const response = await HTTP.post<Link>(`/api/links?hashedUrl=${hashedUrl}&lat=${lat}&lon=${lon}`);

  return response.data;
}

export async function GetShortUrlDetails(hashedUrl: string | undefined): Promise<AxiosResponse<ShortUrlModel>> {
  return await HTTP.get<ShortUrlModel>(`/api/links/shorturl?hashedUrl=${hashedUrl}`);
}