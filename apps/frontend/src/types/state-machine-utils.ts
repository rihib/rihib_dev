// Type-safe state machine utilities

export interface StateMachineConfig<
  States extends string,
  Events extends string,
  Context extends Record<string, unknown> = {},
> {
  initial: States;
  states: Record<
    States,
    {
      on?: Partial<Record<Events, States>>;
      entry?: (context: Context) => void;
      exit?: (context: Context) => void;
    }
  >;
}

export interface StateMachine<
  States extends string,
  Events extends string,
  Context extends Record<string, unknown> = {},
> {
  current: States;
  context: Context;
  send(event: Events, context?: Partial<Context>): States;
  can(event: Events): boolean;
  getState(): States;
  getContext(): Context;
  reset(): void;
}

// Utility for creating type-safe state machines
export const createStateMachine = <
  States extends string,
  Events extends string,
  Context extends Record<string, unknown> = {},
>(
  config: StateMachineConfig<States, Events, Context>
): StateMachine<States, Events, Context> => {
  let current = config.initial;
  let context = {} as Context;

  return {
    get current() {
      return current;
    },

    get context() {
      return context;
    },

    send(event: Events, newContext?: Partial<Context>): States {
      const currentState = config.states[current];
      const nextState = currentState.on?.[event];

      if (nextState) {
        currentState.exit?.(context);
        current = nextState;

        if (newContext) {
          context = { ...context, ...newContext };
        }

        config.states[nextState].entry?.(context);
      }

      return current;
    },

    can(event: Events): boolean {
      return !!config.states[current].on?.[event];
    },

    getState(): States {
      return current;
    },

    getContext(): Context {
      return context;
    },

    reset(): void {
      const initialState = config.states[config.initial];
      if (config.states[current].exit) {
        config.states[current].exit!(context);
      }
      current = config.initial;
      context = {} as Context;
      initialState.entry?.(context);
    },
  };
};

// Helper for creating state machine transitions
export const createTransition = <States extends string>(
  from: States,
  to: States
): { from: States; to: States } => ({ from, to });

// Helper for creating guarded transitions
export const createGuardedTransition = <
  States extends string,
  Events extends string,
  Context extends Record<string, unknown> = {},
>(
  from: States,
  to: States,
  guard: (context: Context) => boolean
) => ({
  from,
  to,
  guard,
});

// Utility for creating hierarchical state machines
export const createHierarchicalStateMachine = <
  States extends string,
  Events extends string,
  Context extends Record<string, unknown> = {},
>(
  config: StateMachineConfig<States, Events, Context> & {
    substates?: Partial<Record<States, StateMachine<string, string, any>>>;
  }
) => {
  const machine = createStateMachine(config);
  const substates =
    config.substates || ({} as Partial<Record<States, StateMachine<string, string, any>>>);

  return {
    ...machine,
    sendToSubstate(event: string, context?: any) {
      const substate = substates[machine.current];
      if (substate) {
        return substate.send(event, context);
      }
      return null;
    },
    getSubstate() {
      return substates[machine.current] || null;
    },
  };
};
