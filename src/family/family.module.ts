import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { FamilyResolver } from './family.resolver'
import { FamilyService } from './family.service'
import { Family } from './family.schema'
import { UserModule } from '~/user'

@Module({
	imports: [
		TypegooseModule.forFeature([Family]),
		UserModule
	],
	providers: [FamilyResolver, FamilyService],
	exports: [FamilyService],
})
export class FamilyModule { }
