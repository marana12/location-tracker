import { AxiosResponse } from "axios";
import Link from "../../models/link";
import ShortUrlModel from "../../models/shortUrl";
import HTTP from "../Fetch";

export async function CreateShortUrl(originalUrl: string): Promise<AxiosResponse<Link>> {
  return await HTTP.post<Link>("/api/links/create?originalUrl=" + originalUrl);
}

export async function AddVisitor(hashedUrl: string | undefined, lat: number | undefined, lon: number | undefined): Promise<AxiosResponse<Link>> {
  const params = {
    hashedUrl: hashedUrl,
    lat: lat?.toString(),
    lon: lon?.toString(),
  }

  return await HTTP.post<Link>(`/api/links/visitor`, params);
}

export async function GetShortUrlDetails(hashedUrl: string | undefined | null): Promise<AxiosResponse<ShortUrlModel>> {
  return await HTTP.get<ShortUrlModel>(`/api/links/shorturl?hashedUrl=${hashedUrl}`);
}

export async function GetUrl(hashedUrl: string | undefined): Promise<AxiosResponse<Link>> {
  return await HTTP.get<Link>(`/api/links/originalurl?hashedUrl=${hashedUrl}`);
}