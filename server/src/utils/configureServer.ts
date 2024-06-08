import fs from "fs";
import https from "https";
import http from "http";
import { Express } from "express";

export function configureServer(app: Express, isProduction: boolean) {
  if (isProduction) {
    const options = {
      key: fs.readFileSync(process.env["SSL_KEY_PATH"] ?? ""),
      cert: fs.readFileSync(process.env["SSL_CERT_PATH"] ?? ""),
    };
    return https.createServer(options, app);
  } else {
    return http.createServer(app);
  }
}
