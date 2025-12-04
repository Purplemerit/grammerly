import { GrammarChecker } from './grammar-checker';

describe('GrammarChecker', () => {
  let checker: GrammarChecker;

  beforeEach(() => {
    checker = new GrammarChecker();
  });

  describe('check', () => {
    it('should detect grammar errors', async () => {
      const result = await checker.check('The team are working.', {
        language: 'en-US',
        checkTypes: ['grammar'],
      });

      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].type).toBe('GRAMMAR');
    });

    it('should detect spelling errors', async () => {
      const result = await checker.check('I recieve the message.', {
        language: 'en-US',
        checkTypes: ['spelling'],
      });

      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].type).toBe('SPELLING');
    });

    it('should calculate grammar score', async () => {
      const result = await checker.check('This is a perfect sentence.', {
        language: 'en-US',
        checkTypes: ['grammar', 'spelling', 'punctuation'],
      });

      expect(result.summary).toHaveProperty('grammarScore');
      expect(result.summary.grammarScore).toBeGreaterThanOrEqual(0);
      expect(result.summary.grammarScore).toBeLessThanOrEqual(100);
    });

    it('should return error summary', async () => {
      const result = await checker.check('The team are working. Teh message.', {
        language: 'en-US',
        checkTypes: ['grammar', 'spelling'],
      });

      expect(result.summary).toHaveProperty('totalErrors');
      expect(result.summary).toHaveProperty('grammarErrors');
      expect(result.summary).toHaveProperty('spellingErrors');
    });
  });
});

