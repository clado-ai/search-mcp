import { config } from "dotenv";

// Add fetch polyfill for Node.js compatibility
if (!globalThis.fetch) {
  globalThis.fetch = require('node-fetch');
}

config();


export const makeCladoRequest = async (url: string, options: RequestInit): Promise<any> => {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${process.env.CLADO_API_KEY}`,
    },
  });
  return res;
};


export const logWithTimestamp = ({
  level = "info",
  name = "clado",
  data,
}: {
  level?: "info" | "warning" | "error" | "debug";
  name?: string;
  data?: any;
}) => {
  const timestamp = new Date().toISOString();

  const consoleData = [`${timestamp} [${name}] [${level}]`];
  if (Array.isArray(data)) {
    consoleData.push(...data);
  } else {
    consoleData.push(data);
  }

  if (level === "error") {
    console.error(...consoleData);
  } else if (level === "warning") {
    console.warn(...consoleData);
  } else {
    console.log(...consoleData);
  }
};
