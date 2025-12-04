import { formatDate, formatRelativeTime, truncate, capitalize, cn } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2025-12-04');
      const formatted = formatDate(date);
      expect(formatted).toContain('December');
      expect(formatted).toContain('2025');
    });

    it('handles string dates', () => {
      const formatted = formatDate('2025-12-04');
      expect(formatted).toContain('December');
    });
  });

  describe('formatRelativeTime', () => {
    it('returns "just now" for recent dates', () => {
      const now = new Date();
      expect(formatRelativeTime(now)).toBe('just now');
    });

    it('returns minutes ago', () => {
      const date = new Date(Date.now() - 5 * 60 * 1000);
      expect(formatRelativeTime(date)).toContain('minutes ago');
    });

    it('returns hours ago', () => {
      const date = new Date(Date.now() - 2 * 60 * 60 * 1000);
      expect(formatRelativeTime(date)).toContain('hours ago');
    });
  });

  describe('truncate', () => {
    it('truncates long text', () => {
      const longText = 'a'.repeat(100);
      const truncated = truncate(longText, 50);
      expect(truncated.length).toBe(53); // 50 + '...'
      expect(truncated).toEndWith('...');
    });

    it('returns original text if shorter than limit', () => {
      const shortText = 'Hello';
      expect(truncate(shortText, 50)).toBe(shortText);
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    it('handles already capitalized text', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });
  });

  describe('cn', () => {
    it('merges class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('handles conditional classes', () => {
      expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
    });
  });
});

