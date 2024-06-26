﻿import * as Profiler from "./utils/profiler";
declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
    // key is name
    processes: Record<string, Task>;
    profiler: ProfilerMemory;
    // type to id's
    creepCounts: Record<creepType, number>;
  }
  type creepType = "harvester" | "hauler" | "general" | "spawnKeeper";
  interface Creep {
    isFull: boolean;
    isFilling: boolean;
    type: creepType;
  }
  interface CreepMemory {
    type: string;
    room: string;
    working: boolean;
    filling: boolean;
  }

  interface Room {
    sources: Source[];
    centralStorage: StructureStorage | StructureContainer;
  }
  interface RoomMemory {
    sourceIds: string[];
    centralStorageId: string;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      log: any;
      Profiler: Profiler;
      tasks: Task[];
    }
  }
}

interface Task {
  priorityMulti: number;
  run(): boolean;
}
