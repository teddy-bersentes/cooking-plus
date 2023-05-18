import { Test, TestingModule } from '@nestjs/testing'
import { TypegooseModule, getModelToken } from 'nestjs-typegoose'
import { rootTypegooseTestModule, closeMongoTestServer, seed } from '~/shared/test'
import { UserService, User, UserReturnType } from '~/user'

describe('UserService', () => {
	let userService: UserService
	let userModel: UserReturnType

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				rootTypegooseTestModule(),
				TypegooseModule.forFeature([User])
			],
			providers: [UserService],
		}).compile()

		userService = module.get<UserService>(UserService);
		userModel = module.get<UserReturnType>(getModelToken(User.name))
	});

	beforeEach(async () => {
		await seed({
			User: userModel
		})
	})

	afterAll(async () => {
		await closeMongoTestServer()
	});

	it('should be defined', () => {
		expect(userService).toBeDefined()
	});


	it('should find user by id', async () => {
		const foundUser = await userService.findOne({ id: 'sms|homer', isDeleted: false })
		expect(foundUser).toMatchObject({
			_id: 'sms|homer',
			name: 'Homer Simpson',
			family: '6434c168869f69d611f1ddc3'.toObjectId(),
		});
	});

	it('should find deleted and non-deleted users', async () => {
		const nonDeletedUser = await userService.findOne({ id: 'sms|homer', isDeleted: false })
		expect(nonDeletedUser).not.toBeNull()
		expect(nonDeletedUser._id).toBe('sms|homer')

		const deletedUser = await userService.findOne({ id: 'sms|mr-burns', isDeleted: true })
		expect(deletedUser).not.toBeNull()
		expect(deletedUser._id).toBe('sms|mr-burns')

		const nonExistentUser = await userService.findOne({ id: 'sms|non-existent', isDeleted: false })
		expect(nonExistentUser).toBeNull()

		const simpsonsUser = await userService.findOne({
			id: 'sms|homer',
			family: '6434c168869f69d611f1ddc3'.toObjectId()
		})
		expect(simpsonsUser).not.toBeNull()
		expect(simpsonsUser._id).toBe('sms|homer')
	});

	it('should find all users with available filters', async () => {
		const allUsers = await userService.findMany({});
		expect(allUsers.length).toBe(13)

		const deletedUsers = await userService.findMany({ isDeleted: true });
		expect(deletedUsers.length).toBe(3)

		const nonDeletedUsers = await userService.findMany({ isDeleted: false });
		expect(nonDeletedUsers.length).toBe(10)

		const usersInFamily = await userService.findMany({
			family: '6434c168869f69d611f1ddc3'.toObjectId(),
		});
		expect(usersInFamily.length).toBe(6)

	});

	it('should create a user', async () => {
		const newUser = await userService.create({
			_id: 'sms|new-user',
			name: 'New User',
			family: '6434c8d5cad37c7ab42cee66'.toObjectId(),
			phoneNumber: '+15559998888',
			dietaryRestrictions: [
				'Gluten Free',
			],
		})
		expect(newUser).toMatchObject({
			_id: 'sms|new-user',
			name: 'New User',
			family: '6434c8d5cad37c7ab42cee66'.toObjectId(),
			phoneNumber: '+15559998888',
			dietaryRestrictions: [
				'Gluten Free',
			],
		})
	})
})
