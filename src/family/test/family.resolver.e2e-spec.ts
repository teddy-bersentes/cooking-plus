import { Test, TestingModule } from '@nestjs/testing'
import { TypegooseModule, getModelToken } from 'nestjs-typegoose'
import { rootTypegooseTestModule, closeMongoTestServer, seed } from '~/shared/test'
import { Family, FamilyResolver, FamilyService, FamilyReturnType, JoinFamilyArgs } from '~/family'
import { CreateUserInput, User, UserModule } from '~/user'
import { NotFoundException } from '@nestjs/common'

describe('FamilyResolver', () => {
	let familyResolver: FamilyResolver
	let familyModel: FamilyReturnType

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				rootTypegooseTestModule(),
				TypegooseModule.forFeature([Family, User]),
				UserModule
			],
			providers: [
				FamilyResolver,
				FamilyService
			],
		}).compile()

		familyResolver = module.get<FamilyResolver>(FamilyResolver)
		familyModel = module.get<FamilyReturnType>(getModelToken(Family.name))
	})

	afterAll(async () => {
		await closeMongoTestServer()
	})

	beforeEach(async () => {
		await seed({ Family: familyModel })
	})

	it('should be defined', () => {
		expect(familyResolver).toBeDefined()
	})

	it('should create a family', async () => {
		const userInput: CreateUserInput = {
			name: 'New User',
			phoneNumber: '+15559998888',
			dietaryRestrictions: ['Vegan'],
		};

		const family = await familyResolver.createFamily(
			'sms|new-user',
			userInput,
			{ name: 'New Family' }
		);

		expect(family).toMatchObject({
			name: 'New Family',
			members: expect.arrayContaining(['sms|new-user']),
		});
	});

	it('should join an existing family', async () => {
		const userInput: CreateUserInput = {
			name: 'New Member',
			phoneNumber: '+15551112222',
			dietaryRestrictions: ['Gluten Free'],
		};

		const joinFamilyArgs: JoinFamilyArgs = {
			familyId: '6434c168869f69d611f1ddc3'
		};

		const family = await familyResolver.joinFamily(
			'sms|new-member',
			userInput,
			joinFamilyArgs
		);

		expect(family._id).toEqual(joinFamilyArgs.familyId.toObjectId());
		expect(family.members).toContain('sms|new-member');
	})

	it('should throw NotFoundException when trying to join a non-existent family', async () => {
		const userInput: CreateUserInput = {
			name: 'New Member',
			phoneNumber: '+15551113333',
			dietaryRestrictions: ['Vegetarian'],
		};

		const joinFamilyArgs: JoinFamilyArgs = {
			familyId: '6434c1f8a981030adde8f599',
		};

		await expect(
			familyResolver.joinFamily('sms|non-existent-family-member', userInput, joinFamilyArgs),
		).rejects.toThrowError(NotFoundException);
	});
})