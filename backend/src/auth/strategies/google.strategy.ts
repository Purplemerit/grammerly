import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly isConfigured: boolean;

  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    
    // Always call super first (required by TypeScript)
    super({
      clientID: clientID || 'dummy',
      clientSecret: clientSecret || 'dummy',
      callbackURL: `${configService.get<string>('NEXT_PUBLIC_APP_URL', 'http://localhost:3000')}/api/v1/auth/google/callback`,
      scope: ['email', 'profile'],
    });

    // Set configuration flag after super()
    this.isConfigured = !!(clientID && clientSecret);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // Skip if OAuth is not configured
    if (!this.isConfigured) {
      return done(new Error('Google OAuth is not configured'), null);
    }

    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      fullName: name.givenName + ' ' + name.familyName,
      avatarUrl: photos[0].value,
      authProvider: 'google',
    };

    // Find or create user
    let dbUser = await this.usersService.findByEmail(user.email);
    if (!dbUser) {
      dbUser = await this.usersService.create({
        email: user.email,
        full_name: user.fullName,
        avatar_url: user.avatarUrl,
        auth_provider: 'google',
        email_verified: true, // Google emails are verified
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

