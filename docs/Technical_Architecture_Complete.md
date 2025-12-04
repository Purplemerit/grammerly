# 🏗️ SYSTEM ARCHITECTURE & TECHNICAL DOCUMENTATION
## GrammarPro - Complete Technical Architecture

**Document Version:** 1.0  
**Status:** Production Ready  
**Audience:** CTOs, Architects, Backend Engineers  

---

## 🏛️ ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│                    GRAMMARPRO ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               CDN & STATIC ASSETS                   │  │
│  │  Cloudflare / Vercel Edge Network                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         FRONTEND LAYER (Next.js 14)                 │  │
│  │  ┌────────┐ ┌────────┐ ┌────────────┐              │  │
│  │  │Landing │ │Editor  │ │Dashboard   │              │  │
│  │  └────────┘ └────────┘ └────────────┘              │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓ (REST/GraphQL)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │      API GATEWAY & AUTHENTICATION                   │  │
│  │  JWT Verification, Rate Limiting, CORS              │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         BACKEND LAYER (NestJS)                      │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │  │
│  │  │Auth      │ │Documents │ │Grammar   │            │  │
│  │  │Services  │ │Services  │ │Services  │            │  │
│  │  └──────────┘ └──────────┘ └──────────┘            │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐            │  │
│  │  │Plagiarism│ │Paraphrase│ │Analytics │            │  │
│  │  │Services  │ │Services  │ │Services  │            │  │
│  │  └──────────┘ └──────────┘ └──────────┘            │  │
│  └──────────────────────────────────────────────────────┘  │
│           ↓              ↓               ↓                 │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │  DATABASE   │ │   CACHE      │ │  MESSAGE    │       │
│  │ Supabase    │ │  Redis       │ │  QUEUE      │       │
│  │ PostgreSQL  │ │             │ │  Kafka      │       │
│  └─────────────┘ └──────────────┘ └──────────────┘       │
│           ↓              ↓               ↓                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         EXTERNAL INTEGRATIONS                       │  │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │  │
│  │  │Copyleaks│ │Claude  │ │Stripe  │ │SendGrid│       │  │
│  │  │API     │ │API     │ │API     │ │API     │       │  │
│  │  └────────┘ └────────┘ └────────┘ └────────┘       │  │
│  │  ┌────────┐ ┌────────┐ ┌────────┐                   │  │
│  │  │Sentry  │ │Datadog │ │Auth0   │                   │  │
│  │  │(Errors)│ │(Monitor)│ │(SSO)   │                   │  │
│  │  └────────┘ └────────┘ └────────┘                   │  │
│  └──────────────────────────────────────────────────────┘  │
│           ↓              ↓               ↓                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         STORAGE & BACKUP                            │  │
│  │  S3 for documents, EBS for database backups         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔌 TECHNOLOGY STACK

### Frontend
```
Framework: Next.js 14 (App Router)
├─ React 18 with Server Components
├─ TypeScript
├─ TailwindCSS (UI framework)
├─ Framer Motion (animations)
├─ React Hook Form (form management)
├─ SWR (data fetching & caching)
├─ Zustand (state management)
├─ Monaco Editor (code editor)
├─ React Monaco (grammar highlights)
├─ MermaidJS (diagram rendering)
└─ Next.js Image Optimization

Build & Deployment:
├─ Vercel (hosting, auto-deploy from Git)
├─ Environment: Production, Staging, Development
├─ CDN: Vercel Edge Network + Cloudflare
├─ Domain: grammarpro.com
└─ SSL: Automatic via Vercel
```

### Backend
```
Runtime: Node.js 20 LTS
Framework: NestJS
├─ TypeScript
├─ Express.js HTTP server
├─ Fastify optional (performance)
├─ Class-validator (validation)
├─ class-transformer (serialization)
├─ @nestjs/typeorm (ORM)
├─ @nestjs/jwt (authentication)
├─ @nestjs/throttler (rate limiting)
├─ Winston (logging)
├─ Helmet (security headers)
├─ CORS (cross-origin)
├─ dotenv (environment config)
└─ Swagger (API documentation)

Deployment:
├─ Railway.app (containerized)
├─ Docker container
├─ Environment: Production, Staging
├─ Auto-scaling: CPU-based
└─ Health checks: Every 30s
```

### Database
```
Primary: Supabase (PostgreSQL 15+)
├─ Connection pooling (PgBouncer)
├─ Row-level security (RLS)
├─ Realtime subscriptions
├─ Automatic backups (hourly)
├─ Point-in-time recovery (30 days)
└─ Monitoring & alerting

Caching: Redis
├─ Session storage
├─ Grammar check cache (TTL: 24h)
├─ Rate limit tracking
├─ Real-time collaboration data
├─ Pub/Sub for WebSocket
└─ Provider: Upstash

Message Queue: Kafka / Bull Queue
├─ Async job processing
├─ Plagiarism scan scheduling
├─ Email sending queue
├─ Analytics event processing
└─ Webhook delivery
```

