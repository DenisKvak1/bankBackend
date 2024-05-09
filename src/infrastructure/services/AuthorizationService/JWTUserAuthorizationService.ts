import jwt from 'jsonwebtoken';
import { IAuthorizationUserService, authorizationData } from './interfaces/types';

export class JWTUserAuthorizationService implements IAuthorizationUserService {
	constructor(private readonly verificationCode: string) {}

	createToken(data: {[key:string]: any}): string | null {
		return jwt.sign(data, this.verificationCode);
	};

	verify(token: string): boolean {
		try {
			return Boolean(jwt.verify(token, this.verificationCode));
		} catch (e){
			return false
		}
	};

	getData(token: string): authorizationData {
		return jwt.verify(token, this.verificationCode) as authorizationData;
	};
}