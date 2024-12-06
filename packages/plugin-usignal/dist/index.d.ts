declare const usignalReactivityAdapter: import("signaldb").ReactivityAdapter<{
    depend: () => void;
    notify: () => void;
}>;
export default usignalReactivityAdapter;
