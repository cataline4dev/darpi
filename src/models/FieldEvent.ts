export interface FieldEvent<T extends EventTarget> extends InputEvent {
  readonly target: T
}