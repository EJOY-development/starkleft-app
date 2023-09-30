import { v4 } from "uuid";

export default class Unit {
  uuid: string;
  name: string;
  cost: number;
  hp: number;
  currentHp: number;
  damage?: number;
  currentDamage?: number;
  shield?: number;
  currentShield?: number;
  hpRegen?: number;
  shieldRegen?: number;

  constructor(name: string, cost: number, hp: number, damage?: number, shield?: number) {
    this.uuid = v4();
    this.cost = cost;
    this.name = name;
    this.hp = hp;
    this.currentHp = hp;
    this.damage = damage;
    this.currentDamage = damage;
    this.shield = shield;
    this.currentShield = shield;
  }

  attack(unit: Unit): boolean {
    if (this.currentDamage) {
      unit.currentHp -= unit.currentDamage!;

      return true;
    } else {
      console.log("공격 불가 메세지");

      return false;
    }
  }

  skill() {
    console.log("skill");
  }

  isDead(): boolean {
    if (this.currentShield) {
      if (this.currentHp + this.currentShield < 0) {
        return true;
      }
    } else {
      if (this.currentHp < 0) {
        return true;
      }
    }

    return false;
  }
}
