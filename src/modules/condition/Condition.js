import _ from 'lodash';
import { CONDITION_TYPES } from './constants';

export class Condition {
  constructor({ field, type, value, conditions = [] }) {
    this.field = field; // path to a field in the context
    this.type = type; // condition type: "EQUALS", "NOT_EQUALS", "AND", "OR"
    this.value = value; // value to be compared with the context field's value
    this.conditions = conditions; // list of sub-conditions (for "AND" / "OR")
  }

  // Method to evaluate the condition
  matches(context) {
    const fieldValue = _.get(context, this.field);

    switch (this.type) {
      case CONDITION_TYPES['EQUALS']:
        return fieldValue === this.value;
      case CONDITION_TYPES['NOT_EQUALS']:
        return fieldValue !== this.value;
      case CONDITION_TYPES['AND']:
        return this.conditions.every((condition) => condition.matches(context));
      case CONDITION_TYPES['OR']:
        return this.conditions.some((condition) => condition.matches(context));
      default:
        return true;
    }

    // Implement the functionality for validating the the condition
    switch (this.type) {
      case CONDITION_TYPES['EQUALS']:

      case CONDITION_TYPES['NOT_EQUALS']:

      case CONDITION_TYPES['AND']:

      case CONDITION_TYPES['OR']:

      default:
        return true;
    }
  }
}
