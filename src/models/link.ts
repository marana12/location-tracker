export default interface Link {
    id: number
    originalUrl: string
    shortUrl: string
    hashUrl: string
    createDate: string
    modifiedDate: string
}

export interface SearchLinkResult {
    id: number,
    hashUrl: string,
    highlightedText: string,
    originalUrl: string,
    searchTerm: string,
    shortUrl: string
}