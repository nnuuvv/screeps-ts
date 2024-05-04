Object.defineProperty(Creep.prototype, "isFull", {
  get() {
    return !this.store.getFreeCapacity();
  }
});
Object.defineProperty(Creep.prototype, "isFilling", {
  get() {
    return this.memory.filling;
  },
  set(newValue) {
    this.memory.filling = newValue;
  }
});
Object.defineProperty(Creep.prototype, "type", {
  get() {
    return this.memory.type;
  },
  set(newValue: creepType) {
    this.memory.type = newValue;
  }
});
