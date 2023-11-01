import countTo from './CountTo.vue';
import type { App, Plugin, Component } from 'vue';
export const withInstall = <T extends Component>(component: T, alias?: string) => {
    const comp = component as any;
    comp.install = (app: App) => {
        app.component(comp.name || comp.displayName, component);
        if (alias) {
            app.config.globalProperties[alias] = component;
        }
    };
    return component as T & Plugin;
};
export const CountTo = withInstall(countTo);
