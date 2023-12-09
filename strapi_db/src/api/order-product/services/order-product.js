'use strict';

/**
 * order-product service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::order-product.order-product');
