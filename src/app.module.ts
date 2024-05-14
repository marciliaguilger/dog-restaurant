import { Module } from '@nestjs/common';
import { CustomerModule } from './application/customer/customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
