declare const obyReactivityAdapter: import("signaldb").ReactivityAdapter<{
    depend: () => void;
    notify: () => void;
}>;
export default obyReactivityAdapter;
