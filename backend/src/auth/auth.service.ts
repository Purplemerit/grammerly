import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.password_hash) {
      throw new UnauthorizedException('Please use OAuth to login');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password_hash, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    // Update last login
    await this.usersService.updateLastLogin(user.id);

    const payload = {
      sub: user.id,
      email: user.email,
      plan: user.plan_name,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.generateRefreshToken(payload),
      expiresIn: 3600, // 1 hour
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        plan: user.plan_name,
        emailVerified: user.email_verified,
      },
    };
  }

  async signup(signupDto: SignupDto) {
    // Check if user exists
    const existingUser = await this.usersService.findByEmail(signupDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Validate password
    this.validatePassword(signupDto.password);

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(signupDto.password, saltRounds);

    // Create user
    const user = await this.usersService.create({
      email: signupDto.email,
      full_name: signupDto.full_name,
      password_hash: passwordHash,
      auth_provider: 'email',
      plan_name: 'FREE',
      subscription_status: 'active',
    });

    // Generate verification token (in real app, send via email)
    const verificationToken = this.generateVerificationToken(user.id);

    const { password_hash, ...userWithoutPassword } = user;

    return {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      createdAt: user.created_at,
      emailVerified: false,
      verificationToken, // In production, send via email
    };
  }

  async verifyEmail(token: string) {
    // In production, verify token from database/Redis
    // For now, simplified version
    throw new BadRequestException('Email verification not fully implemented yet');
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists (security)
      return {
        success: true,
        message: 'If email exists, password reset link sent',
        expiresIn: 3600,
      };
    }

    // Generate reset token (in production, store in database with expiry)
    const resetToken = this.generateResetToken(user.id);

    // In production, send email with reset link
    // For now, return token (remove in production!)
    return {
      success: true,
      message: 'Password reset link sent to email',
      expiresIn: 3600,
      resetToken, // Remove this in production!
    };
  }

  async resetPassword(token: string, newPassword: string) {
    // Validate password
    this.validatePassword(newPassword);

    // In production, verify token from database
    // For now, simplified
    throw new BadRequestException('Password reset not fully implemented yet');
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newPayload = {
        sub: user.id,
        email: user.email,
        plan: user.plan_name,
      };

      return {
        accessToken: this.jwtService.sign(newPayload),
        expiresIn: 3600,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private validatePassword(password: string): void {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      throw new BadRequestException(`Password must be at least ${minLength} characters`);
    }

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      throw new BadRequestException(
        'Password must contain uppercase, lowercase, number, and special character',
      );
    }
  }

  private generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '30d'),
    });
  }

  private generateVerificationToken(userId: string): string {
    return this.jwtService.sign(
      { sub: userId, type: 'email_verification' },
      { expiresIn: '24h' },
    );
  }

  private generateResetToken(userId: string): string {
    return this.jwtService.sign(
      { sub: userId, type: 'password_reset' },
      { expiresIn: '1h' },
    );
  }
}

