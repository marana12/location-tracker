interface VisitorInfoDateTimeProps {
  dateTime: string;
}

const VisitorInfoDateTime = ({ dateTime }: VisitorInfoDateTimeProps) => {
  const date = new Date(dateTime);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  const hour = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hour}:${minutes}`;

  return (
    <div className="location-date-time">
      <div className="location-date-time__date">{formattedDate}</div>
      <div className="location-date-time__time">{formattedTime}</div>
    </div>
  );
};

export default VisitorInfoDateTime;
