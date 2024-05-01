/* eslint-disable no-underscore-dangle */

module.exports = Object.defineProperty(Room.prototype, "sources", {
  get() {
    // If we dont have the value stored locally
    if (!this._sources) {
      // If we dont have the value stored in memory
      if (!this.memory.sourceIds) {
        // Find the sources and store their id's in memory,
        // NOT the full objects
        this.memory.sourceIds = this.find(FIND_SOURCES).map((source: { id: string }) => source.id);
        console.log("found sources");
      }
      // Get the source objects from the id's in memory and store them locally
      this._sources = this.memory.sourceIds.map((id: string) => Game.getObjectById(id));
      console.log("got sources from cache");
    }
    // return the locally stored value
    return this._sources;
  },
  set(newValue) {
    // when storing in memory you will want to change the setter
    // to set the memory value as well as the local value
    this.memory.sources = newValue.map((source: { id: string }) => source.id);
    this._sources = newValue;
  },
  enumerable: false,
  configurable: true
});
