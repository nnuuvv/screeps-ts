import * as Profiler from "./utils/profiler";
import { usefulConstants } from "./usefulConstants";

export function initMemory(): void {
  global.Profiler = Profiler.init(usefulConstants.IS_SIM);
  initCreepCount();
}

function initCreepCount() {
  // init memory creep counts from current creeps
  Memory.creepCounts = {
    harvester: 0,
    hauler: 0,
    general: 0
  };
  _.map(Game.creeps, creep => {
    Memory.creepCounts[creep.type]++;
  });
}
