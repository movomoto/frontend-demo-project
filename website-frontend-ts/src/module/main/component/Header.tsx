import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Button, Layout, Menu} from "antd";
import {Dispatch} from "redux";

import "./header.less";
import {actions as userActions} from "module/user";
import {RootState} from "type/state";

interface Props {
    loggedIn: boolean;
    userName: string;
    logout: () => void;
}

const Header: React.SFC<Props> = ({logout, loggedIn, userName}) => {
    const loginMenu = () =>
        <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
                <Link to={"/login"}>Login</Link>
            </Menu.Item>
        </Menu>;

    return <Layout.Header className="header-header">
        {loggedIn ? <div>Hello {userName}, <Button onClick={logout}>Logout</Button></div> : loginMenu()}
    </Layout.Header>;
};

const mapStatsToProps = (state: RootState) => {
    return {
        loggedIn: state.app.user.currentUser.loggedIn,
        userName: state.app.user.currentUser.name,
    };
};
const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
    logout: () => {
        dispatch(userActions.logout());
    }
});
export default connect(mapStatsToProps, mapDispatchToProps)(Header);
