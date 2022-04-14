import React,{useState} from "react";

export default function Verify(props){
    // 生成验证码
    const createCode = () => {
        var newCode = '';
        let codeLenth = Math.floor(Math.random() * 3) + 3;
        var codeChars = ['0','1','2','3','4','5','6','7','8','9',
                         '0','A','B','C','D','D','E','F','G','H',
                         'I','J','K','L','M','N','O','P','Q','R',
                         'S','T','U','V','W','X','Y','Z'];
        for(let i = 0; i <= codeLenth;i++){
            let index = Math.floor(Math.random()*36);
            newCode += codeChars[index];
        }
        return newCode
    }

    //验证
    const verifyCode = () => {
        let inputCode = document.getElementById('inputCode').value.toUpperCase();
        if(inputCode === code){
            console.log('verify - true')
            return true;
        }else{
            console.log('verify - false')
            window.alert('登陆失败：验证码错误');
            return false;
        }   
    }
    const [code,setCode] = useState(createCode());
    return(
        <div className="verify">
            <div className="codeInput"><span>验证码</span><input id="inputCode" type='text' /></div>
            
            <div className="codeOutput">
                <div className="code">{code}</div>
                <button onClick={() => {setCode(createCode())}}>更新验证码</button>
            </div>
            <div className="loadButton">
                <button onClick = {() => {
                    if(verifyCode()){
                        props.load();
                    }
                }}>登录账号</button>

                <button onClick = {() => {
                    props.loadCommon();
                }}>直接使用</button>
            </div>    
        </div>
    )
}

