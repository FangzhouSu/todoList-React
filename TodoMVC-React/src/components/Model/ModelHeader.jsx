import React,{Component} from "react";
import {nanoid} from 'nanoid';

export default class TodoHeader extends Component{
    handleAddTodo = (event) =>{
        const {keyCode, target} = event;
        if(keyCode === 13){
            if(target.value.trim() === ''){
                alert('🌈请正确输入Todo任务喔');
                return ;
            }
            const newTodo = {
                id:nanoid(),
                name:target.value.trim(),
                isActive:true,
                isEdit:false,
            }
            this.props.addTodo(newTodo);
            target.value = '';
        } 
    }
    render(){
        return(
            <header className="modelHeader">
                <input type='checkbox' className="toggleAll" 
                />
                <label
                    htmlFor="toggleAll"
                    style={{color:this.props.doneAll?'#666699':'#CCCCCC', visibility:this.props.todo?'':'hidden'}}
                    onClick={this.props.toggleAll} 
                ></label>
                <input 
                className="newTodo"
                onKeyUp={this.handleAddTodo}
                placeholder='What needs to be done?'
                />
            </header>
        )
    }
}