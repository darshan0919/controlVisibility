/* Do Not Change the contents of this file */

import React from 'react';

import { withVisibility } from '../hocs/withVisibility';

import { CLASSNAME } from '../constants/className';

const Widget = ({ text }) => <div className={CLASSNAME}>{text}</div>;

const WidgetWithVisibility = withVisibility(Widget);

export { WidgetWithVisibility as Widget };
