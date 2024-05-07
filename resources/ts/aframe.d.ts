// aframe.d.ts
declare namespace JSX {
    interface IntrinsicElements {
        "a-scene": any;
        "a-assets": any;
        "a-entity": any;
        "a-camera": any;
        "a-marker": any;
        "a-box": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            color?: string;
            depth?: number;
            height?: number;
            width?: number;
            position?: string;
            material?: string;
            rotation?: string;
            scale?: string;
        };
        "a-sphere": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        color?: string;
        depth?: number;
        height?: number;
        width?: number;
        position?: string;
        material?: string;
        rotation?: string;
        scale?: string;
        radius?: number;
        };
        "a-cylinder": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            color?: string;
            depth?: number;
            height?: number;
            width?: number;
            position?: string;
            material?: string;
            rotation?: string;
            scale?: string;
            radius?: number;
        };
        "a-plane": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            color?: string;
            depth?: number;
            height?: number;
            width?: number;
            position?: string;
            material?: string;
            rotation?: string;
            scale?: string;
            radius?: number;
        };
        "a-sky": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            color?: string;
            depth?: number;
            height?: number;
            width?: number;
            position?: string;
            material?: string;
            rotation?: string;
            scale?: string;
            radius?: number;
        };
        "a-light": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            color?: string;
            depth?: number;
            height?: number;
            width?: number;
            position?: string;
            material?: string;
            rotation?: string;
            scale?: string;
            radius?: number;
        　　 intensity?: number;
        };
        "a-text": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { value?: string; color?: string; align?: string; width?: number; };
        "a-image": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { src?: string; };
        "a-video": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { src?: string; };
        "a-link": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { href?: string; title?: string; };
        "a-cursor": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        "a-animation": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            color?: string;
            depth?: number;
            height?: number;
            width?: number;
            position?: string;
            material?: string;
            rotation?: string;
            scale?: string;
            radius?: number;
            dur?: number;
        };
        "a-scene": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            embedded?: boolean;
            arjs?: string;
            // 他のカスタム属性があればここに追加
        };
    }
}
