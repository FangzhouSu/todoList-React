import React, { useState } from "react";
import storage from "../../utils/storage";

export default function Options(props){
    // 设置状态
    const [fold,setFold] = useState(false);

    // 修改密码状态
    const [key,setKey] = useState(false);
    const common = props.user === Symbol.for('common').toString();
    
    // 修改密码
    const updateKey = () =>{
        let newKey = document.getElementById('newKey').value;
        storage.setParams(props.user,newKey);
        console.log(props.user,'新密码为', newKey);
        window.alert('🌈密码成功修改为:' + newKey +',请重新登录');
        unload();
    }

    //退出账号
    const unload = () =>{
        props.storage();
        props.setUser(null);
        props.setLoaded(false);
        console.log('🌈unload');
    }
    
    return(
        <div className="options">
            <div><button onClick={()=>{setFold(!fold)}}>options</button></div>
            <div style={{display:fold?null:'none', marginTop:'10px'}}>
                {common?null:
                //  修改密码
                <div className="updateKey">
                    <button onClick={()=>{
                    setKey(!key);
                    }}>update password</button><br/>
                    {key?
                    <div className="updateKeyInput">
                        <input type={'text'} id={'newKey'}/>
                        <button onClick={() => updateKey()}>confirm</button>
                    </div>
                    :null}
                </div>
                }
                {/* 退出账号 */}
                <div className="unloadButton">
                    <button onClick={()=>{unload()}}>unload</button>
                </div>
            </div>
        </div>
    )
}