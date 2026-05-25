import request from 'supertest';
import app from '../../src/app';

describe('Auth routes', () => {
  it('should register user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123',
      });
    
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true)
  });
});
