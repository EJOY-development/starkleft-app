export const Race = {
  TERRAN: "terran",
  PROTOSS: "protoss",
  ZERG: "zerg",
} as const;

export type RaceType = (typeof Race)[keyof typeof Race];
