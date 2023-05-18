import * as DataLoader from "dataloader"
import { Injectable } from "@nestjs/common";
import { User, UserService } from "~/user";

@Injectable()
export class OrderLoader {
	constructor(
		private readonly userService: UserService
	) { }

	// 
	public readonly batchUsers = new DataLoader<string[], User[]>(
		async (userIds: string[][]) => {
			const ids = [...new Set(userIds.flat())]
			const users = await this.userService.findMany({ idIn: ids })
			return userIds.map(ids => ids.map(id => users.find(user => user._id === id)))
		}
	)
}