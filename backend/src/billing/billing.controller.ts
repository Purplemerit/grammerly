import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('billing')
@UseGuards(JwtAuthGuard)
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('plans')
  async getPlans() {
    return this.billingService.getPlans();
  }

  @Get('subscription')
  async getSubscription(@Request() req) {
    return this.billingService.getSubscription(req.user.id);
  }

  @Get('usage')
  async getUsage(@Request() req) {
    return this.billingService.getUsage(req.user.id);
  }

  @Post('checkout')
  @HttpCode(HttpStatus.OK)
  async createCheckout(@Request() req, @Body('planId') planId: string) {
    return this.billingService.createCheckout(req.user.id, planId);
  }

  @Post('subscription/update')
  @HttpCode(HttpStatus.OK)
  async updateSubscription(
    @Request() req,
    @Body('planId') planId: string,
  ) {
    return this.billingService.updateSubscription(req.user.id, planId);
  }

  @Post('subscription/cancel')
  @HttpCode(HttpStatus.OK)
  async cancelSubscription(
    @Request() req,
    @Body('reason') reason?: string,
  ) {
    return this.billingService.cancelSubscription(req.user.id, reason);
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Body() payload: any,
    @Headers('x-phonepe-signature') signature: string,
  ) {
    return this.billingService.handleWebhook(payload, signature);
  }
}

