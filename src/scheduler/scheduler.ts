import { profile } from "../utils/profiler";

@profile
export class Scheduler {
  // public static test(): Task {}
  public static run() {
    const sourcesList = Object.values(Game.rooms).map(room => room.find(FIND_SOURCES));
    sourcesList.map(sources => sources.map(source => console.log(source)));
  }
}
