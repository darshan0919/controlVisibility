/* Do Not Change the contents of this file */

import React from 'react';
import { withVisibility } from '../hocs/withVisibility';

const Widget = ({ text }) => (
  <div className="border border-black rounded-[8px] flex widgets-center p-3 bg-blue-200 h-[120px]">
    {text}
  </div>
);

const WidgetWithVisibility = withVisibility(Widget);

export { WidgetWithVisibility as Widget };
