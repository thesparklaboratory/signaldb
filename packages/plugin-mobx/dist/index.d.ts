declare const mobxReactivityAdapter: import("signaldb").ReactivityAdapter<{
    depend: () => void;
    notify: () => void;
    raw: {
        count: number;
    };
}>;
export default mobxReactivityAdapter;
