'use strict';

const appBuilder = require('./app-builder');
const ws = require('./shared/websocket');

const { getServerConfig } = require('./shared/config');

const port = getServerConfig().port;

const main = async () => {
  const app = await appBuilder.build();

  const server = app.listen(port);

  ws.init(server);
  ws.enable();
};

main()
  .then(() => {
    console.log(`server listen on port ${port}`);
  })
  .catch((err) => {
    console.error(err);
  });
