import React, { Component } from 'react'

class UpdateArticle extends Component{
  constructor(props){
    super(props)
    this.state={
      title : props.data.title,
      desc : props.data.desc,
      id : props.data.id
    }
  }

  inputFormHandler = (e) => { 
    this.setState({[e.target.name]:e.target.value})
  }

  render(){
    console.log('UpdateArticle')
    console.log(this.props.data)
    return(
      <div>
        <section>
          <article>
            <h2>Update Task</h2>                  
            <form action="/" method="POST" onSubmit={ e=>{
              e.preventDefault();
              console.log(e.target.title.value)
              console.log(e.target.desc.value)
              this.props.onSubmit( 
                 this.state.id
                ,this.state.title
                ,this.state.desc)
            }}>
              <input type="hidden" name="id" value={this.state.id} />
              <p>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" placeholder="title" id="title" 
                value={this.state.title} 
                onChange={this.inputFormHandler}
                required/>
              </p>
              <p>
                <label htmlFor="desc">Description:</label>
                <textarea id="desc" 
                name="desc" 
                placeholder="description" 
                value={this.state.desc} 
                onChange={this.inputFormHandler}
                required></textarea>
              </p>
              <button className="primary">Submit</button>
            </form>                     
          </article>
        </section>
        
      </div>
    )
  }
}


export default UpdateArticle