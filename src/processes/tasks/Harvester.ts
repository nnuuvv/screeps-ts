/* eslint-disable no-underscore-dangle */
// eslint-disable-file no-underscore-dangle
import { fillFromSource } from "./GetEnergy";

export class Harvester {
  public constructor(source: Source, creep: Creep) {
    this.source = source;
    this.creepName = creep.name;
    this.creep.memory.filling = true;
  }
  public get creep(): Creep {
    return Game.creeps[this.creepName];
  }
  public set creep(value: Creep) {
    this.creepName = value.name;
  }
  public source: Source;
  public storage: StructureContainer | ConstructionSite<STRUCTURE_CONTAINER> | undefined;
  public creepName: string;
  public run(): boolean {
    if (this.creep.memory.filling) {
      fillFromSource(this.creep, this.source);
    } else {
      this.deposit();
    }
    return true;
  }
  private deposit() {
    // deposit into container if there is one, build one if not
    if (this.storage instanceof StructureContainer) {
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
    } else {
      this.buildStorage();
    }
  }
  private buildStorage() {
    // if storage is a constructionSite build it
    if (this.storage instanceof ConstructionSite) {
      this.creep.build(this.storage);
    } else {
      // try to find existing containers / construction sites
      if (this.findExistingContainer()) return;

      const room = this.creep.room;
      const creepPos = this.creep.pos;
      // get tiles that are usable
      const validTerrain = room
        .lookForAtArea(LOOK_TERRAIN, creepPos.y - 1, creepPos.x - 1, creepPos.y + 1, creepPos.x + 1, true)
        .filter(terrain => terrain.terrain !== "wall");
      // filter the ones with structures
      const noStructure = validTerrain.filter(pos => !room.lookForAt(LOOK_STRUCTURES, pos.x, pos.y).length);
      // get one in the middle of the array; should generally have as many free tiles as possible around it
      const target = noStructure[Math.floor(noStructure.length / 2)];
      // add construction site
      room.createConstructionSite(target.x, target.y, STRUCTURE_CONTAINER);
    }
  }
  // finds existing container or container construction sites directly around this.creep and sets this.storage to it
  private findExistingContainer(): boolean {
    const room = this.creep.room;
    const creepPos = this.creep.pos;
    // look for construction sites of type container
    const construction = room
      .lookForAtArea(LOOK_CONSTRUCTION_SITES, creepPos.y - 1, creepPos.x - 1, creepPos.y + 1, creepPos.x + 1, true)
      .filter(struct => struct.constructionSite && struct.constructionSite.structureType === STRUCTURE_CONTAINER);
    // if found, set storage to it and return
    if (construction.length) {
      this.storage = construction[0].constructionSite as ConstructionSite<STRUCTURE_CONTAINER>;
      return true;
    }
    // look for structures of type container
    const structure = room
      .lookForAtArea(LOOK_STRUCTURES, creepPos.y - 1, creepPos.x - 1, creepPos.y + 1, creepPos.x + 1, true)
      .filter(struc => struc.structure && struc.structure.structureType === STRUCTURE_CONTAINER);
    // if found set storage to it and return
    if (structure.length) {
      this.storage = structure[0].structure as StructureContainer;
      return true;
    }
    return false;
  }
}
