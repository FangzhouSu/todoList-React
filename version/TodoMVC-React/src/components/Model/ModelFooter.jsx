import React, {Component,Fragment} from "react";

/**
 * leftCount: int
 * 
 * onChangeStatus(status)
 *    onSelectAll|onSelectActive|onSelectCompleted
 * onClearCompleted
 */

export default class TodoFooter extends Component{
    //切换渲染状态  All|Active|Completed
    handleShift=(shift)=>{
        return () => {this.props.shiftRender(shift);}
    }
    handleDeleteTodoDone=()=>{
        return this.props.deleteTodoDone();
    }


    render(){
        const {todoList,doneAny,shift} = this.props;
        let leftCount = 0;
        todoList.forEach((todo)=>{
            if(todo.isActive){
                leftCount ++;
            }
        });
        return(
            <Fragment>
                <footer className="modelFooter" style={{display:todoList.length?'':'none'}}>
                    <span className="leftCount">{leftCount} items left</span>
                    <ul className="filters">
                        <li>
                            <a href="#/" 
                            className={shift === "all"?'selected':null}
                            onClick={this.handleShift('all')}
                            >All</a>
                        </li>
                        <li>
                            <a href="#/active"
                            className={shift === "active"?'selected':null}
                            onClick={this.handleShift('active')}
                            >Active</a>
                        </li>
                        <li>
                            <a href="#/Completed"
                            className={shift === "completed"?'selected':null}
                            onClick={this.handleShift('completed')}
                            >Completed</a>
                        </li>
                    </ul>
                    {/* 删除已完成项的按钮，当无已完成项时隐藏 */}
                    <button 
                    className="clearButton" 
                    style={{display:doneAny?'':'none'}}
                    onClick={this.handleDeleteTodoDone}>
                        clear completed
                    </button>
                </footer>
            </Fragment>
        )
    }
}