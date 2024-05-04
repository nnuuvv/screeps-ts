import { Task } from "../typings";

export class Harvester implements Task {
  public constructor(source: Source, container: StructureContainer, creep: Creep) {
    this.source = source;
    this.storage = container;
    this.creep = creep;
  }

  public priorityMulti = 1;
  public source: Source;
  public storage: StructureContainer;
  public creep: Creep;
  public run(): boolean {
    if (this.creep.memory.filling) {
      this.fill();
    } else {
      this.deposit();
    }
    return true;
  }
  private fill() {
    // move to source if out of range
    if (this.creep.harvest(this.source) === ERR_NOT_IN_RANGE) this.creep.moveTo(this.source);
    // harvest source
    this.creep.harvest(this.source);
    // disable filling status if full
    if (this.creep.isFull) this.creep.memory.filling = false;
  }
  private deposit() {
    // move to storage if out of range
    if (this.creep.transfer(this.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.storage);
    } else {
      // if storage hp isn't full; repair it
      if (this.storage.hitsMax > this.storage.hits) {
        this.creep.repair(this.storage);
      }
      // transfer energy
      this.creep.transfer(this.storage, RESOURCE_ENERGY);
      // enable filling status if empty
      if (this.creep.isFull) this.creep.memory.filling = true;
    }
  }
}
