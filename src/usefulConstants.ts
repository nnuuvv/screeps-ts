/* eslint-disable @typescript-eslint/no-unused-vars */
export class usefulConstants {
  public static CREEP_ACTION_RANGES: {
    attack: 1;
    attackController: 1;
    build: 3;
    claimController: 1;
    dismantle: 1;
    generateSafeMode: 1;

    harvest: 1;
    heal: 1;
    pickup: 1;
    pull: 1;
    rangedAttack: 3;
    rangedHeal: 3;

    rangedMassAttack: 3;
    repair: 3;
    reserveController: 1;
    transfer: 1;

    upgradeController: 3;
    withdraw: 1;
  };
  public static ROOM_BOUNDARY_VALUES: {
    minX: 0;
    minY: 0;
    maxX: 49;
    maxY: 49;
  };
  // energy per tick
  public static SOURCE_GOAL_OWNED = SOURCE_ENERGY_CAPACITY / ENERGY_REGEN_TIME;
  public static SOURCE_GOAL_NEUTRAL = SOURCE_ENERGY_NEUTRAL_CAPACITY / ENERGY_REGEN_TIME;
  public static SOURCE_GOAL_KEEPER = SOURCE_ENERGY_KEEPER_CAPACITY / ENERGY_REGEN_TIME;
  public static SOURCE_HARVEST_PARTS = SOURCE_ENERGY_CAPACITY / HARVEST_POWER / ENERGY_REGEN_TIME;
  public static SOURCE_HARVEST_PARTS_NEUTRAL = SOURCE_ENERGY_NEUTRAL_CAPACITY / HARVEST_POWER / ENERGY_REGEN_TIME;
  public static SOURCE_HARVEST_PARTS_KEEPER = SOURCE_ENERGY_KEEPER_CAPACITY / HARVEST_POWER / ENERGY_REGEN_TIME;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public static SOURCE_CARRY_PARTS_PER_DISTANCE_OWNED = usefulConstants.SOURCE_GOAL_OWNED / CARRY_CAPACITY;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public static SOURCE_CARRY_PARTS_PER_DISTANCE_NEUTRAL = usefulConstants.SOURCE_GOAL_NEUTRAL / CARRY_CAPACITY;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public static SOURCE_CARRY_PARTS_PER_DISTANCE_KEEPER = usefulConstants.SOURCE_GOAL_KEEPER / CARRY_CAPACITY;
  public static RAMPART_UPKEEP = RAMPART_DECAY_AMOUNT / REPAIR_POWER / RAMPART_DECAY_TIME;
  public static ROAD_UPKEEP = ROAD_DECAY_AMOUNT / REPAIR_POWER / ROAD_DECAY_TIME;
  public static ROAD_UPKEEP_SWAMP =
    (ROAD_DECAY_AMOUNT * CONSTRUCTION_COST_ROAD_SWAMP_RATIO) / REPAIR_POWER / ROAD_DECAY_TIME;
  public static ROAD_UPKEEP_TUNNEL =
    (ROAD_DECAY_AMOUNT * CONSTRUCTION_COST_ROAD_WALL_RATIO) / REPAIR_POWER / ROAD_DECAY_TIME;
  public static CONTAINER_UPKEEP = CONTAINER_DECAY / REPAIR_POWER / CONTAINER_DECAY_TIME_OWNED;
  public static REMOTE_CONTAINER_UPKEEP = CONTAINER_DECAY / REPAIR_POWER / CONTAINER_DECAY_TIME;
  public static IS_PTR = Game.shard && Game.shard.ptr;
  // eslint-disable-next-line prettier/prettier
  public static IS_SIM = !!Game.rooms.sim;
  public static IS_MMO = !!(Game.shard && Game.shard.name && Game.shard.name.startsWith("shard"));
}
