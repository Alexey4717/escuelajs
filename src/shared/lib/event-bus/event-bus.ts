type EventCallback<TPayload> = (payload: TPayload) => void;

/**
 * Generic in-memory event bus with typed payloads.
 * It is domain-agnostic and can be reused by any feature.
 */
export class EventBus<Events extends Record<string, unknown>> {
  private listeners: {
    [EventName in keyof Events]?: Set<EventCallback<Events[EventName]>>;
  } = {};

  on<EventName extends keyof Events>(
    eventName: EventName,
    callback: EventCallback<Events[EventName]>,
  ): () => void {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = new Set();
    }

    this.listeners[eventName]!.add(callback);
    return () => this.off(eventName, callback);
  }

  off<EventName extends keyof Events>(
    eventName: EventName,
    callback: EventCallback<Events[EventName]>,
  ): void {
    this.listeners[eventName]?.delete(callback);
  }

  emit<EventName extends keyof Events>(
    eventName: EventName,
    ...payloadArgs: Events[EventName] extends undefined
      ? []
      : [payload: Events[EventName]]
  ): void {
    const payload = payloadArgs[0] as Events[EventName];
    this.listeners[eventName]?.forEach((listener) => listener(payload));
  }
}

export function createEventBus<Events extends Record<string, unknown>>() {
  return new EventBus<Events>();
}
