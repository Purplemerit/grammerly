/**
 * Grammar Checker - Basic implementation
 * This can be enhanced with actual NLP (spaCy/BERT) via microservice later
 */
export class GrammarChecker {
  async check(text: string, options: { language: string; checkTypes: string[] }) {
    const errors: any[] = [];
    
    // Basic grammar checking (can be replaced with NLP service)
    // For now, implement basic rule-based checks
    
    if (options.checkTypes.includes('grammar')) {
      errors.push(...this.checkGrammar(text));
    }
    
    if (options.checkTypes.includes('spelling')) {
      errors.push(...this.checkSpelling(text));
    }
    
    if (options.checkTypes.includes('punctuation')) {
      errors.push(...this.checkPunctuation(text));
    }
    
    if (options.checkTypes.includes('style')) {
      errors.push(...this.checkStyle(text));
    }

    // Calculate summary
    const summary = this.calculateSummary(errors, text);

    return {
      errors,
      summary,
    };
  }

  private checkGrammar(text: string): any[] {
    const errors: any[] = [];
    const sentences = this.splitIntoSentences(text);
    let currentPosition = 0;

    sentences.forEach((sentence) => {
      // Check for common grammar issues
      // Subject-verb agreement: "team are" -> "team is"
      const teamAreRegex = /\b(team|group|committee|family|class)\s+are\b/gi;
      let match;
      while ((match = teamAreRegex.exec(sentence)) !== null) {
        errors.push({
          type: 'GRAMMAR',
          severity: 'MEDIUM',
          category: 'subject_verb_agreement',
          position: {
            start: currentPosition + match.index + match[0].indexOf('are'),
            end: currentPosition + match.index + match[0].indexOf('are') + 3,
          },
          original: 'are',
          suggestions: ['is'],
          explanation: `Subject-verb agreement: '${match[1]}' is singular, use 'is' not 'are'`,
          confidence: 0.95,
        });
      }

      // Double negatives
      const doubleNegativeRegex = /\b(?:don't|doesn't|didn't|won't|can't|isn't|aren't|wasn't|weren't)\s+\w+\s+(?:no|not|never|nothing|nobody|nowhere)\b/gi;
      if (doubleNegativeRegex.test(sentence)) {
        errors.push({
          type: 'GRAMMAR',
          severity: 'HIGH',
          category: 'double_negative',
          position: {
            start: currentPosition,
            end: currentPosition + sentence.length,
          },
          original: sentence.trim(),
          suggestions: [sentence.replace(/\b(?:don't|doesn't|didn't|won't|can't|isn't|aren't|wasn't|weren't)\s+/gi, '').replace(/\s+(?:no|not|never|nothing|nobody|nowhere)\b/gi, '')],
          explanation: 'Avoid double negatives for clarity',
          confidence: 0.90,
        });
      }

      currentPosition += sentence.length + 1;
    });

    return errors;
  }

  private checkSpelling(text: string): any[] {
    const errors: any[] = [];
    // Common misspellings dictionary
    const commonMisspellings: { [key: string]: string[] } = {
      'teh': ['the'],
      'adn': ['and'],
      'taht': ['that'],
      'recieve': ['receive'],
      'seperate': ['separate'],
      'occured': ['occurred'],
      'definately': ['definitely'],
      'accomodate': ['accommodate'],
    };

    const words = text.split(/\s+/);
    let position = 0;

    words.forEach((word) => {
      const cleanWord = word.replace(/[.,!?;:]/g, '').toLowerCase();
      if (commonMisspellings[cleanWord]) {
        errors.push({
          type: 'SPELLING',
          severity: 'HIGH',
          category: 'misspelling',
          position: {
            start: position,
            end: position + word.length,
          },
          original: word,
          suggestions: commonMisspellings[cleanWord],
          explanation: `Common misspelling: '${word}' should be '${commonMisspellings[cleanWord][0]}'`,
          confidence: 0.99,
        });
      }
      position += word.length + 1;
    });

    return errors;
  }

  private checkPunctuation(text: string): any[] {
    const errors: any[] = [];
    
    // Missing period at end
    if (text.trim() && !text.trim().match(/[.!?]$/)) {
      errors.push({
        type: 'PUNCTUATION',
        severity: 'LOW',
        category: 'missing_period',
        position: {
          start: text.length - 1,
          end: text.length,
        },
        original: '',
        suggestions: ['.'],
        explanation: 'Sentence should end with punctuation',
        confidence: 0.80,
      });
    }

    // Multiple spaces
    const multipleSpacesRegex = /\s{2,}/g;
    let match;
    while ((match = multipleSpacesRegex.exec(text)) !== null) {
      errors.push({
        type: 'PUNCTUATION',
        severity: 'LOW',
        category: 'multiple_spaces',
        position: {
          start: match.index,
          end: match.index + match[0].length,
        },
        original: match[0],
        suggestions: [' '],
        explanation: 'Multiple spaces should be replaced with a single space',
        confidence: 0.95,
      });
    }

    return errors;
  }

  private checkStyle(text: string): any[] {
    const errors: any[] = [];
    
    // Passive voice detection (basic)
    const passiveVoiceRegex = /\b(?:is|are|was|were|been|being)\s+\w+ed\b/gi;
    let match;
    while ((match = passiveVoiceRegex.exec(text)) !== null) {
      errors.push({
        type: 'STYLE',
        severity: 'LOW',
        category: 'passive_voice',
        position: {
          start: match.index,
          end: match.index + match[0].length,
        },
        original: match[0],
        suggestions: ['Consider using active voice'],
        explanation: 'Passive voice can make writing less direct',
        confidence: 0.70,
      });
    }

    return errors;
  }

  private splitIntoSentences(text: string): string[] {
    return text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
  }

  private calculateSummary(errors: any[], text: string) {
    const wordCount = text.split(/\s+/).filter((w) => w.length > 0).length;
    const totalErrors = errors.length;
    const grammarErrors = errors.filter((e) => e.type === 'GRAMMAR').length;
    const spellingErrors = errors.filter((e) => e.type === 'SPELLING').length;
    const punctuationErrors = errors.filter((e) => e.type === 'PUNCTUATION').length;
    const styleErrors = errors.filter((e) => e.type === 'STYLE').length;

    // Calculate grammar score (0-100)
    // Fewer errors = higher score
    const errorRate = totalErrors / Math.max(wordCount, 1);
    const grammarScore = Math.max(0, Math.min(100, Math.round(100 - errorRate * 100)));

    return {
      totalErrors,
      grammarErrors,
      spellingErrors,
      punctuationErrors,
      styleErrors,
      grammarScore,
    };
  }
}

