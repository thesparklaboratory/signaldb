import type { Tracker } from 'meteor-ts-tracker';
export default function createMeteorReactivityAdapter(tracker: typeof Tracker): import("signaldb").ReactivityAdapter<{
    depend: () => void;
    notify: () => void;
}>;
