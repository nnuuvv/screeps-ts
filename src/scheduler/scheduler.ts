import { HarvesterProcess } from "../processes/HarvesterProcess";
import { profile } from "../utils/profiler";

@profile
export class Scheduler {
  public static run() {
    if (!global.tasks) {
      global.tasks = [];
      global.tasks.push(new HarvesterProcess());
    }
  }
}
