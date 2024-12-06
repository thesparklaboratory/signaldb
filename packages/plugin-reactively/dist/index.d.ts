declare const maverickjsReactivityAdapter: import("signaldb").ReactivityAdapter<{
    depend: () => void;
    notify: () => void;
}>;
export default maverickjsReactivityAdapter;
