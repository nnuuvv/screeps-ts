import { ErrorMapper } from "utils/ErrorMapper";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line sort-imports
// import "utils/caching";
// eslint-disable-next-line sort-imports
import { usefulConstants } from "./usefulConstants";
// eslint-disable-next-line sort-imports
import * as Profiler from "utils/profiler";
import { Scheduler } from "scheduler/scheduler";

// eslint-disable-next-line no-underscore-dangle
global.Profiler = Profiler.init(usefulConstants.IS_SIM);
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
  // run scheduler
  Scheduler.run();
});
