/**
 * Integration tests for authentication API
 * 
 * These tests require a running backend server
 * Run: npm run backend:dev before running these tests
 */

describe('Auth API Integration', () => {
  const API_BASE = 'http://localhost:3001/api/v1';

  describe('POST /auth/signup', () => {
    it('should create a new user', async () => {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `test-${Date.now()}@example.com`,
          password: 'SecurePass123!',
          full_name: 'Test User',
          acceptTerms: true,
          acceptPrivacy: true,
        }),
      });

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('email');
    });

    it('should reject invalid email', async () => {
      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'invalid-email',
          password: 'SecurePass123!',
          full_name: 'Test User',
        }),
      });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /auth/login', () => {
    it('should login with valid credentials', async () => {
      // First create a user
      const signupResponse = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `test-${Date.now()}@example.com`,
          password: 'SecurePass123!',
          full_name: 'Test User',
          acceptTerms: true,
          acceptPrivacy: true,
        }),
      });

      const user = await signupResponse.json();

      // Then login
      const loginResponse = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          password: 'SecurePass123!',
        }),
      });

      expect(loginResponse.status).toBe(200);
      const data = await loginResponse.json();
      expect(data).toHaveProperty('accessToken');
      expect(data).toHaveProperty('user');
    });
  });
});

