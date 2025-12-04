# 📚 DETAILED API DOCUMENTATION (SWAGGER/OPENAPI)
## GrammarPro - Complete REST API Specification

**Document Version:** 1.0  
**OpenAPI Version:** 3.0.0  
**Status:** Production Ready  

---

## 🔌 API OVERVIEW

```
Base URL: https://api.grammarpro.com/v1
API Version: 1.0
Authentication: Bearer Token (JWT)
Rate Limit: 1000 requests/minute
Response Format: JSON
```

---

## 🔐 AUTHENTICATION

### JWT Token Authentication

```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "John Doe",
    "plan": "FREE"
  }
}

Header Required:
Authorization: Bearer {accessToken}
```

### OAuth 2.0 Support

```
Supported Providers:
├─ Google
├─ GitHub
└─ Microsoft

Flow: Authorization Code Grant
Scope: email profile openid
```

---

## 📋 AUTHENTICATION ENDPOINTS

### 1. Sign Up

```
POST /auth/signup
Content-Type: application/json

Request Body:
{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "fullName": "Jane Smith",
  "acceptTerms": true,
  "acceptPrivacy": true
}

Response (201):
{
  "id": "user-456",
  "email": "newuser@example.com",
  "fullName": "Jane Smith",
  "created_at": "2025-12-04T12:30:00Z",
  "emailVerified": false,
  "verificationToken": "verify-token-xyz"
}

Response (400) - Validation Error:
{
  "error": "VALIDATION_ERROR",
  "message": "Email already exists",
  "code": 400,
  "fields": {
    "email": "This email is already registered"
  }
}

Response (422) - Password Requirements:
{
  "error": "PASSWORD_REQUIREMENTS",
  "message": "Password must be at least 8 characters",
  "code": 422,
  "requirements": {
    "minLength": 8,
    "hasUppercase": true,
    "hasLowercase": true,
    "hasNumbers": true,
    "hasSpecialChars": true
  }
}
```

### 2. Email Verification

```
POST /auth/verify-email
Content-Type: application/json

Request Body:
{
  "token": "verify-token-xyz"
}

Response (200):
{
  "success": true,
  "message": "Email verified successfully",
  "user": {
    "id": "user-456",
    "emailVerified": true
  }
}

Response (400) - Invalid Token:
{
  "error": "INVALID_TOKEN",
  "message": "Verification token is invalid or expired",
  "code": 400
}
```

### 3. Forgot Password

```
POST /auth/forgot-password
Content-Type: application/json

Request Body:
{
  "email": "user@example.com"
}

Response (200):
{
  "success": true,
  "message": "Password reset link sent to email",
  "expiresIn": 3600
}

Response (404):
{
  "error": "USER_NOT_FOUND",
  "message": "No user found with this email",
  "code": 404
}
```

### 4. Reset Password

```
POST /auth/reset-password
Content-Type: application/json

Request Body:
{
  "token": "reset-token-abc",
  "newPassword": "NewSecurePass123!"
}

Response (200):
{
  "success": true,
  "message": "Password reset successfully",
  "redirectTo": "/login"
}

Response (400) - Token Expired:
{
  "error": "TOKEN_EXPIRED",
  "message": "Reset token has expired",
  "code": 400,
  "expiryTime": "2025-12-04T13:00:00Z"
}
```

---

## 📄 DOCUMENT ENDPOINTS

### 1. Get All Documents

```
GET /documents?page=1&limit=10&sort=-createdAt
Authorization: Bearer {token}

Query Parameters:
├─ page: number (default: 1)
├─ limit: number (default: 10, max: 100)
├─ sort: string (default: -createdAt)
│  ├─ -createdAt: Newest first
│  ├─ title: Title A-Z
│  ├─ -title: Title Z-A
│  └─ -wordCount: Longest first
├─ filter: string (draft|published|archived)
└─ search: string (text search)

Response (200):
{
  "data": [
    {
      "id": "doc-123",
      "userId": "user-123",
      "title": "My Essay",
      "content": "The quick brown fox...",
      "type": "essay",
      "language": "en-US",
      "wordCount": 1250,
      "readingTime": 5,
      "grammarScore": 94,
      "createdAt": "2025-12-04T10:00:00Z",
      "updatedAt": "2025-12-04T11:30:00Z",
      "isDeleted": false
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  },
  "meta": {
    "totalWords": 12450,
    "averageGrammarScore": 92
  }
}

Response (401) - Unauthorized:
{
  "error": "UNAUTHORIZED",
  "message": "Invalid or expired token",
  "code": 401,
  "hint": "Please login again"
}

Response (429) - Rate Limit:
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Too many requests",
  "code": 429,
  "retryAfter": 60,
  "limit": 1000,
  "remaining": 0,
  "resetAt": "2025-12-04T13:00:00Z"
}
```

