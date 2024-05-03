import { profile } from "../utils/profiler";

@profile
export class Scheduler {
  public static run() {
    console.log("Running Scheduler");
    // const sourcesList = Object.values(Game.rooms).map(room => room.find(FIND_SOURCES));
    // sourcesList.map(sources => sources.map(source => console.log(source)));
  }
}
