import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { TypegooseModule } from "nestjs-typegoose";
import { User } from "./user.schema";
import { UserService } from "./user.service";

@Module({
	imports: [
		TypegooseModule.forFeature([User])
	],
	providers: [
		UserService,
		UserResolver
	],
	exports: [
		UserService
	]
})
export class UserModule { }