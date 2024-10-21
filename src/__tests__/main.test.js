import { render, renderHook, waitFor } from '@testing-library/react';

import { Condition } from '../modules/condition';
import { useValidateCondition } from '../hooks/useValidateCondition';
import { useFetchData } from '../hooks/useFetchData';
import { withVisibility } from '../hocs/withVisibility';

// Dummy component for testing
const TestComponent = (props) => <div>Test Component {props.testProp}</div>;

describe('Main Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

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

  describe('useFetchData', () => {
    beforeEach(() => {
      jest.useFakeTimers(); // Use Jest's fake timers
    });

    afterEach(() => {
      jest.clearAllTimers(); // Clear timers after each test
    });

    test('should return loading true when the payload is provided', () => {
      const mockPayload = { entityType: 'CASE' };
      const { result } = renderHook(() => useFetchData(mockPayload));

      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBeUndefined();
    });

    test('should return loading false and data when fetchData is successful', async () => {
      const mockPayload = { entityType: 'CASE' };
      const { result } = renderHook(() => useFetchData(mockPayload));

      jest.advanceTimersByTime(1000);

      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBeUndefined();

      jest.advanceTimersByTime(2000);

      await waitFor(() => {
        expect(result.current.loading).toBe(false); // Loading should be false now
        expect(result.current.data).toEqual({
          caseNu: 123,
          fields: {
            _c_status: 'IN_PROGRESS',
          },
        }); // Data should be the mock data
      });
    });

    test('should handle no payload gracefully', () => {
      const { result } = renderHook(() => useFetchData());

      expect(result.current.loading).toBe(false); // Loading should be false
      expect(result.current.data).toBeUndefined(); // Data should be undefined
    });
  });

  describe('useValidateCondition', () => {
    test('should return visible as true when conditionsConfig is not provided', () => {
      jest
        .spyOn(require('../hooks/useFetchData'), 'useFetchData')
        .mockReturnValue({ data: null, loading: false });

      const { result } = renderHook(() => useValidateCondition());

      expect(result.current.visible).toBe(true);
      expect(result.current.loading).toBe(false);
    });

    test('should return loading as true when useFetchData is loading', () => {
      jest
        .spyOn(require('../hooks/useFetchData'), 'useFetchData')
        .mockReturnValue({ data: null, loading: true });

      const { result } = renderHook(() => useValidateCondition());

      expect(result.current.loading).toBe(true);
    });

    test('should return visible as true when condition matches', () => {
      const condition = {
        matches: jest.fn(() => true),
      };

      jest
        .spyOn(require('../hooks/useFetchData'), 'useFetchData')
        .mockReturnValue({
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

    test('should return visible as false when condition does not match', () => {
      const condition = {
        matches: jest.fn(() => false),
      };

      jest
        .spyOn(require('../hooks/useFetchData'), 'useFetchData')
        .mockReturnValue({
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

  describe('withVisibility HOC', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.restoreAllMocks();
      jest.resetAllMocks();
    });

    test('should render the Placeholder when loading is true', () => {
      // Spy on useValidateCondition and mock return value
      jest
        .spyOn(require('../hooks/useValidateCondition'), 'useValidateCondition')
        .mockReturnValue({
          loading: true,
          visible: false,
        });

      const WrappedComponent = withVisibility(TestComponent);
      const { getByText } = render(
        <WrappedComponent conditionsConfig={{}} testProp="testValue" />
      );

      // Assert Placeholder is rendered
      getByText('Loading...');
    });

    test('should render the Component when loading is false and visible is true', () => {
      // Spy on useValidateCondition and mock return value
      jest
        .spyOn(require('../hooks/useValidateCondition'), 'useValidateCondition')
        .mockReturnValue({
          loading: false,
          visible: true,
        });

      const WrappedComponent = withVisibility(TestComponent);
      const { getByText } = render(
        <WrappedComponent conditionsConfig={{}} testProp="testValue" />
      );

      // Assert TestComponent is rendered
      getByText('Test Component testValue');
    });

    test('should render null when loading is false and visible is false', () => {
      // Spy on useValidateCondition and mock return value
      jest
        .spyOn(require('../hooks/useValidateCondition'), 'useValidateCondition')
        .mockReturnValue({
          loading: false,
          visible: false,
        });

      const WrappedComponent = withVisibility(TestComponent);
      const { container } = render(
        <WrappedComponent conditionsConfig={{}} testProp="testValue" />
      );

      // Assert null is rendered
      expect(container.firstChild).toBeNull();
    });
  });
});
