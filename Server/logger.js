const logger = (req) => {
  const curtime = new Date().toISOString();
  console.log(`REQUEST: ${req.method} -- [${curtime}]`);
};

export default logger;
