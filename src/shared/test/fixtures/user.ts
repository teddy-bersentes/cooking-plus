import { User } from "~/user";

export const userFixtures: User[] = [
	// The Simpsons
	{
		_id: 'sms|homer',
		name: 'Homer Simpson',
		dietaryRestrictions: [],
		family: '6434c168869f69d611f1ddc3'.toObjectId(),
		phoneNumber: '+15555555555',
		createdAt: new Date('2020-02-02 02:02:02'),
		updatedAt: new Date('2020-02-02 02:02:02'),
		deletedAt: null
	},
	{
		_id: 'sms|marjorie',
		name: 'Marjorie Simpson',
		dietaryRestrictions: [],
		family: '6434c168869f69d611f1ddc3'.toObjectId(),
		phoneNumber: '+15555555556',
		createdAt: new Date('2020-02-02 02:02:02'),
		updatedAt: new Date('2020-02-02 02:02:02'),
		deletedAt: null
	},
	{
		_id: 'sms|bart',
		name: 'Bart Simpson',
		dietaryRestrictions: [],
		family: '6434c168869f69d611f1ddc3'.toObjectId(),
		phoneNumber: '+15555555557',
		createdAt: new Date('2020-02-02 02:02:02'),
		updatedAt: new Date('2020-02-02 02:02:02'),
		deletedAt: null
	},
	{
		_id: 'sms|lisa',
		name: 'Lisa Simpson',
		dietaryRestrictions: [],
		family: '6434c168869f69d611f1ddc3'.toObjectId(),
		phoneNumber: '+15555555558',
		createdAt: new Date('2020-02-02 02:02:02'),
		updatedAt: new Date('2020-02-02 02:02:02'),
		deletedAt: null,
	},
	{
		_id: 'sms|maggie',
		name: 'Maggie Simpson',
		dietaryRestrictions: [],
		family: '6434c168869f69d611f1ddc3'.toObjectId(),
		phoneNumber: '+15555555559',
		createdAt: new Date('2020-02-02 02:02:02'),
		updatedAt: new Date('2020-02-02 02:02:02'),
		deletedAt: null
	},
	{
		_id: 'sms|snowball',
		name: 'Snowball II',
		dietaryRestrictions: [],
		family: '6434c168869f69d611f1ddc3'.toObjectId(),
		phoneNumber: '+15555555450',
		createdAt: new Date('2020-02-02 02:02:02'),
		updatedAt: new Date('2020-02-02 02:02:02'),
		deletedAt: new Date('2020-03-03 02:02:02')
	},
	// The Flanders
	{
		_id: 'sms|ned',
		name: 'Ned Flanders',
		dietaryRestrictions: [],
		family: '6434c1dc057f1308649619e2'.toObjectId(),
		phoneNumber: '+15555555560',
		createdAt: new Date('2020-03-03 03:03:03'),
		updatedAt: new Date('2020-03-03 03:03:03'),
		deletedAt: null
	},
	{
		_id: 'sms|rod',
		name: 'Rod Flanders',
		dietaryRestrictions: [],
		family: '6434c1dc057f1308649619e2'.toObjectId(),
		phoneNumber: '+15555555561',
		createdAt: new Date('2020-03-03 03:03:03'),
		updatedAt: new Date('2020-03-03 03:03:03'),
		deletedAt: null
	},
	{
		_id: 'sms|todd',
		name: 'Todd Flanders',
		dietaryRestrictions: [],
		family: '6434c1dc057f1308649619e2'.toObjectId(),
		phoneNumber: '+15555555562',
		createdAt: new Date('2020-03-03 03:03:03'),
		updatedAt: new Date('2020-03-03 03:03:03'),
		deletedAt: null
	},
	// The Gumbles
	{
		_id: 'sms|barney',
		name: 'Barney Gumble',
		dietaryRestrictions: [],
		family: '6434c1f8a981030adde8f594'.toObjectId(),
		phoneNumber: '+15555555563',
		createdAt: new Date('2020-04-04 04:04:04'),
		updatedAt: new Date('2020-04-04 04:04:04'),
		deletedAt: null
	},
	{
		_id: 'sms|arnie',
		name: 'Arnie Gumble',
		dietaryRestrictions: [],
		family: '6434c1f8a981030adde8f594'.toObjectId(),
		phoneNumber: '+15555555564',
		createdAt: new Date('2020-04-04 04:04:04'),
		updatedAt: new Date('2020-04-04 04:04:04'),
		deletedAt: null
	},
	// Deleted users
	{
		_id: 'sms|mr-burns',
		name: 'Charles Montgomery Burns',
		dietaryRestrictions: [],
		family: '6434c87f9ecc9819bbe60229'.toObjectId(),
		phoneNumber: '+15555555565',
		createdAt: new Date('2020-05-05 05:05:05'),
		updatedAt: new Date('2020-05-05 05:05:05'),
		deletedAt: new Date('2020-05-05 05:05:05')
	},
	{
		_id: 'sms|krusty',
		name: 'Krusty the Clown',
		dietaryRestrictions: [],
		family: '6434c8d5cad37c7ab42cee66'.toObjectId(),
		phoneNumber: '+15555555566',
		createdAt: new Date('2020-05-05 05:05:05'),
		updatedAt: new Date('2020-05-05 05:05:05'),
		deletedAt: new Date('2020-05-05 05:05:05')
	}
]