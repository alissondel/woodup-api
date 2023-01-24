import { Args, Mutation, Resolver } from '@nestjs/graphql';

//Import Auth
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './model/auth.type';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Mutation(() => AuthType)
  public async authenticate(
    @Args('data') data: AuthInput
  ): Promise<AuthType> {
    const response = await this.authService.validateUser(data);

    return {
      user: response.user,
      token: response.token
    }
  }
}