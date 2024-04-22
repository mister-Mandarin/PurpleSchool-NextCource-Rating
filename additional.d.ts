// Переопрелеяем тип для svg чтобы работали подсказки.
// https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration


declare module '*.svg' {
    import React from 'react';

    const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default content;
}