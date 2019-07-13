const Router = require('koa-router');

const createArticlesRouter = require('../v1/articles');
const createArticleSourcesRouter = require('../v1/article-sources');
const createFillsRouter = require('../v1/fills');
const createMetricsRouter = require('./metrics');
const createRelayerRouter = require('./relayer');
const createRelayersRouter = require('./relayers');
const createStatsRouter = require('./stats');
const createTokenRouter = require('../v1/token');
const createTokensRouter = require('./tokens');
const transformToken = require('./util/transform-token');

const createRouter = () => {
  const router = new Router();

  router.use(
    createArticlesRouter().routes(),
    createArticleSourcesRouter().routes(),
    createFillsRouter().routes(),
    createTokenRouter({ transformer: transformToken }).routes(),
    createTokensRouter().routes(),
    createRelayerRouter().routes(),
    createRelayersRouter().routes(),
    createStatsRouter().routes(),
    createMetricsRouter().routes(),
  );

  return router;
};

module.exports = createRouter;
