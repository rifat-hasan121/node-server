import { IncomingMessage, ServerResponse } from "http";

export type RequestHandler = (req: IncomingMessage, res: ServerResponse) => void;

export const routes: Map<string, Map<string, RequestHandler>> = new Map();

function addRoute(method: string, path: string, handler: RequestHandler) {
  if (!routes.has(method)) routes.set(method, new Map());
  routes.get(method)!.set(path, handler);
}

export default addRoute;