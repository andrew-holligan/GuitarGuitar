from datetime import datetime

from utils.get_modules import filter_by_field


def filter_orders_by_OrderStatus(orders, OrderStatus):
    # 0 is default for dont filter
    if OrderStatus == 0:
        return orders

    filter = {
        1: filter_by_field(orders, "OrderStatus", 1),
        2: filter_by_field(orders, "OrderStatus", 2),
        3: filter_by_field(orders, "OrderStatus", 3),
        4: filter_by_field(orders, "OrderStatus", 4),
        5: filter_by_field(orders, "OrderStatus", 5),
        6: filter_by_field(orders, "OrderStatus", 6),
    }

    return filter[OrderStatus]


# TODO - fix this
def sort_orders(orders, sortField, sortDirection):
    (
        orders.sort(
            key=lambda order: datetime.strptime(
                order["DateCreated"], "%Y-%m-%dT%H:%M:%S"
            )
        )
        if sortField == "DateCreated"
        else orders.sort(key=lambda order: order["OrderTotal"])
    )

    if sortDirection == "asc":
        return orders
    return orders[::-1]
