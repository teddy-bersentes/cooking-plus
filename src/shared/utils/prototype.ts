import { Types } from 'mongoose';

String.prototype.toObjectId = function () {
	return new Types.ObjectId(this);
}

Object.defineProperty(String.prototype, '_id', {
	get: function () {
		return this;
	}
})