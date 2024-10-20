/* Do Not Change the contents of this file */

import React from 'react';
import { Item } from './Item';
import { ITEMS } from '../constants/items';

export default function Body({ enableConfig }) {
  return (
    <div
      key={`${enableConfig}`}
      className="border border-black rounded-[8px] w-full flex flex-col gap-3 p-3 bg-yellow-100"
    >
      {ITEMS.map((item) => (
        <Item
          text={item.text}
          conditionsConfig={enableConfig ? item.conditionsConfig : undefined}
        />
      ))}
    </div>
  );
}
