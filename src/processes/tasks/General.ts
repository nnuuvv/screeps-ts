import { Task } from "../../typings";

export class General implements Task {
  public constructor(source: Source, container: StructureContainer | StructureStorage, creep: Creep) {
    this.source = source;
    this.storage = container;
    this.creep = creep;
  }

  public priorityMulti = 1;
  public source: Source;
  public storage: StructureContainer | StructureStorage;
  public creep: Creep;
  public run(): boolean {
    if (this.creep.isFilling) {
      if (Memory.creepCounts.harvester > 0 && Memory.creepCounts.hauler > 0) {

      }
    } else {

    }
    return true;
  }

}
