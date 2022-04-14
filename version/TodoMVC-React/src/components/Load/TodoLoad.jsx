import React from "react";
import storage from "../../utils/storage";
import Verify from "./Verify";

export default function TodoLoad(props){
    // 加载个人账号
    const load = () =>{
        let inputUser = document.getElementById('inputUser').value;
        let inputKey = document.getElementById('inputKey').value;
        if(inputUser === ''||inputKey === ''){
            window.alert('账号或密码输入不能为空')
            return ;
        }
        // 验证已有账号密码或创建新账号
        if(storage.getParams(inputUser)){
            let key = storage.getParams(inputUser);
            if(inputKey === key){
                props.setUser(inputUser);
                props.setLoaded(true);
                console.log('password - true');
                window.alert('🌈欢迎回来：用户  ' + inputUser);
            }else{
                console.log('password - false');
                window.alert('登陆失败：密码错误')
                return ;
            }
        }else{
            storage.setParams(inputUser,inputKey);
            props.setUser(inputUser);
            props.setLoaded(true);
            console.log('welcome new user');
            window.alert('🌈欢迎使用：新用户  ' + inputUser + '  (密码：' + inputKey +')');
        }
    }

    //加载通用账号
    const loadCommon = () =>{
        props.setUser(Symbol.for('common').toString());
        props.setLoaded(true);
        window.alert('🌈欢迎使用')
    }
    
    return(
        <div>
            <div>
                <div className="userInput"><span>账号</span><input id="inputUser" type={'text'} /></div>
                <div className="userInput"><span>密码</span><input id="inputKey" type={'password'} /></div>
            </div>
            <Verify 
                load={load} 
                loadCommon={loadCommon}
            />
        </div>
    )
}