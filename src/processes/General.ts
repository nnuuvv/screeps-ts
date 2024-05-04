import { Task } from "../typings";

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

    } else {

    }
    return true;
  }
  private fillFromSource() {
    // move to source if out of range
    if (this.creep.harvest(this.source) === ERR_NOT_IN_RANGE) this.creep.moveTo(this.source);
    // harvest source
    this.creep.harvest(this.source);
    // disable filling status if full
    if (this.creep.isFull) this.creep.memory.filling = false;
  }
  private fillFromStorage() {
    // move to source if out of range
    if (this.creep.harvest(this.source) === ERR_NOT_IN_RANGE) this.creep.moveTo(this.source);
    // harvest source
    this.creep.harvest(this.source);
    // disable filling status if full
    if (this.creep.isFull) this.creep.memory.filling = false;
  }
}
