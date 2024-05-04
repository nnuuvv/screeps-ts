export function fillFromSource(creep: Creep, source: Source): void {
  // move to source if out of range
  if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source);
  // harvest source
  creep.harvest(source);
  // disable filling status if full
  if (creep.isFull) creep.memory.filling = false;
}
export function fillFromStorage(creep: Creep, storage: StructureContainer | StructureStorage): void {
  // move to storage if out of range
  if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.moveTo(storage);
  // withdraw from storage
  creep.withdraw(storage, RESOURCE_ENERGY);
  // disable filling status if full
  if (creep.isFull) creep.memory.filling = false;
}
