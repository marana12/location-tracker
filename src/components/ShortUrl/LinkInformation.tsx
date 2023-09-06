import Link from "../../models/link";

interface LinkInformationProps {
  link: Link;
}

export default function LinkInformation({ link }: LinkInformationProps) {
  return (
    <div className="link-info-table">
      <div className="link-info-table--row">
        <div className="link-info-table--cell">Redirect URL</div>
        <div className="link-info-table--cell">
          <a href="" target="_blank" rel="noreferrer">
            {link.originalUrl}
          </a>
        </div>
      </div>
      <div className="link-info-table--row">
        <div className="link-info-table--cell">Hash code</div>
        <div className="link-info-table--cell">{link.hashUrl}</div>
      </div>
      <div className="link-info-table--row">
        <div className="link-info-table--cell">ShortedLink</div>
        <div className="link-info-table--cell">{link.shortUrl}</div>
      </div>
    </div>
  );
}