### 2. Create Document

```
POST /documents
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "title": "New Document",
  "content": "Start typing here...",
  "type": "essay",
  "language": "en-US",
  "isPublic": false
}

Response (201):
{
  "id": "doc-456",
  "userId": "user-123",
  "title": "New Document",
  "content": "Start typing here...",
  "type": "essay",
  "language": "en-US",
  "wordCount": 4,
  "grammarScore": 100,
  "createdAt": "2025-12-04T12:00:00Z",
  "updatedAt": "2025-12-04T12:00:00Z"
}

Response (422) - Limit Exceeded:
{
  "error": "DOCUMENT_LIMIT_EXCEEDED",
  "message": "Free plan allows maximum 5 documents",
  "code": 422,
  "plan": "FREE",
  "limit": 5,
  "current": 5,
  "suggestedAction": "Upgrade to Pro"
}
```

### 3. Update Document

```
PUT /documents/{documentId}
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "title": "Updated Title",
  "content": "Updated content here...",
  "type": "article"
}

Response (200):
{
  "id": "doc-123",
  "title": "Updated Title",
  "content": "Updated content here...",
  "type": "article",
  "wordCount": 250,
  "grammarScore": 88,
  "updatedAt": "2025-12-04T12:30:00Z"
}

Response (404) - Not Found:
{
  "error": "DOCUMENT_NOT_FOUND",
  "message": "Document with ID doc-123 not found",
  "code": 404,
  "documentId": "doc-123"
}

Response (403) - Forbidden:
{
  "error": "FORBIDDEN",
  "message": "You don't have permission to edit this document",
  "code": 403,
  "reason": "Not the document owner"
}
```

### 4. Delete Document

```
DELETE /documents/{documentId}
Authorization: Bearer {token}

Response (204): No Content

Response (400) - Soft Delete:
{
  "success": true,
  "message": "Document moved to trash",
  "canRestore": true,
  "restoreLink": "/api/documents/{documentId}/restore"
}
```

---

## 🔍 GRAMMAR CHECKING ENDPOINTS

### 1. Check Grammar

```
POST /grammar/check
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "text": "The team are working on the project.",
  "documentId": "doc-123",
  "language": "en-US"
}

Response (200):
{
  "errors": [
    {
      "id": "error-001",
      "type": "GRAMMAR",
      "severity": "MEDIUM",
      "position": {
        "start": 9,
        "end": 13
      },
      "original": "are",
      "suggestions": ["is"],
      "explanation": "Subject-verb agreement: 'team' is singular, use 'is' not 'are'",
      "confidence": 0.98,
      "category": "subject_verb_agreement",
      "rule": "SUBJECT_VERB_AGREEMENT"
    }
  ],
  "summary": {
    "totalErrors": 1,
    "grammarErrors": 1,
    "spellingErrors": 0,
    "punctuationErrors": 0,
    "styleErrors": 0,
    "grammarScore": 94
  },
  "processingTime": 234
}

Response (400) - Invalid Text:
{
  "error": "INVALID_REQUEST",
  "message": "Text length must be between 1 and 50000 characters",
  "code": 400,
  "textLength": 50001,
  "limit": 50000
}

Response (429) - API Limit:
{
  "error": "QUOTA_EXCEEDED",
  "message": "You've exceeded your monthly grammar check quota",
  "code": 429,
  "plan": "FREE",
  "monthlyLimit": 1000,
  "used": 1000,
  "resetAt": "2025-12-31T23:59:59Z",
  "upgrade": "https://grammarpro.com/pricing"
}
```

### 2. Get Grammar History

