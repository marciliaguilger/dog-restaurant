import { Body, Controller, Inject, Param, Post, Put } from "@nestjs/common";
import { IOrderUseCase } from "src/domain/order/use-cases/order-use-case.interface";
import { CreateOrderInput } from "../../../domain/order/dtos/input/create-order.input";
import { UpdateOrderInput } from "src/domain/order/dtos/input/update-order.input";

@Controller('orders')
export class OrderController {
    constructor(
        @Inject(IOrderUseCase)
        private readonly orderUseCase: IOrderUseCase) {}
    
        
    @Post()
    async createOrder(@Body() createOrderInput: CreateOrderInput){
        this.orderUseCase.createOrder(createOrderInput)
    }


    //TODO: VER MELHOR PRATICA PARA ATUALIZAR O STATUS
    @Put(':orderId/status')
    async updateOrderStatus(@Param(':orderId') orderId: string, @Body() updateOrder: UpdateOrderInput) {
        this.orderUseCase.updateOrderStatus(orderId, updateOrder)
    }

}

