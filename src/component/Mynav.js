import React ,{ Component, useEffect, useState } from "react"

const Mynav = ({data, onChangePage}) => {
    const [list,setList] = useState([])
    let lists = []
    const getList = () =>{

        data.forEach( item => {
            lists.push(
                <li  key={item.id}>
                    <a href="/"
                        onClick={e=>{
                            //자체 이벤트 방지를 위해 적용 (적용하지 않으면 페이지 렌더링 또는 부모로 이벤트 전달이 안됨)
                            e.preventDefault();
                            //부모로 부터 전달받은 함수를 수행하고 역으로 결과 값을 전달
                            onChangePage(item.id);
                        }}
                    >{item.title}</a> 
                </li>
            )
        });
        setList(lists)
    }
    useEffect(()=>{
        getList()
        console.log('getList 실행')
    },[data])

    return (
        <nav>
            <ul>
                {list}
            </ul>
        </nav>
    )
}
export default Mynav

// class Mynav extends Component{
//     //렌더링 처리할지 여부, 업데이트가 되지 않은 상태는 false
//     // , 되었다면 true
//     // 불필요한 렌더링을 방지하기 위함
//     shouldComponentUpdate(newPorps, newState){
//         console.log('shouldComponentUpdate')
//         console.log(newPorps.data)   //변경된 값
//         console.log(this.props.data) //이전 값
//         if(newPorps.data === this.props.data){
//             return false;
//         }
        
//         return true
//     }
//   render(){
//     console.log('Mynav 실행')
//     let lists=[]
//     // console.log(this.props.data)
//     let data = this.props.data;
  
//     data.forEach( item => {
//         lists.push(
//             <li  key={item.id}>
//                 <a href="/"
//                     onClick={e=>{
//                         //자체 이벤트 방지를 위해 적용 (적용하지 않으면 페이지 렌더링 또는 부모로 이벤트 전달이 안됨)
//                         e.preventDefault();
//                         //부모로 부터 전달받은 함수를 수행하고 역으로 결과 값을 전달
//                         this.props.onChangePage(item.id);
//                     }}
//                 >{item.title}</a> 
//             </li>
//         )
//     });
//     return(
//       <nav>
//         <ul>
//             {lists}
//         </ul>
//       </nav>
//     )
//   }
// }

// export default Mynav