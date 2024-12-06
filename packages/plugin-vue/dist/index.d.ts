declare const vueReactivityAdapter: import("signaldb").ReactivityAdapter<{
    depend: () => void;
    notify: () => void;
}>;
export default vueReactivityAdapter;
