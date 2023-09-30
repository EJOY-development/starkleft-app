import React, { ReactElement } from "react";
import "./UnitCard.scss";
import Unit from "../units/Unit";

interface Props {
  unit: Unit;
}

const UnitCard = ({ unit }: Props): ReactElement => {
  return (
    <div className="unit-card">
      <div className="unit-card__stat unit-card__stat--cost">{unit.cost}</div>
      <div className="unit-card__img"></div>
      <div>{unit.name}</div>
      <div className="unit-card__stat unit-card__stat--damage">{unit.currentDamage ?? 0}</div>
      <div className="unit-card__stat unit-card__stat--hp">{unit.currentHp}</div>
    </div>
  );
};

export default UnitCard;