### NLP & AI
```
Grammar Checking:
├─ spaCy (POS tagging, NER) - Python
├─ BERT model (semantic analysis) - PyTorch
├─ Custom rule engine (pattern matching)
├─ Hosted on AWS Lambda or Railway
└─ Response time: < 2 seconds per 500 words

Paraphrasing:
├─ Claude 3 Opus API (primary)
├─ Backup: GPT-4 Turbo
├─ Context window: 4K tokens
└─ Rate limited by plan

Language Models:
├─ Multilingual BERT (20+ languages)
├─ Sentence Transformers (embeddings)
├─ Use for language detection
└─ Tone analysis models
```

### Third-Party APIs
```
Payment Processing:
├─ Stripe (payment processing)
├─ Webhook for subscription events
├─ PCI compliance maintained
└─ Paddle (alternative)

Plagiarism Detection:
├─ Copyleaks API (99.8% accuracy)
├─ Scan results stored in database
├─ Async processing (30-60 seconds)
└─ Fallback to internal detection

Email Delivery:
├─ SendGrid (transactional emails)
├─ Verification emails, password reset, receipts
├─ 99.9% deliverability
└─ Template-based

Authentication:
├─ Auth0 (SSO provider, optional)
├─ OAuth integrations (Google, GitHub, Microsoft)
├─ JWT tokens (in-house)
├─ 2FA support (TOTP)
└─ Rate limiting on auth endpoints

Analytics & Monitoring:
├─ Sentry (error tracking)
├─ Datadog (performance monitoring)
├─ Mixpanel (product analytics)
├─ Google Analytics (web analytics)
└─ Custom dashboard
```

---

## 🔐 SECURITY ARCHITECTURE

```
┌─────────────────────────────────────────────────────┐
│             SECURITY LAYERS                        │
├─────────────────────────────────────────────────────┤
│                                                    │
│  Layer 1: Network Security                        │
│  ├─ DDoS protection (Cloudflare)                 │
│  ├─ WAF rules enabled                            │
│  ├─ Rate limiting (1000 req/min)                 │
│  └─ HTTPS/TLS 1.2+ only                          │
│                                                    │
│  Layer 2: API Security                            │
│  ├─ JWT token verification                       │
│  ├─ Scope-based authorization                    │
│  ├─ CORS whitelisting                            │
│  └─ API key rotation (quarterly)                 │
│                                                    │
│  Layer 3: Data Security                           │
│  ├─ AES-256 encryption at rest                   │
│  ├─ TLS encryption in transit                    │
│  ├─ Field-level encryption (PII)                 │
│  └─ Password hashing (bcrypt)                    │
│                                                    │
│  Layer 4: Database Security                       │
│  ├─ Row-level security (RLS)                     │
│  ├─ Parameterized queries                        │
│  ├─ Connection pooling                           │
│  ├─ Regular backups (encrypted)                  │
│  └─ Access logs retained (90 days)               │
│                                                    │
│  Layer 5: Application Security                    │
│  ├─ Input validation & sanitization              │
│  ├─ Output encoding                              │
│  ├─ CSRF token protection                        │
│  ├─ XSS prevention                               │
│  ├─ SQL injection prevention                     │
│  └─ Dependency scanning (Snyk)                   │
│                                                    │
│  Layer 6: Compliance                              │
│  ├─ GDPR data handling                           │
│  ├─ SOC 2 Type II audit                          │
│  ├─ Penetration testing (quarterly)              │
│  └─ Incident response plan                       │
│                                                    │
└─────────────────────────────────────────────────────┘
```

---

## 📊 DATA FLOW DIAGRAMS

### User Registration Flow
```
User → Signup Form → API /auth/signup
    ↓
Validation (email, password)
    ↓
Email exists? → Error
    ↓
Hash password (bcrypt)
    ↓
Create user in database
    ↓
Send verification email (SendGrid)
    ↓
User clicks link
    ↓
Mark email_verified = true
    ↓
Redirect to login
```

### Grammar Check Flow
```
User types → Auto-check trigger (2s delay)
    ↓
Send text to /grammar/check API
    ↓
NLP service processes:
├─ spaCy tokenization
├─ BERT embeddings
└─ Rule engine matching
    ↓
Cache result (Redis, 24h TTL)
    ↓
Return errors array
    ↓
Highlight in editor (real-time)
    ↓
Display suggestions in sidebar
    ↓
User accepts/ignores
    ↓
Update document
```

