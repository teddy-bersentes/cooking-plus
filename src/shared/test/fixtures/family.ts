import { Family } from "~/family";
export const familyFixtures: Family[] = [
	{
		_id: '6434c168869f69d611f1ddc3'.toObjectId(),
		name: 'The Simpsons',
		members: [
			'sms|homer',
			'sms|marjorie',
			'sms|bart',
			'sms|lisa',
			'sms|maggie',
		],
		createdAt: new Date('2020-02-02 02:02:02'),
		updatedAt: new Date('2020-02-02 02:02:02'),
		deletedAt: null
	},
	{
		_id: '6434c1dc057f1308649619e2'.toObjectId(),
		name: 'The Flanders',
		members: [
			'sms|ned',
			'sms|rod',
			'sms|todd',
		],
		createdAt: new Date('2020-03-03 03:03:03'),
		updatedAt: new Date('2020-03-03 03:03:03'),
		deletedAt: null
	},
	{
		_id: '6434c1f8a981030adde8f594'.toObjectId(),
		name: 'The Gumbles',
		members: [
			'sms|barney',
			'sms|arnie',
		],
		createdAt: new Date('2020-04-04 04:04:04'),
		updatedAt: new Date('2020-04-04 04:04:04'),
		deletedAt: new Date('2020-06-05 06:06:06')
	},
	{
		_id: '6434c8d5cad37c7ab42cee66'.toObjectId(),
		name: 'The Burns',
		members: [
			'sms|mr-burns',
		],
		createdAt: new Date('2020-05-05 05:05:05'),
		updatedAt: new Date('2020-05-05 05:05:05'),
		deletedAt: new Date('2020-06-05 06:06:06')
	}
]