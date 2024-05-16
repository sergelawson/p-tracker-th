import logger from "pino";
import dayjs from "dayjs";

const log = logger({
  base: {
    pid: false,
  },
});

export default log;
