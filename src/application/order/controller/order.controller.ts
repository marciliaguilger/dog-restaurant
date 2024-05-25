import { Body, Controller, Get, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { IOrderUseCase } from "src/domain/order/use-cases/order-use-case.interface";
import { CreateOrderInput } from "../dtos/input/create-order.input";
import { UpdateOrderInput } from "src/application/order/dtos/input/update-order.input";
import { OrderMapper } from "../mapper/order.mapper";
import { CheckoutOrderInput } from "../dtos/input/checkout-order.input";
import { ApiTags } from "@nestjs/swagger";
import { OrderStatus } from "src/domain/order/enum/order-status.enum";

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

    @Put(':orderId/state')
    async updateOrderStatus(@Param('orderId') orderId: string, @Body() updateOrder: UpdateOrderInput) {
        if (!updateOrder.status) {
            throw new Error('Invalid order status');
        }
        await this.orderUseCase.updateOrderStatus(orderId, updateOrder.status);
        return { message: 'Order status updated successfully' };
    }

    @Put(':orderId/checkout')
    async checkoutOrder(@Param('orderId') orderId: string, @Body() checkoutOrder: CheckoutOrderInput) {
        this.orderUseCase.payOrder(orderId, checkoutOrder.qrCode)
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