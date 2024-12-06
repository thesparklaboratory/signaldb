import type { FieldExpression } from '../types/Selector';
export default function isFieldExpression<T>(expression: any): expression is FieldExpression<T>;
