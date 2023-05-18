import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { TypegooseModule } from 'nestjs-typegoose';

let mongod: MongoMemoryServer;

export const rootTypegooseTestModule = () => TypegooseModule.forRootAsync({
	useFactory: async () => {
		mongod = await MongoMemoryServer.create();
		const mongoUri = mongod.getUri();
		await mongoose.connect(mongoUri, { dbName: 'test' })
		return {
			uri: mongoUri
		}
	},
})

export const closeMongoTestServer = async () => {
	if (mongod) { await mongod.stop() }
}

// Start the in-memory MongoDB server before running tests
beforeAll(async () => {
	mongod = await MongoMemoryServer.create();
});

// Stop the in-memory MongoDB server after running tests
afterAll(async () => {
	await mongod.stop();
});
