import { Condition } from '../modules/condition';

describe('Main Tests', () => {
  describe('Condition Class - matches function', () => {
    const context = {
      user: {
        age: 25,
        name: 'John',
        active: true,
      },
      preferences: {
        theme: 'dark',
        notifications: true,
      },
    };

    // Test for EQUALS condition
    test('should return true when field value EQUALS provided value', () => {
      const condition = new Condition({
        field: 'user.age',
        type: 'EQUALS',
        value: 25,
      });
      expect(condition.matches(context)).toBe(true);
    });

    test('should return false when field value does NOT EQUAL provided value', () => {
      const condition = new Condition({
        field: 'user.age',
        type: 'EQUALS',
        value: 30,
      });
      expect(condition.matches(context)).toBe(false);
    });

    // Test for NOT_EQUALS condition
    test('should return true when field value NOT_EQUALS provided value', () => {
      const condition = new Condition({
        field: 'user.age',
        type: 'NOT_EQUALS',
        value: 30,
      });
      expect(condition.matches(context)).toBe(true);
    });

    test('should return false when field value EQUALS provided value for NOT_EQUALS condition', () => {
      const condition = new Condition({
        field: 'user.age',
        type: 'NOT_EQUALS',
        value: 25,
      });
      expect(condition.matches(context)).toBe(false);
    });

    // Test for AND condition
    test('should return true when all AND conditions match', () => {
      const andCondition = new Condition({
        type: 'AND',
        conditions: [
          new Condition({ field: 'user.age', type: 'EQUALS', value: 25 }),
          new Condition({ field: 'user.active', type: 'EQUALS', value: true }),
        ],
      });
      expect(andCondition.matches(context)).toBe(true);
    });

    test('should return false when one of the AND conditions fails', () => {
      const andCondition = new Condition({
        type: 'AND',
        conditions: [
          new Condition({ field: 'user.age', type: 'EQUALS', value: 25 }),
          new Condition({ field: 'user.active', type: 'EQUALS', value: false }), // This will fail
        ],
      });
      expect(andCondition.matches(context)).toBe(false);
    });

    // Test for OR condition
    test('should return true when one of the OR conditions matches', () => {
      const orCondition = new Condition({
        type: 'OR',
        conditions: [
          new Condition({ field: 'user.age', type: 'EQUALS', value: 30 }), // This will fail
          new Condition({ field: 'user.active', type: 'EQUALS', value: true }), // This will pass
        ],
      });
      expect(orCondition.matches(context)).toBe(true);
    });

    test('should return false when none of the OR conditions match', () => {
      const orCondition = new Condition({
        type: 'OR',
        conditions: [
          new Condition({ field: 'user.age', type: 'EQUALS', value: 30 }), // Fail
          new Condition({ field: 'user.active', type: 'EQUALS', value: false }), // Fail
        ],
      });
      expect(orCondition.matches(context)).toBe(false);
    });

    // Test for Nested conditions
    test('should return true for complex nested conditions', () => {
      const nestedCondition = new Condition({
        type: 'AND',
        conditions: [
          new Condition({ field: 'user.age', type: 'EQUALS', value: 25 }),
          new Condition({
            type: 'OR',
            conditions: [
              new Condition({
                field: 'preferences.theme',
                type: 'EQUALS',
                value: 'light',
              }), // Fail
              new Condition({
                field: 'preferences.notifications',
                type: 'EQUALS',
                value: true,
              }), // Pass
            ],
          }),
        ],
      });
      expect(nestedCondition.matches(context)).toBe(true);
    });

    test('should return false for complex nested conditions when inner condition fails', () => {
      const nestedCondition = new Condition({
        type: 'AND',
        conditions: [
          new Condition({ field: 'user.age', type: 'EQUALS', value: 25 }),
          new Condition({
            type: 'OR',
            conditions: [
              new Condition({
                field: 'preferences.theme',
                type: 'EQUALS',
                value: 'light',
              }), // Fail
              new Condition({
                field: 'preferences.notifications',
                type: 'EQUALS',
                value: false,
              }), // Fail
            ],
          }),
        ],
      });
      expect(nestedCondition.matches(context)).toBe(false);
    });
  });
});
