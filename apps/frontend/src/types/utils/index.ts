// Type utilities re-exports for convenience

export { TypePredicates } from '../type-predicates';
export {
  createDiscriminatedUnion,
  match,
  assertUnreachable,
  createUnionValidator,
} from '../discriminated-union-utils';
export {
  createTypedEventEmitter,
  createTypedEventEmitterWithOnce,
  type TypedEventEmitter,
} from '../typed-event-emitter';
export {
  createStateMachine,
  createTransition,
  createGuardedTransition,
  createHierarchicalStateMachine,
  type StateMachine,
  type StateMachineConfig,
} from '../state-machine-utils';
export { TypeSystemInfo, getTypeSystemDiagnostics, TypeSystemFeatures } from '../type-system-info';
