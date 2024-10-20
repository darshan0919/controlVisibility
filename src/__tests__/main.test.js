import { renderHook } from '@testing-library/react';

import { Condition } from '../modules/condition';

import { useValidateCondition } from '../hooks/useValidateCondition';
import { useFetchData } from '../hooks/useFetchData';

jest.mock('../hooks/useFetchData');

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

  describe('useValidateCondition', () => {
    it('should return visible as true when conditionsConfig is not provided', () => {
      useFetchData.mockReturnValue({ data: null, loading: false });

      const { result } = renderHook(() => useValidateCondition());

      expect(result.current.visible).toBe(true);
      expect(result.current.loading).toBe(false);
    });

    it('should return loading as true when useFetchData is loading', () => {
      useFetchData.mockReturnValue({ data: null, loading: true });

      const { result } = renderHook(() => useValidateCondition());

      expect(result.current.loading).toBe(true);
    });

    it('should return visible as true when condition matches', () => {
      const condition = {
        matches: jest.fn(() => true),
      };

      useFetchData.mockReturnValue({
        data: { someKey: 'someValue' },
        loading: false,
      });

      const { result } = renderHook(() => useValidateCondition({ condition }));

      expect(condition.matches).toHaveBeenCalledWith({
        record: { someKey: 'someValue' },
      });
      expect(result.current.visible).toBe(true);
      expect(result.current.loading).toBe(false);
    });

    it('should return visible as false when condition does not match', () => {
      const condition = {
        matches: jest.fn(() => false),
      };

      useFetchData.mockReturnValue({
        data: { someKey: 'someValue' },
        loading: false,
      });

      const { result } = renderHook(() => useValidateCondition({ condition }));

      expect(condition.matches).toHaveBeenCalledWith({
        record: { someKey: 'someValue' },
      });
      expect(result.current.visible).toBe(false);
      expect(result.current.loading).toBe(false);
    });
  });
});
