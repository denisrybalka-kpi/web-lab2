import { PostModel } from "./model.js";
import { PostView } from "./view.js";
import { PostController } from "./controller.js";
import { MockServer } from "./server/index.js";

document.addEventListener("DOMContentLoaded", () => {
  const model = new PostModel(MockServer);
  const view = new PostView();
  new PostController(model, view);
});
