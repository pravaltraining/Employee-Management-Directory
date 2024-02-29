import { Controller } from "./controller/controller.ts";
import { Model } from "./model/model.ts";
import { View } from "./view/view.ts";



const app = new Controller(new Model(), new View());


