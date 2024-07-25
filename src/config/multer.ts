import path from "path";
import crypto from "crypto";
import { FileFilterCallback } from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

export const multerConfig = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: multerS3({
    s3: new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: "AKIAXLY2IXZADX2ZI3UR",
        secretAccessKey: "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",
      },
    }),
    bucket: "projeto-confia",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
};
      