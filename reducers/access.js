let intialState = 0
 const access = (state = intialState , action) =>{
    switch(action.type){
        case 'ACCESS':
            return state + 1
        default :
            return state
      

    }
}
export default access;