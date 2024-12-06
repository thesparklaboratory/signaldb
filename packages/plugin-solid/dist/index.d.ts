declare const solidReactivityAdapter: import("signaldb").ReactivityAdapter<{
    depend: () => void;
    notify: () => void;
}>;
export default solidReactivityAdapter;
