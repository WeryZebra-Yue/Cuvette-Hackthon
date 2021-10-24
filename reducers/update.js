let intialState = 0
 const update = (state = intialState , action) =>{
    switch(action.type){
        case 'UPDATE':
            return state + 1
        default :
            return state
      

    }
}
export default update;