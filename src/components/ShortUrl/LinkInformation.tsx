import Link from "../../models/link";

interface LinkInformationProps {
  link: Link;
}

export default function LinkInformation({ link }: LinkInformationProps) {
  return (
    <div className="link-info-table">
      <div className="link-info-table--row">
        <div className="link-info-table--cell link-info-table--cell-title">
          Redirect URL
        </div>
        <div className="link-info-table--cell">
          <a href="" target="_blank" rel="noreferrer">
            {link.originalUrl}
          </a>
        </div>
      </div>
      <div className="link-info-table--row">
        <div className="link-info-table--cell link-info-table--cell-title">
          Hash code
        </div>
        <div className="link-info-table--cell">{link.hashUrl}</div>
      </div>
      <div className="link-info-table--row">
        <div className="link-info-table--cell link-info-table--cell-title">
          ShortedLink
        </div>
        <div className="link-info-table--cell">{link.shortUrl}</div>
      </div>
    </div>
  );
}
