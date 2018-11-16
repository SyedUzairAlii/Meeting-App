import actionTypes from "../constant/constant";


const INITIAL_STATE={
    newUser: null,
    DATA : null,
    REQUEST : null,
}


export default (states = INITIAL_STATE, action )=>{
 
     switch(action.type){
         case actionTypes.newUser:
         return({
             ...states,
             newUser: action.payload
         })
        //  case actionTypes.DATA:
        //  return({
        //      ...states,
        //      DATA: action.payload
        //  })
         case actionTypes.REQUEST:
         return({
             ...states,
             REQUEST: action.payload
         })
     default:
       return states;
 }


}