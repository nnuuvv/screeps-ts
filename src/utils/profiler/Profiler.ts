export function init(enabled = false): Profiler {
  const defaults = {
    data: {},
    total: 0,
    isEnabled: enabled
  };

  if (!Memory.profiler) {
    Memory.profiler = defaults;
  }

  const cli: Profiler = {
    clear(): string {
      const running = isRunning();
      Memory.profiler = defaults;
      if (running) {
        Memory.profiler.start = Game.time;
      }
      return "Profiler Memory cleared";
    },

    output(): string {
      outputProfilerData();
      return "Done";
    },

    start(): string {
      Memory.profiler.start = Game.time;
      return "Profiler started";
    },

    status(): string {
      if (isRunning()) {
        return "Profiler is running";
      }
      return "Profiler is stopped";
    },

    stop(): string | void {
      if (!isRunning()) {
        return;
      }
      const timeRunning = Game.time - Memory.profiler.start!;
      Memory.profiler.total += timeRunning;
      delete Memory.profiler.start;
      return "Profiler stopped";
    },

    toString(): string {
      return (
        "Profiler.start() - Starts the profiler\n" +
        "Profiler.stop() - Stops/Pauses the profiler\n" +
        "Profiler.status() - Returns whether is profiler is currently running or not\n" +
        "Profiler.output() - Pretty-prints the collected profiler data to the console\n" +
        this.status()
      );
    }
  };

  return cli;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function wrapFunction(obj: { [key: string]: any }, key: PropertyKey, className?: string) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, key);
  if (!descriptor || descriptor.get || descriptor.set) {
    return;
  }

  if (key === "constructor") {
    return;
  }

  const originalFunction = descriptor.value;
  if (!originalFunction || typeof originalFunction !== "function") {
    return;
  }

  // set a key for the object in memory
  if (!className) {
    className = obj.constructor ? `${obj.constructor.name}` : "";
  }
  const memKey = className + `:${String(key)}`;

  // set a tag, so we don't wrap a function twice
  const savedName = `__${String(key)}__`;
  if (savedName in obj) {
    return;
  }

  obj[savedName] = originalFunction;

  // /////////

  obj[String(key)] = function (this: any, ...args: any[]) {
    if (isRunning()) {
      const start = Game.cpu.getUsed();
      const result = originalFunction.apply(this, args);
      const end = Game.cpu.getUsed();
      record(memKey, end - start);
      return result;
    }
    // ...
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function profile(target: Function): void;
// eslint-disable-next-line @typescript-eslint/ban-types
export function profile(target: object, key: string | symbol, _descriptor: TypedPropertyDescriptor<Function>): void;
export function profile(
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: object | Function,
  key?: string | symbol,
  // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-unused-vars
  _descriptor?: TypedPropertyDescriptor<Function>
): void {
  if (Memory.profiler && !Memory.profiler.isEnabled) {
    return;
  }
  if (key) {
    // case of method decorator
    wrapFunction(target, key);
    return;
  }
  // case of class decorator
  const ctor = target as any;
  if (!ctor.prototype) {
    return;
  }

  // get default class props
  const standardClassProps = Object.getOwnPropertyNames(class _ {});
  // get custom static properties of current class
  const isOwnStaticMember = (propName: string) => !standardClassProps.includes(propName);
  const staticMembers = Object.getOwnPropertyNames(ctor).filter(isOwnStaticMember);
  // get class name
  const className = ctor.name;
  // wrap static members
  staticMembers.forEach(k => {
    wrapFunction(ctor.prototype, k, className);
  });
  // get non-static members
  const keys = Object.getOwnPropertyNames(ctor.prototype).concat(
    Array.from(Object.getOwnPropertySymbols(ctor.prototype), String)
  );
  // wrap non-static members
  keys.forEach(k => {
    wrapFunction(ctor.prototype, k, className);
  });
}

function isRunning(): boolean {
  return Memory.profiler.start !== undefined;
}

function record(key: string | symbol, time: number) {
  if (!Memory.profiler.data[String(key)]) {
    Memory.profiler.data[String(key)] = {
      calls: 0,
      time: 0
    };
  }
  Memory.profiler.data[key.toString()].calls++;
  Memory.profiler.data[key.toString()].time += time;
}

interface OutputData {
  name: string;
  calls: number;
  cpuPerCall: number;
  callsPerTick: number;
  cpuPerTick: number;
}

function outputProfilerData() {
  let totalTicks = Memory.profiler.total;
  if (Memory.profiler.start) {
    totalTicks += Game.time - Memory.profiler.start;
  }

  // /////
  // Process data
  let totalCpu = 0; // running count of average total CPU use per tick
  let calls: number;
  let time: number;
  let result: Partial<OutputData>;
  const data = Object.keys(Memory.profiler.data).map(key => {
    calls = Memory.profiler.data[key].calls;
    time = Memory.profiler.data[key].time;
    result = {};
    result.name = `${key}`;
    result.calls = calls;
    result.cpuPerCall = time / calls;
    result.callsPerTick = calls / totalTicks;
    result.cpuPerTick = time / totalTicks;
    totalCpu += result.cpuPerTick;
    return result as OutputData;
  });
  console.log(JSON.stringify(data));
  data.sort((lhs, rhs) => rhs.cpuPerTick - lhs.cpuPerTick);

  // /////
  // Format data
  let output = "";

  // get function name max length
  const longestName = _.max(data, d => d.name.length).name.length + 2;

  // // Header line
  output += _.padRight("Function", longestName);
  output += _.padLeft("Tot Calls", 12);
  output += _.padLeft("CPU/Call", 12);
  output += _.padLeft("Calls/Tick", 12);
  output += _.padLeft("CPU/Tick", 12);
  output += _.padLeft("% of Tot\n", 12);

  // //  Data lines
  data.forEach(d => {
    output += _.padRight(`${d.name}`, longestName);
    output += _.padLeft(`${d.calls}`, 12);
    output += _.padLeft(`${d.cpuPerCall.toFixed(2)}ms`, 12);
    output += _.padLeft(`${d.callsPerTick.toFixed(2)}`, 12);
    output += _.padLeft(`${d.cpuPerTick.toFixed(2)}ms`, 12);
    output += _.padLeft(`${((d.cpuPerTick / totalCpu) * 100).toFixed(0)} %\n`, 12);
  });

  // // Footer line
  output += `${totalTicks} total ticks measured`;
  output += `\t\t\t${totalCpu.toFixed(2)} average CPU profiled per tick`;
  console.log(output);
}

// debugging
// function printObject(obj: object) {
//   const name = obj.constructor ? obj.constructor.name : (obj as any).name;
//   console.log("  Keys of :", name, ":");
//   Reflect.ownKeys(obj).forEach((k) => {
//     try {
//       console.log(`    ${k}: ${Reflect.get(obj, k)}`);
//     } catch (e) {
//       // nothing
//     }
//   });
// }
