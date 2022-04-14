import React,{Component} from "react";
import ModelHeader from './ModelHeader';
import ModelItem from './ModelItem';
import ModelFooter from './ModelFooter';
import Options from "../tools/Options";
import storage from '../../utils/storage';

export default class TodoModel extends Component{
  constructor(props){
    super(props);
    this.state = {
      user:this.props.user,
      todoList: [],
      doneAll:false,
      doneAny:false,
      shift:'all',
    }
  }

  componentDidMount(){
    console.log('TodoModel-getStorage:'+ this.state.user);
    const todoList = storage.get(this.state.user + 'TodoList')||this.state.todoList;
    const shift = storage.getParams(this.state.user + 'shift')||this.state.shift;
    const doneAll = todoList.every((todo)=>todo.isActive === false);
    const doneAny = todoList.some((todo)=>todo.isActive === false);
    //加载缓存
    this.setState({
      todoList,
      doneAll,
      doneAny,
      shift,
    })
    //监听器
    window.addEventListener('beforeunload',this.beforeunload);
  }
  componentDidUpdate(){
    console.log('TodoModel DidUpdate');
  }
  //监听器回调函数，缓存数据TodoList
  beforeunload = (event) =>{
    console.log('user-setStorge:'+ this.state.user);
    const {todoList,shift} = this.state;
    storage.set(this.state.user + 'TodoList',todoList);
    storage.setParams(this.state.user + 'shift',shift);
  }
  storage = () =>{
    const {todoList,shift} = this.state;
    storage.set(this.state.user + 'TodoList',todoList);
    storage.setParams(this.state.user + 'shift',shift);
  }
  componentWillUnmount(){
    window.removeEventListener('beforeunload',this.beforeunload);
  }

  //新增Item
  addTodo = (todo) =>{
    const list = this.state.todoList;
    this.setState({
      todoList:[...list,todo],
      doneAll:false,
    })
    console.log('addTodo-',todo.name);
  }

  //改变Item是否完成的状态
  turnTodo = (id) =>{
    const list = this.state.todoList;
    const newList = list.map((todo)=>{
      if(todo.id === id){
        todo.isActive = !todo.isActive;
        console.log('turnTodo-' + todo.name, 'active-' + todo.isActive);
      }
      return todo;
    })
    const doneAll = newList.every((todo) => todo.isActive === false);
    const doneAny = newList.some((todo) => todo.isActive === false);
    this.setState({
      todoList:newList,
      doneAll,
      doneAny,
    }) 
  }

  //删除Item
  deleteTodo = (id) =>{
    const list = this.state.todoList;
    const index = list.findIndex((todo) => todo.id === id);
    list.splice(index,1);
    const doneAll = list.every((todo) => todo.isActive === false);
    const doneAny = list.some((todo) => todo.isActive === false);
    this.setState({
      todoList:list,
      doneAll,
      doneAny,
    })
    console.log('deleteTodo-ID-' + id);
  }

  //编辑Item内容
  updateTodo = (id,newName) =>{
    if(newName === ''){
      this.deleteTodo(id);
    }else{
      const list = this.state.todoList;
      const newList = list.map((todo) =>{
        if(todo.id === id){
          console.log('updateTodo-' + todo.name + 'to' + newName);
          todo.name = newName;
        }
        return todo;
      });
      this.setState({
        todoList:newList,
      })
    }
  }

  //设置Item编辑状态
  editTodo = (id,flag) =>{
    const list = this.state.todoList;
    const newList = list.map((todo) =>{
      if(todo.id === id){
        todo.isEdit = flag;
      }
      return todo;
    });
    this.setState({
      todoList:newList,
    })
  }

  //设置AllItem的完成状态
  toggleAll = () =>{
    let {todoList,doneAll} = this.state;
    let state = !doneAll;
    const newTodoList = todoList.map((todo) =>{
      todo.isActive = !state;
      return todo;
    })
    this.setState({
      todoList:newTodoList,
      doneAll:state,
      doneAny:state,
    })
    console.log('toggleAll-' + state);
  }

  //清除完成的Item
  deleteTodoDone = () =>{
    const list = this.state.todoList;
    const newList = list.filter((todo) => todo.isActive === true);
    this.setState({
      todoList:newList,
      doneAny:false,
      doneAll:false,
    });
    console.log('deleteTodoDone');
  }

  //切换渲染状态
  shiftRender = (shift) =>{
    this.setState({
      shift,
    });
    console.log('shift-' + shift);  
  }

  render(){
    const {todoList,doneAll,doneAny,shift} = this.state;
    let renderList = todoList;
    if(shift === 'active'){
      renderList = todoList.filter((todo) => todo.isActive === true)
    }else if(shift === 'completed'){
      renderList = todoList.filter((todo) => todo.isActive === false)
    }

    return(
      <div>
        <ModelHeader
          doneAll={doneAll}
          todo={todoList.length}
          toggleAll={this.toggleAll}
          addTodo={this.addTodo}
        />
        <section className="todoList">
          <ul>
            {
              renderList.map((todo) => {
                return <ModelItem
                          key={todo.id}
                          todo={todo}
                          done={!todo.isActive}
                          turnTodo={this.turnTodo}
                          deleteTodo={this.deleteTodo}
                          updateTodo={this.updateTodo}
                          editTodo={this.editTodo}
                        />
              })
            }
          </ul>
        </section>
        <ModelFooter 
          todoList={todoList}
          doneAny={doneAny}
          shift={shift}
          deleteTodoDone={this.deleteTodoDone}
          shiftRender={this.shiftRender}
        />
        {/* 设置 */}
        <Options 
          user={this.props.user} 
          setUser={this.props.setUser} 
          loaded={this.props.loaded} 
          setLoaded={this.props.setLoaded}
          storage={this.storage}
        />
      </div>
    );
  }
}