import { handleApiRequest } from "../server.js";

export default function handler(request, response) {
  request.url = "/api/chat";
  return handleApiRequest(request, response);
}