```
GET /grammar/check/history?documentId=doc-123&limit=10
Authorization: Bearer {token}

Response (200):
{
  "checks": [
    {
      "id": "check-001",
      "documentId": "doc-123",
      "timestamp": "2025-12-04T11:30:00Z",
      "textLength": 1500,
      "errorCount": 3,
      "grammarScore": 91,
      "processingTime": 245
    }
  ],
  "statistics": {
    "totalChecks": 42,
    "averageScore": 91.5,
    "mostCommonError": "PUNCTUATION",
    "trend": "improving"
  }
}
```

---

## 🎯 PLAGIARISM DETECTION ENDPOINTS

### 1. Check Plagiarism

```
POST /plagiarism/check
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "text": "Climate change is one of the most pressing issues...",
  "documentId": "doc-123",
  "sourceType": "web" | "academic" | "all"
}

Response (200):
{
  "scanId": "scan-789",
  "status": "COMPLETED",
  "plagiarismPercentage": 12.5,
  "originalPercentage": 87.5,
  "scanTime": 24500,
  "scannedAt": "2025-12-04T12:00:00Z",
  "flaggedSections": [
    {
      "text": "Climate change is one of the most pressing issues",
      "plagiarismPercentage": 95,
      "source": {
        "title": "Global Warming Report 2025",
        "url": "https://example.com/report",
        "domain": "example.com",
        "publishDate": "2025-11-01"
      },
      "matchType": "EXACT"
    }
  ],
  "report": {
    "totalParagraphs": 15,
    "flaggedParagraphs": 2,
    "uniqueSources": 3,
    "citations": []
  }
}

Response (400) - Processing Error:
{
  "error": "SCAN_FAILED",
  "message": "Unable to complete plagiarism scan",
  "code": 400,
  "reason": "Document exceeds maximum length",
  "maxLength": 50000
}

Response (202) - Async Processing:
{
  "status": "PROCESSING",
  "scanId": "scan-789",
  "message": "Plagiarism check in progress",
  "pollUrl": "/plagiarism/check/scan-789",
  "pollInterval": 5000,
  "estimatedTime": 30000
}
```

### 2. Get Plagiarism Results

```
GET /plagiarism/check/{scanId}
Authorization: Bearer {token}

Response (200):
{
  "scanId": "scan-789",
  "status": "COMPLETED",
  "plagiarismPercentage": 12.5,
  "flaggedSections": [...]
}

Response (202) - Still Processing:
{
  "status": "PROCESSING",
  "progress": 65,
  "message": "Scan 65% complete"
}
```

---

## ✨ PARAPHRASING ENDPOINTS

### 1. Generate Paraphrase

```
POST /paraphrase/generate
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "text": "The quick brown fox jumps over the lazy dog.",
  "tone": "formal" | "casual" | "academic" | "simple",
  "intensity": "light" | "medium" | "heavy",
  "count": 3
}

Response (200):
{
  "original": "The quick brown fox jumps over the lazy dog.",
  "variations": [
    {
      "id": "var-001",
      "text": "A swift auburn canine leaps gracefully over a sluggish canine.",
      "wordCount": 12,
      "readabilityScore": 78,
      "tone": "formal",
      "similarity": 0.85
    },
    {
      "id": "var-002",
      "text": "The speedy brown fox hops right over the sleepy dog.",
      "wordCount": 11,
      "readabilityScore": 92,
      "tone": "casual",
      "similarity": 0.92
    },
    {
      "id": "var-003",
      "text": "A rapid fox of reddish-brown coloration jumps above a lazy dog.",
      "wordCount": 12,
      "readabilityScore": 68,
      "tone": "academic",
      "similarity": 0.78
    }
  ],
  "processingTime": 3200
}

Response (400) - Invalid Input:
{
  "error": "INVALID_PARAPHRASE_REQUEST",
  "message": "Text must be between 1 and 5000 words",
  "code": 400
}
```

---

## 🔊 TONE ANALYSIS ENDPOINTS

### 1. Analyze Tone

