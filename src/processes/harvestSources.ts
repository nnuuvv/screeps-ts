import { Task } from "../typings";

class HarvestSources implements Task {
  public static priorityMulti = 1;
  public static run() {
    return true;
  }
}

const harvestSources = {
  run() {
    const sources = Object.values(Game.rooms).map(Room => Room.find(FIND_SOURCES));
  }
};

module.exports = harvestSources;
