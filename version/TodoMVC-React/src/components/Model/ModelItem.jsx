import React, {Component} from "react";

/**
 * props: {id,name,isActive}
 * 
 * emit:
 *  onChangeName
 *  onChangeStatus
 *  onDelete 
 */

export default class TodoItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:this.props.todo.name,
            isEdit:false,
        }
    }

    handleToggle=(id)=>{
        return ()=>{
            this.props.turnTodo(id);
        }
    }

    handleDelete=(id)=>{
        return ()=>{
            this.props.deleteTodo(id);
        }
    }

    handleValue=(event)=>{
        this.setState({
            value:event.target.value,
        })
    }

    handleEdit=(id,flag)=>{
        return ()=>{
            this.props.editTodo(id,flag);
        }
    }

    handleUpdate=(id,newName)=>{
        return(event)=>{
            if(event.keyCode === 13){
                if(newName !== ''){
                    this.props.updateTodo(id,newName);
                }else{
                    this.props.deleteTodo(id);
                    console.log('deleteTodo:', id);
                }
                this.props.editTodo(id,false);
            }
        }
    }
    render(){
        const {todo,done} = this.props;
        return(
            <li
                className={['editing',todo.isActive?null:'Completed'].join(' ')}
                onDoubleClick={this.handleEdit(todo.id,true)}
                onBlur={this.handleEdit(todo.id,false)}
            >
                {/* 显示Item */}
                {/* 显示勾选键，todo内容，删除键 */}
                <div style={{display:todo.isEdit?'none':null}}>
                    <input className="toggle" type='checkbox' checked={done}
                        onChange={this.handleToggle(todo.id)}/>
                    <label>{todo.name}</label> 
                    <span className="x" onClick={this.handleDelete(todo.id)}>×</span>
                </div>
                {/* 编辑Item */}
                <input
                    className="edit"
                    style={{display:todo.isEdit ? null:'none'}}
                    defaultValue={todo.name}
                    // 用keyCode是否为Enter界定了两事件传值的顺序
                    onChange={this.handleValue}
                    onKeyUp={this.handleUpdate(todo.id,this.state.value.trim())}
                    autoFocus
                />

            </li>
        )
    }
    
}