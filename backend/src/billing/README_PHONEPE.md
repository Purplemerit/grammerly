# PhonePe Integration Guide

## 📋 Overview

This document explains how to complete the PhonePe payment gateway integration.

## 🔧 Current Status

The PhonePe service is set up as a **placeholder** with the following structure:
- `phonepe.service.ts` - Main service with method stubs
- `phonepe.module.ts` - NestJS module
- Environment variables configured

## 📝 TODO: PhonePe Integration

### 1. PhonePe API Documentation
- Visit: https://developer.phonepe.com/
- Get API credentials (Merchant ID, Salt Key, Salt Index)
- Review API documentation for:
  - Payment session creation
  - Webhook handling
  - Subscription management
  - Payment status checks

### 2. Implement Payment Session Creation

In `phonepe.service.ts`, implement `createPaymentSession()`:

```typescript
async createPaymentSession(data: {
  userId: string;
  planId: string;
  amount: number;
  planName: string;
}): Promise<string> {
  // 1. Create payment request payload
  const payload = {
    merchantId: this.merchantId,
    merchantTransactionId: `TXN_${Date.now()}_${data.userId}`,
    amount: data.amount * 100, // Convert to paise
    redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/billing/callback`,
    redirectMode: 'REDIRECT',
    callbackUrl: `${process.env.API_BASE_URL}/api/v1/billing/webhook`,
    // ... other required fields
  };

  // 2. Generate X-VERIFY header
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const stringToHash = base64Payload + '/pg/v1/pay' + this.saltKey;
  const hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
  const xVerify = `${hash}###${this.saltIndex}`;

  // 3. Call PhonePe API
  const response = await fetch(`${this.baseUrl}/pg/v1/pay`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-VERIFY': xVerify,
      'Accept': 'application/json',
    },
    body: JSON.stringify({ request: base64Payload }),
  });

  // 4. Parse response and return payment URL
  const result = await response.json();
  return result.data.instrumentResponse.redirectInfo.url;
}
```

### 3. Implement Webhook Verification

Implement `verifyWebhookSignature()`:

```typescript
async verifyWebhookSignature(payload: any, signature: string): Promise<boolean> {
  // PhonePe sends signature in X-VERIFY header
  // Format: SHA256(base64(payload) + /pg/v1/status/{merchantId}/{transactionId} + saltKey) + ### + saltIndex
  
  const crypto = require('crypto');
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const stringToHash = base64Payload + '/pg/v1/status/' + this.merchantId + '/' + payload.transactionId + this.saltKey;
  const hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
  const expectedSignature = `${hash}###${this.saltIndex}`;
  
  return signature === expectedSignature;
}
```

### 4. Implement Subscription Cancellation

Implement `cancelSubscription()`:

```typescript
async cancelSubscription(subscriptionId: string): Promise<boolean> {
  // Call PhonePe API to cancel subscription
  // Follow PhonePe's subscription cancellation API
  // Return success/failure
}
```

### 5. Environment Variables

Make sure these are set in `.env`:

```env
PHONEPE_MERCHANT_ID=your_merchant_id
PHONEPE_SALT_KEY=your_salt_key
PHONEPE_SALT_INDEX=1
PHONEPE_ENVIRONMENT=sandbox  # or 'production'
PHONEPE_BASE_URL=https://api.phonepe.com/apis
```

### 6. Testing

1. Use PhonePe sandbox environment for testing
2. Test payment flow end-to-end
3. Test webhook handling
4. Test subscription cancellation
5. Verify signature verification works correctly

## 📚 Resources

- PhonePe Developer Portal: https://developer.phonepe.com/
- PhonePe API Documentation: [Check PhonePe docs]
- PhonePe Test Cards: [Check PhonePe docs for test credentials]

## ⚠️ Important Notes

- **Never commit** PhonePe credentials to version control
- Always verify webhook signatures
- Handle payment failures gracefully
- Log all payment transactions for audit
- Test thoroughly in sandbox before production

## ✅ Checklist

- [ ] Get PhonePe API credentials
- [ ] Implement `createPaymentSession()`
- [ ] Implement `verifyWebhookSignature()`
- [ ] Implement `cancelSubscription()`
- [ ] Implement `getPaymentStatus()`
- [ ] Test payment flow
- [ ] Test webhook handling
- [ ] Update environment variables
- [ ] Deploy to production

