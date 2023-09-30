import React, { ReactElement, useEffect, useState } from "react";
import Unit from "../units/Unit";
import Zealot from "../units/protoss/Zealot";
import { DARKTEMPLER, DRAGOON, HIGHTEMPLER, MARINE, MEDIC, SIEGETANK, ZEALOT, ZERGLING } from "../util/constant";
import Dragoon from "../units/protoss/Dargoon";
import HighTempler from "../units/protoss/HighTempler";
import DarkTempler from "../units/protoss/DarkTempler";
import Marine from "../units/terran/Marine";
import Medic from "../units/terran/Medic";
import SiegeTank from "../units/terran/SiegeTank";
import Zergling from "../units/zerg/Zergling";

interface Props {
  label: string;
  onClick: (u: Unit) => void;
}

const UnitProductionBtn = ({ label, onClick }: Props): ReactElement => {
  const [accessibleUnit, setAcccessibleUnit] = useState<Unit | null>(null);

  useEffect(() => {
    let unit: Unit | null = null;

    switch (label) {
      case ZEALOT:
        unit = new Zealot();
        break;
      case DRAGOON:
        unit = new Dragoon();
        break;
      case HIGHTEMPLER:
        unit = new HighTempler();
        break;
      case DARKTEMPLER:
        unit = new DarkTempler();
        break;
      case MARINE:
        unit = new Marine();
        break;
      case MEDIC:
        unit = new Medic();
        break;
      case SIEGETANK:
        unit = new SiegeTank();
        break;
      case ZERGLING:
        unit = new Zergling();
        break;
    }

    setAcccessibleUnit(unit);
  }, []);

  const setUnit = (): void => {
    if (accessibleUnit) {
      onClick(accessibleUnit);
    } else {
      console.log("유닛 생성 에러");
    }
  };

  return (
    <button className="unit_production_btn" onClick={setUnit}>
      {label} 생산
    </button>
  );
};

export default UnitProductionBtn;
