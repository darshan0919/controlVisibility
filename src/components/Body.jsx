/* Do Not Change the contents of this file */

import React from 'react';
import { Widget } from './Widget';
import { WIDGETS } from '../constants/widgets';

export default function Body({ enableConfig }) {
  return (
    <div
      key={`${enableConfig}`}
      className="border border-black rounded-[8px] w-full grid grid-cols-2 gap-[12px] p-3 bg-yellow-100 h-[400px]"
    >
      {WIDGETS.map((widget) => (
        <Widget
          text={widget.text}
          conditionsConfig={enableConfig ? widget.conditionsConfig : undefined}
        />
      ))}
    </div>
  );
}
