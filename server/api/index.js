import app from "../server/app.js"; // your express app

export default function handler(req, res) {
  return app(req, res);
}