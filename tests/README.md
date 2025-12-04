# Testing Guide

## 📋 Test Structure

```
tests/
├── unit/              # Unit tests
│   ├── components/   # Component tests
│   ├── hooks/        # Hook tests
│   └── lib/          # Utility tests
├── integration/      # Integration tests
│   └── api/         # API integration tests
└── e2e/             # End-to-end tests (Cypress)
```

## 🚀 Running Tests

### Frontend Tests
```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Backend Tests
```bash
cd backend

# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov
```

## 📝 Writing Tests

### Component Tests
```typescript
import { render, screen } from '@/tests/utils/test-utils';
import { Button } from '@/components/base/Button';

test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

### Service Tests
```typescript
import { Test } from '@nestjs/testing';
import { MyService } from './my.service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MyService],
    }).compile();

    service = module.get<MyService>(MyService);
  });

  it('should do something', () => {
    expect(service.doSomething()).toBe('expected');
  });
});
```

## ✅ Coverage Goals

- **Unit Tests:** 60-70% coverage
- **Integration Tests:** 40-50% coverage
- **E2E Tests:** Critical paths only

## 🎯 Test Checklist

- [ ] Happy path (success case)
- [ ] Error cases
- [ ] Edge cases
- [ ] Data validation
- [ ] Accessibility
- [ ] User interactions

