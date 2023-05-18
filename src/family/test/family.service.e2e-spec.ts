import { Test, TestingModule } from '@nestjs/testing'
import { TypegooseModule, getModelToken } from 'nestjs-typegoose'
import { rootTypegooseTestModule, closeMongoTestServer, seed } from '~/shared/test'
import { Family, FamilyService, FamilyReturnType } from '~/family'

describe('FamilyService', () => {
	let familyService: FamilyService
	let familyModel: FamilyReturnType

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				rootTypegooseTestModule(),
				TypegooseModule.forFeature([Family])
			],
			providers: [FamilyService],
		}).compile()

		familyService = module.get<FamilyService>(FamilyService)
		familyModel = module.get<FamilyReturnType>(getModelToken(Family.name))
	})

	afterAll(async () => {
		await closeMongoTestServer()
	})

	beforeEach(async () => {
		await seed({ Family: familyModel })
	})

	it('should be defined', () => {
		expect(familyService).toBeDefined()
	})

	it('should find family by id', async () => {
		const foundFamily = await familyService.findOne({ id: '6434c168869f69d611f1ddc3'.toObjectId(), isDeleted: false })
		expect(foundFamily).toMatchObject({
			_id: '6434c168869f69d611f1ddc3'.toObjectId(),
			name: 'The Simpsons',
		})
	})

	it('should find deleted and non-deleted families', async () => {
		const nonDeletedFamily = await familyService.findOne({ id: '6434c168869f69d611f1ddc3'.toObjectId(), isDeleted: false })
		expect(nonDeletedFamily).not.toBeNull()
		expect(nonDeletedFamily._id).toEqual('6434c168869f69d611f1ddc3'.toObjectId())

		const deletedFamily = await familyService.findOne({ id: '6434c1f8a981030adde8f594'.toObjectId(), isDeleted: true })
		expect(deletedFamily).not.toBeNull()
		expect(deletedFamily._id).toEqual('6434c1f8a981030adde8f594'.toObjectId())

		const nonExistentFamily = await familyService.findOne({ id: '6434c1f8a981030adde8f599'.toObjectId(), isDeleted: false })
		expect(nonExistentFamily).toBeNull()
	})

	it('should find all families with available filters', async () => {
		const allFamilies = await familyService.findMany({})
		expect(allFamilies.length).toBe(4)

		const deletedFamilies = await familyService.findMany({ isDeleted: true })
		expect(deletedFamilies.length).toBe(2)

		const nonDeletedFamilies = await familyService.findMany({ isDeleted: false })
		expect(nonDeletedFamilies.length).toBe(2)
	})

	it('should create a family', async () => {
		const newFamily = await familyService.create({
			name: 'New Family',
			members: [
				'sms|new-user',
				'sms|another-user'
			]
		})
		expect(newFamily).toMatchObject({
			name: 'New Family',
			members: [
				'sms|new-user',
				'sms|another-user'
			]
		})
	})

	it('should add a member to a family', async () => {
		const updatedFamily = await familyService.addMember({
			userId: 'sms|new-user',
			familyId: '6434c168869f69d611f1ddc3'.toObjectId(),
		})
		expect(updatedFamily).toMatchObject({
			_id: '6434c168869f69d611f1ddc3'.toObjectId(),
			name: 'The Simpsons',
			members: expect.arrayContaining(['sms|new-user']),
		})
	})
})