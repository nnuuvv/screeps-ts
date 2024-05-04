import "utils/extensions/import";
import { ErrorMapper } from "utils/ErrorMapper";
import { Scheduler } from "scheduler/scheduler";
import { initMemory } from "./init";

initMemory();

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      // remove 1 from creepCount
      Memory.creepCounts[Game.creeps[name].type]--;
      delete Memory.creeps[name];
    }
  }
  // run scheduler
  Scheduler.run();
});
