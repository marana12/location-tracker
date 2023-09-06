import { useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

export function UseSignalR() {
  const connectionRef = useRef(null);

  useEffect(() => {
    // Create the SignalR connection and store it in the ref
    const connection = new HubConnectionBuilder()
      .withUrl("/iptrackersignalr")
      .build();

    // Start the connection
    connection
      .start()
      .then(() => {
        console.log("Conexión exitosa con el servidor SignalR");
      })
      .catch((err) => {
        console.error(err.toString());
      });

    connectionRef.current = connection;
    return () => {
      // Clean up: close the connection when the component unmounts
      connectionRef.current.stop();
    };
  }, []);

  return connectionRef;
}
