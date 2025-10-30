
import './App.css';
import React, { Component } from 'react'
import Myheader from './component/Myheader';
import Mynav from './component/Mynav';
import ReadArticle from './component/ReadArticle';
import CreateArticle from './component/CreateArticle';
import UpdateArticle from './component/UpdateArticle';

class App extends Component {
  constructor(props){
    super(props)

    this.max_menu_id = 3;
    this.state= {
      mode:'welcome',
      selected_id:2,
      welcome:{
        title:'welcome',
        desc:'welcome to frontend'
      },
      subject : {
        title:"프론트엔드 개발자 역량",
        desc:"기본언어인 html, css, javascript부터 학습합니다."
      },
      menus:[
        {
          id:1,title:"UI/UX 개발",desc:"사용자 인터페이스와 사용자가 웹사이트를 이용하면 느끼고 생각하는 총체적 경험을 개발"
        },
        {
          id:2,title:"재사용이 가능한 UI 개발",desc:"앵귤러, 리엑트, 뷰등의 자바스크립트 프레임워크를 가지고 재사용할 수 있는 UI를 만든다."
        },
        {
          id:3,title:"애니메이션 구현",desc:"CSS 또는 javascript를 사용해 다양한 효과의 애니메이션 구현한다."
        }
      ]
    }
  }

  getReadArticle(){  
    let idx = this.state.menus.findIndex(item=> (item.id === this.state.selected_id))
    let data = this.state.menus[idx]
    
    console.log('data ' , data)
    return data;
  }


  getArticles(){
    
    let _title, _desc , _article= null;
   
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title
      _desc = this.state.welcome.desc

      _article = <ReadArticle title={_title} desc={_desc} mode={this.state.mode}></ReadArticle>
    } else if(this.state.mode === "read"){
      let _data = this.getReadArticle();
      _title = _data.title;
      _desc = _data.desc;

      _article = <ReadArticle title={_title} desc={_desc} onChangeMode={(_mode) =>{
        

        if(_mode === 'delete'){
          if(window.confirm('정말 삭제할까요?')){
            let _menus = Array.from(this.state.menus);
            let idx = _menus.findIndex(item =>(item.id === this.state.selected_id));
            _menus.splice(idx,1)
            this.setState({
              mode:'welcome',
              menus:_menus 
            })
          }
        }else{
          this.setState({
            mode:_mode
          }) 
        }          
      }}
      ></ReadArticle>
    } else if(this.state.mode ==="create"){
      _article = <CreateArticle onSubmit={ (_title,_desc) =>{
        console.log(_title , _desc)

        this.max_menu_id += 1;

        //해당 방식은 원본을 그대로 수정 했기 때문에, 원본가, 변경 값을 찾을 수 없다.
        // this.state.menus.push(
        //   {id:this.max_menu_id, title:_title, desc:_desc}
        // )

        // this.setState({
        //   menus :this.state.menus
        // })

        //원본 데이터를 강제로 변경하면 이후, 어떤 값이 변경 되었는지 찾을 수가 없다.
        //데이터를 복사하고 변경하는 방향으로 권장
        // let menus = this.state.menus.concat(
        //   {id:this.max_menu_id, title:_title, desc:_desc}
        // )

        // this.setState({
        //   menus :menus
        // })

        let _menus = Array.from(this.state.menus);
        _menus.push(
          {id:this.max_menu_id, title:_title, desc:_desc}
        )
        this.setState({
          menus :_menus,
          mode:'read',
          selected_id : this.max_menu_id
        })

      } }></CreateArticle>

    }else if(this.state.mode ==="update"){
      let _data = this.getReadArticle();
      _article = <UpdateArticle data={_data}  onSubmit={ (_id , _title, _desc) =>{
        let _menus = Array.from(this.state.menus);
        _menus.forEach( (item,index ) =>{
          if (item.id === _id){
            _menus[index] = {id:_id, title:_title , desc:_desc}
          }
        })

        this.setState({
          menus :_menus,
          mode:'read'
        })
      } }></UpdateArticle>

    }

    return _article;
  }

  render() {
    console.log('APP 실행')

    
    return (
      <div className='App'>
        <Myheader 
          title={this.state.subject.title} 
          desc={this.state.subject.desc}
          onChangeMode = {()=>{
            this.setState({
              mode:'welcome'
            })
          }}
          >
        </Myheader>
        {/* 함수의 인자는 자식에서 리턴한 파라미터 값이다, 부모에서 넘기는 값이 아닌 , 자식에서 넘어온 파라미터 값 
          onChangePage 자식 컴포넌트에게 함수를 전달하고, id라는 인자는 자식 컴포넌트에서 전달(리턴)받은 결과 값이다.
        */}
        <Mynav data={this.state.menus} onChangePage={(id)=>{
          this.setState({
            mode:'read',
            selected_id :id
          })
        }}></Mynav>

        {/* <ReadArticle title={_title} desc={_desc} mode={this.state.mode} onChangeMode={
          (_mode) =>{
            this.setState({
              mode:_mode
            })
          }
        } */}
        {this.getArticles()}
        <hr></hr>
        <div className="menu">
            <button type="button" className="primary" onClick={ ()=>{
                this.setState({
                    mode:'create'
                })
            }}
            >
                Create task
            </button>   
        </div>         
      </div>
    )
  }
}

export default App;
