declare const sReactivityAdapter: import("signaldb").ReactivityAdapter<{
    depend: () => void;
    notify: () => void;
}>;
export default sReactivityAdapter;
