import { profile } from "../utils/profiler";

@profile
export class Scheduler {
  public static run() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const sourcesList = Object.values(Game.rooms).map(room => room.sources);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sourcesList.map(sources => sources.map(source => console.log(source)));
  }
}
