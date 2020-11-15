/// <reference types="react-scripts" />

declare module 'react-cookies' {
    export function save(name: string, value: string): void
    export function load(name: string): string
    export function loadAll(): any
}