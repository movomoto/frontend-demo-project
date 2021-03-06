import React from "react";
import {connect, DispatchProp} from "react-redux";
import {Alert, Button, Form, Input} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {RootState} from "type/state";
import "./loginForm.less";

import {actions} from "module/user";

interface Props extends FormComponentProps, DispatchProp<any> {
    errorMessage: string;
}

const LoginForm: React.SFC<Props> = ({dispatch, form, errorMessage}) => {
    const onSubmit = event => {
        event.preventDefault();
        form.validateFields((errors, values) => {
            if (!errors) {
                dispatch(actions.login({
                    username: values.username,
                    password: values.password
                }));
            }
        });
    };

    const usernameDecorator = form.getFieldDecorator("username", {
        rules: [{
            required: true,
            message: "Please input your username!"
        }]
    });

    const passwordDecorator = form.getFieldDecorator("password", {
        rules: [{
            required: true,
            message: "Please input your Password!"
        }]
    });

    return <div>
        {errorMessage ? <Alert message="Login Failed" description={errorMessage} type="error" closable/> : null}
        <Form onSubmit={onSubmit} className="login-form">
            <Form.Item>
                {usernameDecorator(<Input placeholder="Username"/>)}
            </Form.Item>
            <Form.Item>
                {passwordDecorator(<Input type="password" placeholder="Password"/>)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
            </Form.Item>
        </Form>
    </div>;
};

const mapStateToProps = (state: RootState) => {
    return {
        errorMessage: state.app.user.login.errorMessage
    };
};

export default connect(mapStateToProps)(Form.create()(LoginForm));
