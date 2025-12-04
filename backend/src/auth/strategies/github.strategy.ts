import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  private readonly isConfigured: boolean;

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    const clientID = configService.get<string>('GITHUB_CLIENT_ID');
    const clientSecret = configService.get<string>('GITHUB_CLIENT_SECRET');
    
    // Always call super first (required by TypeScript)
    super({
      clientID: clientID || 'dummy',
      clientSecret: clientSecret || 'dummy',
      callbackURL: `${configService.get<string>('NEXT_PUBLIC_APP_URL', 'http://localhost:3000')}/api/v1/auth/github/callback`,
      scope: ['user:email'],
    });

    // Set configuration flag after super()
    this.isConfigured = !!(clientID && clientSecret);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: Function,
  ): Promise<any> {
    // Skip if OAuth is not configured
    if (!this.isConfigured) {
      return done(new Error('GitHub OAuth is not configured'), null);
    }

    const { username, emails, photos } = profile;
    const user = {
      email: emails?.[0]?.value || `${username}@github.local`,
      fullName: profile.displayName || username,
      avatarUrl: photos?.[0]?.value,
      authProvider: 'github',
    };

    // Find or create user
    let dbUser = await this.usersService.findByEmail(user.email);
    if (!dbUser) {
      dbUser = await this.usersService.create({
        email: user.email,
        full_name: user.fullName,
        avatar_url: user.avatarUrl,
        auth_provider: 'github',
        email_verified: false, // GitHub emails might not be verified
        plan_name: 'FREE',
        subscription_status: 'active',
      });
    }

    return {
      id: dbUser.id,
      email: dbUser.email,
      plan: dbUser.plan_name,
    };
  }
}

