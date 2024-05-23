import { Body, Controller, Inject, Param, Post, Put } from "@nestjs/common";
import { IOrderUseCase } from "src/domain/order/use-cases/order-use-case.interface";
import { CreateOrderInput } from "../dtos/input/create-order.input";
import { UpdateOrderInput } from "src/application/order/dtos/input/update-order.input";
import { OrderMapper } from "../mapper/order.mapper";

@Controller('orders')
export class OrderController {
    constructor(
        @Inject(IOrderUseCase)
        private readonly orderUseCase: IOrderUseCase,
        private readonly orderMapper: OrderMapper
    ) {}
    
        
    @Post()
    async createOrder(@Body() createOrderInput: CreateOrderInput){
        let combos = await this.orderMapper.mapToComboList(createOrderInput.combs)
        
        return { orderId: await this.orderUseCase.createOrder(createOrderInput.customerId, combos) }
    }


    //TODO: VER MELHOR PRATICA PARA ATUALIZAR O STATUS
    @Put(':orderId/status')
    async updateOrderStatus(@Param(':orderId') orderId: string, @Body() updateOrder: UpdateOrderInput) {
        this.orderUseCase.updateOrderStatus(orderId)
    }

}

