import React, {Fragment, useState, useEffect} from "react";
import TodoLoad from "./components/Load/TodoLoad";
import TodoModel from "./components/Model/TodoModel";


export default function App(){
  const [user,setUser] = useState(null)
  const [loaded,setLoaded] = useState(false);

  useEffect(()=>{
    console.log('user:'+user,'loaded:'+loaded);
    
  })
  return(
    <Fragment>
      <header className="logo">
        TODOS
      </header>

      {/* 登录界面 */}
      {loaded?
      null:
      <section className="load">
        <TodoLoad 
          user={user} 
          setUser={setUser} 
          loaded={loaded} 
          setLoaded={setLoaded}
        />
      </section>}

      {/* 使用界面 */}
      {loaded?
      <section className="model">
        <TodoModel 
          user={user}
          setUser={setUser} 
          loaded={loaded} 
          setLoaded={setLoaded}
        />
      </section>
      :null}
      
      <footer className="info">
        <p>TodoMVC-React by <a href="https://github.com/BinyangXie" target= "_blank" rel="noopener noreferrer">BinyangXie</a></p>
      </footer>
    </Fragment>
  )
}