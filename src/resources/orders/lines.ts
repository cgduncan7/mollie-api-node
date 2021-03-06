import { startsWith } from 'lodash';

import OrderLine from '../../models/OrderLine';
import OrdersResource from './base';
import Order from '../../models/Order';
import { ICancelParams, IUpdateParams } from '../../types/order/line/params';
import { CancelCallback, UpdateCallback } from '../../types/order/line/callback';
import Resource from '../../resource';

/**
 * The `orders_lines` resource
 *
 * @since 3.0.0
 */
export default class OrdersLinesResource extends OrdersResource {
  public static resource = 'orders_lines';
  public static model = OrderLine;
  public apiName = 'Orders API (Order Lines section)';

  /**
   * Cancel an order line by ID or multiple order lines
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order-lines
   *
   * @public ✓ This method is part of the public API
   *
   * @alias cancel
   */
  public delete = this.cancel;

  /**
   * Update order lines
   *
   * @param id - Order ID
   * @param params - Update order parameters
   *                 (DEPRECATED SINCE 3.0.0) Can also be a callback function
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns The updated Order object
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/update-orderline
   *
   * @public ✓ This method is part of the public API
   */
  public async update(id: string, params: IUpdateParams | UpdateCallback, cb?: UpdateCallback): Promise<Order> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Order.resourcePrefix)) {
        Resource.createApiError('The order id is invalid', typeof params === 'function' ? params : cb);
      }
      this.setParentId(id);

      return super.update(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<Order>;
    }

    const { ...parameters } = params;
    if (!startsWith(id, Order.resourcePrefix)) {
      Resource.createApiError('The order id is invalid');
    }

    this.setParentId(id);

    return super.update(id, parameters) as Promise<Order>;
  }

  /**
   * Cancel an order line by ID or multiple order lines
   *
   * @param id - Order ID
   * @param params - Cancel order lines parameters
   * @param cb - (DEPRECATED SINCE 3.0.0) Callback function, can be used instead of the returned `Promise` object
   *
   * @returns Success status
   *
   * @since 3.0.0
   *
   * @see https://docs.mollie.com/reference/v2/orders-api/cancel-order-lines
   *
   * @public ✓ This method is part of the public API
   */
  public async cancel(id: string, params?: ICancelParams, cb?: CancelCallback): Promise<boolean> {
    // Using callbacks (DEPRECATED SINCE 3.0.0)
    if (typeof params === 'function' || typeof cb === 'function') {
      if (!startsWith(id, Order.resourcePrefix)) {
        Resource.createApiError('The order id is invalid', typeof params === 'function' ? params : cb);
      }
      this.setParentId(id);

      return super.delete(id, typeof params === 'function' ? null : params, typeof params === 'function' ? params : cb) as Promise<boolean>;
    }

    if (!startsWith(id, Order.resourcePrefix)) {
      Resource.createApiError('The order id is invalid', typeof params === 'function' ? params : cb);
    }

    const { ...parameters } = params;
    this.setParentId(id);

    return !!(await super.delete(id, parameters, cb));
  }
}
