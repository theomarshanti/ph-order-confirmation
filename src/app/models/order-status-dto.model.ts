import { OrderCard } from './order-card.model';

export enum StatusChangeActions {
    ADD_ITEM = 'ADD_ITEM',
    EDIT_ITEM = 'EDIT_ITEM',
    DELETE_ITEM = 'DELETE_ITEM',
    COMPLETE_ORDER = 'COMPLETE_ORDER'
}

export class OrderStatusDto extends OrderCard {
    actionType: StatusChangeActions;
}

export class ActionOrderCard {
    actionType: StatusChangeActions;
    product: OrderCard;
}