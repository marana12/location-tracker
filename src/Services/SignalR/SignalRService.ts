import { HubConnectionBuilder, HubConnection, LogLevel } from "@microsoft/signalr";
import { urlConfig } from "../config";

export default class SignalRService {
  connectionBuilder = new HubConnectionBuilder();
  url: string;
  connection: any;

  constructor(_url: string) {
    this.url = urlConfig.BASE_URL + _url;
  }

  init = () => {
    this.build();
    this.start();
  };

  createConncetion = () => {
    this.connection = this.build();
    this.start();
  };

  build = (): HubConnection => {
    return this.connectionBuilder
      .withUrl(this.url)
      .configureLogging(LogLevel.Information)
      .build();
  };

  start = () => {
    if (this.connection === null || this.connectionBuilder === null) {
      console.log("The connection can't start");
      return;
    }
    this.connection
      .start()
      .then(() => {
        console.log("Conexión exitosa con el servidor SignalR");
      })
      .catch((err: any) => {
        console.error(err.toString());
      });
  };

  stop = () => {
    if (this.connection === null) {
      console.error("The connection can't close");
      return;
    }
    this.connection.stop();
  };
}