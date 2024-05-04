import { Harvester } from "./tasks/Harvester";
import { Task } from "../typings";

export class HarvesterProcess implements Task {
  public constructor() {
    this.Harvesters = {};

    const harvesterCreeps = _.filter(Game.creeps, creep => creep.type === "harvester");
    let sources: Source[];
    _.map(Game.rooms, room => sources.push(...room.sources));

    // there should never be more harvester type creeps than sources
    harvesterCreeps.map(creep => {
      this.Harvesters[creep.name] = new Harvester(sources.pop() as Source, creep);
    });
  }
  public priorityMulti = 1;
  private Harvesters: Record<string, Harvester>;
  public run(): boolean {
    _.map(this.Harvesters, harvester => harvester.run());
    return true;
  }
  private addNewHarvester() {
    // spawn new creep -> keep track of spawning -> add new harvester with that creep
  }
  private replaceCreep() {
    // spawn new creep -> keep track of spawning -> add creep to existing harvester that lacks a creep
  }
}
