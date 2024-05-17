import { NextFunction, Request, Response } from "express";
import QRCode from "qrcode";

export function qrCode(req: Request, res: Response, next: NextFunction) {
  void (async () => {
    const url = req.params["url"];
    let qrCode;
    try {
      // Note: If QR code is difficult to scan from distance. We can increase redundancy.
      qrCode = await QRCode.toDataURL(url);
    } catch (error) {
      next(error);
      res.status(500).send("Error generatring QR Code");
      return;
    }
    res.status(200).send({
      qrCode,
    });
  })();
}
