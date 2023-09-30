import { DRAGOON } from "../../util/constant";
import Unit from "../Unit";

export default class Dragoon extends Unit {
  constructor() {
    super(DRAGOON, 3, 8, 6, 7);
  }
}
