import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { Order } from "./order.schema";
import { OrderService } from "./order.service";
import { OrderResolver } from "./order.resolver";
import { OrderLoader } from "./order.loader";
import { RecipeModule } from "~/recipe";
import { UserModule } from "~/user";

@Module({
	imports: [
		UserModule,
		RecipeModule,
		TypegooseModule.forFeature([Order])
	],
	providers: [
		OrderService,
		OrderResolver,
		OrderLoader
	],
	exports: [
		OrderService
	]
})
export class OrderModule { }