### Plagiarism Scan Flow
```
User clicks "Check Plagiarism"
    ↓
Add to job queue (Bull Queue)
    ↓
Background job processes:
├─ Get document text
├─ Send to Copyleaks API
├─ Polling until complete
└─ Store results in database
    ↓
User notified (email + in-app)
    ↓
Scan results displayed
    ↓
User downloads report
```

### Real-Time Collaboration Flow
```
User A types → Change event
    ↓
WebSocket to server
    ↓
Broadcast to User B (WebSocket)
    ↓
Operational Transform applied
    ↓
Store in Redis for conflict resolution
    ↓
Persist to database (every 30s)
    ↓
User B's editor updates (< 100ms)
```

---

## 🚀 SCALABILITY STRATEGY

```
Auto-Scaling Configuration:

Frontend (Vercel):
├─ CDN caching: 60-3600s based on content
├─ Edge functions for geo-routing
├─ Automatic scaling (built-in)
└─ Max instances: Unlimited

Backend (Railway):
├─ CPU threshold: 70% → +1 instance
├─ Memory threshold: 80% → +1 instance
├─ Min instances: 2
├─ Max instances: 20
├─ Health check: Every 30s
└─ Graceful shutdown: 30s timeout

Database (Supabase):
├─ Connection pool: Max 50
├─ Replicas: Read replicas for analytics
├─ Partitioning: By month (documents, audit_logs)
├─ Archive: Older data to S3 (1 year+)
└─ VACUUM: Daily at 2 AM

Cache (Redis):
├─ Cluster mode enabled
├─ Replication: 1 master + 2 replicas
├─ TTL policies: Automatic eviction
└─ Monitoring: Memory usage alerts

Load Distribution:
├─ API requests: Balanced across instances
├─ Grammar checks: Queue-based processing
├─ Real-time: WebSocket connection pooling
└─ Webhooks: Exponential backoff retry
```

---

## 📈 PERFORMANCE TARGETS

```
Frontend Performance:
├─ First Contentful Paint (FCP): < 1.5s
├─ Largest Contentful Paint (LCP): < 2.5s
├─ Cumulative Layout Shift (CLS): < 0.1
├─ First Input Delay (FID): < 100ms
├─ Time to Interactive (TTI): < 3s
├─ Lighthouse score: 85+
└─ PageSpeed score: 80+

Backend Performance:
├─ API response time: < 200ms (P95)
├─ Grammar check: < 2s per 500 words
├─ Plagiarism scan: < 60s (async)
├─ Database query: < 100ms (P95)
├─ Throughput: 10,000 requests/second
└─ Uptime target: 99.9%

Database Performance:
├─ Query latency (P95): 50ms
├─ Throughput: 50,000 TPS
├─ Backup time: < 30 minutes
├─ Restore time: < 15 minutes
└─ IOPS: 10,000+

Monitoring & Alerts:
├─ CPU > 80%: Alert
├─ Memory > 85%: Alert
├─ Error rate > 1%: Alert
├─ Response time > 500ms (P95): Alert
├─ Database connections > 40: Alert
└─ Uptime < 99%: Alert
```

---

## 🔄 CI/CD PIPELINE

```
GitHub Push
    ↓
├─ Run tests (Jest, 90%+ coverage)
├─ Lint check (ESLint)
├─ Type check (TypeScript)
├─ Security scan (Snyk)
└─ Build check
    ↓
All pass? → Continue : Fail
    ↓
Build Docker image
    ↓
Push to Railway registry
    ↓
Deploy to staging environment
    ↓
Smoke tests on staging
    ↓
All pass? → Continue : Rollback
    ↓
Deploy to production (blue-green)
    ↓
Route 10% traffic → 100% gradually
    ↓
Monitor metrics
    ↓
Rollback if error rate > 1%
    ↓
Notify team
```

---

## 💾 BACKUP & DISASTER RECOVERY

```
Backup Strategy:
├─ Hourly snapshots (24-hour retention)
├─ Daily full backups (30-day retention)
├─ Weekly backups (1-year retention)
├─ Monthly archives (7-year retention)
├─ Encryption: AES-256
├─ Replication: Cross-region
├─ RPO (Recovery Point Objective): 1 hour
└─ RTO (Recovery Time Objective): 30 minutes

Disaster Recovery Plan:
├─ Complete data loss → Restore from latest backup
├─ Service outage → Failover to replica instance
├─ Security breach → Incident response protocol
├─ Performance degradation → Auto-scaling + CDN
└─ Database corruption → Point-in-time recovery

Testing:
├─ Monthly backup restoration test
├─ Quarterly disaster recovery drill
├─ Annual security penetration test
└─ Continuous monitoring & alerting
```

---

**Document Status:** ✅ COMPLETE  
**Ready for:** DevOps, Infrastructure Setup, Deployment Planning

