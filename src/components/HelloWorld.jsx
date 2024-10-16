import React from "react";
import { withVisibility } from "../hocs/withVisibility";

const HelloWorld = () => <>Hello World</>;

const HelloWorldWithVisibility = withVisibility(HelloWorld);

export { HelloWorldWithVisibility as HelloWorld };
