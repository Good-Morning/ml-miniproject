import React, { createContext } from 'react';
import cookie from 'react-cookies';

import Menu from './menu';
import Title from './title';
import Content from './content';

import styles from './app.module.css';

export interface IUserData {
    id: number,
    login: string
}

export const UserContext = createContext<{updater: (user: IUserData | null) => void, getter: () => IUserData | null}>(
    {updater: (user: IUserData | null) => {}, getter: () => null})

export default class App extends React.Component {
    
    _getUser(): IUserData | null {
        let id = cookie.load('id')
        let login: string = cookie.load('login')
        if (id === undefined || id == "null") {
            return null 
        }
        return {id: +id, login: login}
    }
    getUser = this._getUser.bind(this)
    
    public state: { 
        sheet: string,
        user: IUserData | null
    } = { sheet: 'Liked', user: this.getUser() }

    _updateUser(user: IUserData | null) {
        if (user === null) {
            cookie.save('id', "null")
        } else {
            cookie.save('id', "" + user.id)
            cookie.save('login', user.login)
        }
        this.setState({user: user})
    }
    updateUser = this._updateUser.bind(this)

    render() {
        let that = this
        let switchTo = (sheet: string) => that.setState({sheet: sheet})

        return  <UserContext.Provider value={{updater: this.updateUser, getter: () => this.state.user}}>
                    <div className={styles['app']}>
                        <div className={styles['container']}>
                            <div className={styles["menu-wrapper"]}><Menu switchTo={switchTo}/></div>
                            <div className={styles["main-page-wrapper"]}>
                                <div className={styles["title-wrapper"]}><Title sheet={this.state.sheet}/></div>
                                <div className={styles["content-wrapper"]}><Content sheet={this.state.sheet} user={this.state.user}/></div>
                            </div>
                        </div>
                    </div>
                </UserContext.Provider>;
    }
}
