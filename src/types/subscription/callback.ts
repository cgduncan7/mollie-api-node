import { List } from '../list';
import { ISubscription } from '../subscription';

/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type CreateCallback = (error: any, subscription?: ISubscription) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type GetCallback = (error: any, subscription?: ISubscription) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type ListCallback = (error: any, subscriptions?: List<ISubscription>) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type UpdateCallback = (error: any, subscription?: ISubscription) => void;
/**
 * @deprecated since 2.2.0 - All callbacks will be removed in a future version
 */
export type CancelCallback = (error: any, success?: boolean) => void;