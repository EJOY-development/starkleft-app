import { DARKTEMPLER, DRAGOON, HIGHTEMPLER, MARINE, MEDIC, SIEGETANK, ZEALOT, ZERGLING } from "./constant";

export const RaceName = {
  TERRAN: "테란",
  PROTOSS: "프로토스",
  ZERG: "저그",
} as const;

export type RaceNameType = (typeof RaceName)[keyof typeof RaceName];

export const UnitList = {
  protoss: [ZEALOT, DRAGOON, DARKTEMPLER, HIGHTEMPLER],
  terran: [MARINE, MEDIC, SIEGETANK],
  zerg: [ZERGLING],
};
