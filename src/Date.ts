// Date helper fns

import { Duration } from "./Duration";

export const addDuration = (duration: Duration) => (date: Date) =>
  new Date(date.getTime() + duration.ms);