interface ProfilerMemory {
  data: { [name: string]: ProfilerData };
  start?: number;
  total: number;
  isEnabled: boolean;
}

interface ProfilerData {
  calls: number;
  time: number;
}

interface Profiler {
  clear(): string;
  output(): string;
  start(): string;
  status(): string;
  stop(): string | void;
  toString(): string;
}
