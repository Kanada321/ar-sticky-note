// resources/ts/typings.d.ts

// 画像ファイルの型宣言
declare module '*.jpg' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}

// CSS モジュールの型宣言
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

// カスタムファイル形式（例: .dat, .patt）の型宣言
declare module '*.dat' {
    const content: string;
    export default content;
}
declare module '*.patt' {
    const content: string;
    export default content;
}

declare module '*.gltf' {
    const content: string;
    export default content;
}
