import { hash, verify } from "@node-rs/argon2";
import crypto from "node:crypto";

const EncAlgorithm = "aes-256-gcm";
const EncKey = crypto
  .createHash("sha256")
  .update(process.env.ENCRYPTION_KEY)
  .digest();

export const hashEntity = async (entity: string) => {
  return await hash(entity);
};

export const verifyHashedEntity = async (hash: string, entity: string) => {
  return await verify(hash, entity);
};

export const encryptEntity = async (entity: string) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(EncAlgorithm, EncKey, iv);

  const encrypted = Buffer.concat([
    cipher.update(entity, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
    tag: tag.toString("hex"),
  };
};

export const decryptEntity = ({
  iv,
  content,
  tag,
}: {
  iv: string;
  content: string;
  tag: string;
}) => {
  const decipher = crypto.createDecipheriv(
    EncAlgorithm,
    EncKey,
    Buffer.from(iv, "hex"),
  );

  decipher.setAuthTag(Buffer.from(tag, "hex"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(content, "hex")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};
