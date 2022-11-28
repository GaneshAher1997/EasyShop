const cartReducer = (state,action) => {
    if(action.type==="ADD_TO_CART"){
     let{id,color,amount,product}= action.payload;

     //tackle the existing  product
     let existingProduct = state.cart.find(
      (curItem) =>curItem.id === id+color);

      if(existingProduct){
         let updatedProduct = state.cart.map((curElem)=>{
            if(curElem.id===id+color){
               let newAmount=curElem.amount+amount;
               if(newAmount>=curElem.max){
                  newAmount = curElem.max;
               }
               return{
                  ...curElem,
                  amount:newAmount
               }
            }
            else{
               return curElem;
            }
            
         });
         return{
            ...state,
            cart:updatedProduct,
         };

      }
      else{ 
     
     let cartProduct;
     cartProduct={
        id:id+color,
        name:product.name,
        color,
        amount,
        image:product.image[0].url,
        price:product.price,
        max:product.stock,

     }
     return{
        ...state,
        cart:[...state.cart,cartProduct],
     };
   }
}
// to set the decreament and decreamnt 

if(action.type==="SET_DECREAMENT"){
   let updatedProduct=state.cart.map((curElem)=>{
      if(curElem.id===action.payload){
         let decAmount= curElem.amount - 1;
        
         //it is not deacrease bellow zero
         if(decAmount<=1){
            decAmount=1
         }
         return{
            ...curElem,
            amount:decAmount,
         };
      }else{
         return curElem
      }
   });
   return{...state,cart:updatedProduct}
}



if(action.type==="SET_INCREMENT"){
   let updatedProduct=state.cart.map((curElem)=>{
      if(curElem.id===action.payload){
         let inAmount= curElem.amount +  1;
        
         //it is not go to max product which is 6
         if(inAmount >= curElem.max){
            inAmount=curElem.max;
         }
         return{
            ...curElem,
            amount:inAmount,
         };
      }else{
         return curElem
      }
   });
   return{...state,cart:updatedProduct}
}

 
    

    if(action.type==="REMOVE_ITEM"){
      let updatedCart=state.cart.filter(
         (curItem)=>curItem.id !== action.payload
         );
      return{
         ...state,
         cart:updatedCart,
      }


    }
    // to eampty or clear cart
    if(action.type==="CLEAR_CART"){
      return{
         ...state,
         cart:[],
      };

    }
     return state;
 
   
 }
 

 export default cartReducer