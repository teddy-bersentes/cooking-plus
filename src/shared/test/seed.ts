import { FamilyReturnType } from "~/family";
import { UserReturnType } from "~/user";
import { RecipeReturnType } from "~/recipe";
import { userFixtures, familyFixtures } from "./fixtures";

type Params = {
	Family?: FamilyReturnType
	User?: UserReturnType
	Recipe?: RecipeReturnType
}


export const seed = async (params: Params) => {
	if (params.Family) {
		await params.Family.deleteMany()
		await params.Family.insertMany(familyFixtures)
	}

	if (params.User) {
		await params.User.deleteMany()
		await params.User.insertMany(userFixtures)
	}

	if (params.Recipe) {
		await params.Recipe.deleteMany()
	}
}