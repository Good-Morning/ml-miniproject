import React, { createContext } from 'react';
import cookie from 'react-cookies';

import Menu from './menu';
import Title from './title';

import styles from './app.module.css';

export interface IThemeContext {
    value: boolean,
    switcher: () => void
}

export const ThemeContext = createContext({value: false, switcher: () => {}})

export default class App extends React.Component {

    _switcher() {
        cookie.save('theme', '' + !(this as App).state.theme);
        (this as App).setState((state: { searchField: string, theme: boolean }) => {return {theme: !state.theme}})
    }
    switcher = this._switcher.bind(this)
    
    _getTheme(): boolean {
        let res: boolean = cookie.load('theme') === 'true'
        if (res === undefined) {
            cookie.save('theme', 'false')
            res = false
        }
        return res
    }
    getTheme = this._getTheme.bind(this)
    
    public state: { theme: boolean } = { theme: this.getTheme() }

    render() {
        let className=styles['app'];
        if (this.state.theme) {
            className += ' ' + styles['app_dark-theme']
        }
        return  <ThemeContext.Provider value={{value: this.state.theme, switcher: () => this.switcher()}}>
                    <div className={className}>
                        <div className={styles['container']}>
                            <div className={styles["menu-wrapper"]}><Menu /></div>
                            <div className={styles["main-page-wrapper"]}>
                                <div className={styles["title-wrapper"]}><Title /></div>
                                <div className={styles["content-wrapper"]}></div>
                            </div>
                        </div>
                    </div>
                </ThemeContext.Provider>
    }
}
