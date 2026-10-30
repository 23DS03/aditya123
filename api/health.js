import { handleApiRequest } from "../server.js";

export default function handler(request, response) {
  request.url = "https://aditya123-seven.vercel.app/api/health";
  return handleApiRequest(request, response);
}
