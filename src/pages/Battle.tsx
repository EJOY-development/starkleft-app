import React, { ReactElement, useEffect, useMemo, useState } from "react";
import "./Battle.scss";
import UnitCard from "../components/UnitCard";
import Troop from "../components/Troop";
import { UnitList } from "../util/type";
import UnitProductionBtn from "../molecules/UnitProductionBtn";
import Unit from "../units/Unit";

const Battle = (): ReactElement => {
  const unitList: string[] = UnitList.protoss;

  const [myHand, setMyHand] = useState<Unit[]>([]);

  const produceUnit = (unit: Unit): void => {
    if (myHand.length < 6) {
      setMyHand([...myHand, unit]);
    } else {
      alert("패가 너무 많소");
    }
  };

  return (
    <div className="battle page">
      <div className="battle__body">
        <div className="battle__quarry">asdf</div>
        <div className="battle__center">
          <div className="battle__field">
            <div>적군</div>
            <div className="battle__trooplist">
              <Troop />
              <Troop />
              <Troop />
              <Troop />
              <Troop />
            </div>
          </div>
          <div className="battle__field">
            <div>아군</div>
            <div className="battle__trooplist">
              <Troop />
              <Troop />
              <Troop />
              <Troop />
              <Troop />
            </div>
          </div>
        </div>
        <div className="battle__production">
          {unitList.map((v) => {
            return <UnitProductionBtn label={v} onClick={produceUnit} />;
          })}
        </div>
      </div>
      <div className="battle__footer">
        {myHand.map((v) => {
          return <UnitCard unit={v} />;
        })}
      </div>
    </div>
  );
};

export default Battle;
