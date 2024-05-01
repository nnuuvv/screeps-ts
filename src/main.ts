import { ErrorMapper } from "utils/ErrorMapper";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line sort-imports
// import "utils/caching";
// eslint-disable-next-line sort-imports
import { usefulConstants } from "./usefulConstants";
// eslint-disable-next-line sort-imports
import * as Profiler from "utils/profiler";

global.Profiler = Profiler.init();
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
  console.log(
    "usefulConstants:",
    usefulConstants.SOURCE_GOAL_OWNED,
    usefulConstants.SOURCE_CARRY_PARTS_PER_DISTANCE_OWNED
  );
  // const sourcesList = Object.values(Game.rooms).map(room => room.find(FIND_SOURCES));
  // sourcesList.map(sources => sources.map(source => console.log(source)));
});