```
POST /tone/analyze
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "text": "I absolutely love this product! It's amazing!",
  "targetTone": "neutral" (optional)
}

Response (200):
{
  "detectedTone": {
    "primary": "ENTHUSIASTIC",
    "confidence": 0.92,
    "percentage": 92
  },
  "toneDistribution": {
    "ENTHUSIASTIC": 92,
    "POSITIVE": 8,
    "NEUTRAL": 0,
    "NEGATIVE": 0,
    "SARCASTIC": 0
  },
  "suggestions": [
    {
      "type": "TONE_MISMATCH",
      "message": "Detected tone is enthusiastic but target is neutral",
      "fixes": [
        {
          "original": "absolutely love",
          "suggested": "quite like"
        },
        {
          "original": "It's amazing!",
          "suggested": "It's effective."
        }
      ]
    }
  ],
  "analysis": {
    "emotionalIntensity": 0.85,
    "formalityLevel": 0.3,
    "certainty": 0.78
  }
}
```

---

## 📚 ERROR HANDLING

### Standard Error Response Format

```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable error message",
  "code": 400,
  "timestamp": "2025-12-04T12:30:00Z",
  "requestId": "req-abc-123",
  "path": "/api/documents",
  "method": "POST",
  
  "details": {
    "field": "email",
    "reason": "Invalid email format",
    "suggestion": "Please use a valid email address"
  },
  
  "help": {
    "documentation": "https://docs.grammarpro.com/errors/invalid-email",
    "contact": "support@grammarpro.com",
    "status": "https://status.grammarpro.com"
  }
}
```

### HTTP Status Codes

```
200 OK                     - Successful GET, PUT, DELETE
201 Created                - Successful POST
202 Accepted               - Async processing started
204 No Content             - Successful DELETE
400 Bad Request            - Invalid request format
401 Unauthorized           - Missing/invalid authentication
403 Forbidden              - Permission denied
404 Not Found              - Resource not found
422 Unprocessable Entity   - Validation failed
429 Too Many Requests      - Rate limit exceeded
500 Internal Server Error  - Server error
502 Bad Gateway            - Service unavailable
503 Service Unavailable    - Maintenance
```

### Error Codes

```
VALIDATION_ERROR           - Input validation failed
AUTHENTICATION_ERROR       - Auth failed
AUTHORIZATION_ERROR       - Permission denied
RATE_LIMIT_EXCEEDED       - Too many requests
QUOTA_EXCEEDED            - Usage limit reached
RESOURCE_NOT_FOUND        - Resource doesn't exist
RESOURCE_CONFLICT         - Resource already exists
SERVER_ERROR              - Internal server error
SERVICE_UNAVAILABLE       - Service temporarily down
PAYMENT_REQUIRED          - Upgrade needed
```

---

## 🚦 RATE LIMITING

```
Standard Rate Limits:
├─ Free Plan: 100 requests/minute
├─ Pro Plan: 1000 requests/minute
└─ Business Plan: 10000 requests/minute

Headers in Response:
├─ RateLimit-Limit: 1000
├─ RateLimit-Remaining: 987
├─ RateLimit-Reset: 1701691200
└─ Retry-After: 60 (when limit exceeded)

Costs (per request):
├─ Grammar check: 5 credits
├─ Plagiarism scan: 10 credits
├─ Paraphrase: 3 credits
├─ Tone analysis: 2 credits
└─ Standard API call: 1 credit

Reset: Every hour / Every calendar month
```

---

## 🔒 SECURITY HEADERS

```
Responses include:
├─ X-Content-Type-Options: nosniff
├─ X-Frame-Options: DENY
├─ X-XSS-Protection: 1; mode=block
├─ Strict-Transport-Security: max-age=31536000
├─ Content-Security-Policy: default-src 'self'
└─ Referrer-Policy: strict-origin-when-cross-origin
```

---

## 📊 PAGINATION

```
Standard Pagination:
├─ page: Current page (default: 1)
├─ limit: Items per page (default: 10, max: 100)
├─ offset: Skip items (alternative to page)
└─ sort: Sort field and direction

Response Includes:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## ⏱️ TIMEOUTS & ASYNC

```
Request Timeout: 30 seconds
Response Timeout: 60 seconds

Async Operations:
├─ Returns 202 status
├─ Includes polling URL
├─ Provide estimates
└─ Support webhooks (Phase 2)

Polling Example:
GET /plagiarism/check/scan-789
Retry: every 5 seconds
Max Retries: 120 (10 minutes)
```

---

**Document Status:** ✅ COMPLETE  
**API Version:** 1.0  
**Last Updated:** December 4, 2025  
**Cursor Understanding:** Complete API spec ready for implementation

