// Definition modules for importing png|svg|jpg|gif 
declare module "*.png" {
    const content: any;
    export default content;
}
declare module "*.svg" {
    const content: any;
    export default content;
}
declare module "*.jpg" {
    const content: any;
    export default content;
}
declare module "*.gif" {
    const content: any;
    export default content;
}
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
