import { Body, Controller, Get, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { IOrderUseCase } from "src/domain/order/use-cases/order-use-case.interface";
import { CreateOrderInput } from "../dtos/input/create-order.input";
import { UpdateOrderInput } from "src/application/order/dtos/input/update-order.input";
import { OrderMapper } from "../mapper/order.mapper";
import { ApiTags } from "@nestjs/swagger";
import { OrderStatus as OrderState, OrderStatus } from "src/domain/order/enum/order-status.enum";

@ApiTags('Order')
@Controller('orders')
export class OrderController {
    constructor(
        @Inject(IOrderUseCase)
        private readonly orderUseCase: IOrderUseCase,
        private readonly orderMapper: OrderMapper
    ) {}

    @Post()
    async createOrder(@Body() createOrderInput: CreateOrderInput){
        let combos = await this.orderMapper.mapToComboList(createOrderInput.combos)
        return { orderId: await this.orderUseCase.createOrder(createOrderInput.customerId, combos) }
    }

    @Put(':orderId/status')
    async updateOrderStatus(@Param('orderId') orderId: string, @Body() updateOrder: UpdateOrderInput) {
        const status = OrderState[updateOrder.status as keyof typeof OrderState];
        if (!status) {
            throw new Error('Invalid order status');
        }
        await this.orderUseCase.updateOrderStatus(orderId, status);
        return { message: 'Order status updated successfully' };
    }

    @Get()
    async getAllOrders() {
        const orders = await this.orderUseCase.getAllOrders();
        return orders.map(order => this.orderMapper.mapToOrderDto(order));
    }

    @Get(':orderId')
    async getOrderById(@Param('orderId') orderId: string) {
        const order = await this.orderUseCase.getOrderById(orderId);
        return this.orderMapper.mapToOrderDto(order);
    }

    @Get('state/:state')
    async getOrdersByState(@Param('state') state: OrderStatus) {
        const orders = await this.orderUseCase.getOrdersByState(state);
        return orders.map(order => this.orderMapper.mapToOrderDto(order));
    }
}