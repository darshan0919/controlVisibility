import React from 'react';
import { withVisibility } from '../hocs/withVisibility';

const Text = ({ text }) => <>{text}</>;

const TextWithVisibility = withVisibility(Text);

export { TextWithVisibility as Text };
