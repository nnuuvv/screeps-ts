Object.defineProperty(Room.prototype, "centralStorage", {
  get() {
    if (this.storage) return this.storage;
    if (this.memory.centralStorageId) return Game.getObjectById(this.memory.centralStorageId as Id<StructureContainer>);
  },
  set(newValue: StructureContainer) {
    this.memory.centralStorageId = newValue.id;
  }
});
