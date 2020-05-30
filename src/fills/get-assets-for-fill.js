const _ = require('lodash');

const formatTokenAmount = require('../tokens/format-token-amount');
const formatTokenType = require('../tokens/format-token-type');
const formatTraderType = require('../traders/format-trader-type');
const getAssetBridgeName = require('./get-asset-bridge-name');
const getCdnTokenImageUrl = require('../tokens/get-cdn-token-image-url');

const transformAsset = asset => {
  const price = _.get(asset.price, 'USD');
  const imageUrl = _.get(asset.token, 'imageUrl', null);

  return {
    amount: formatTokenAmount(asset.amount, asset.token),
    bridgeAddress: asset.bridgeAddress,
    bridgeName: getAssetBridgeName(asset.bridgeAddress),
    price: _.isNumber(price) ? { USD: price } : undefined,
    tokenAddress: asset.tokenAddress,
    tokenId: asset.tokenId,
    tokenImageUrl: imageUrl !== null ? getCdnTokenImageUrl(imageUrl) : null,
    tokenSymbol: _.get(asset.token, 'symbol'),
    tokenType: _.get(asset.token, 'name'),
    traderType: formatTraderType(asset.actor),
    type: formatTokenType(_.get(asset.token, 'type')),
  };
};

const getAssetsForFill = fill => {
  return _.map(fill.assets, transformAsset);
};

module.exports = getAssetsForFill;
