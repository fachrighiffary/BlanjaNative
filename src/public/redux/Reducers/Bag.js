const initialState = {
    mybag: [],
    myOrder: [],
    totalAmmount: 0,
    totalPayment: 0,
    trxId: Math.floor( (Math.random() * 10000000) + 1)
}

const bagReducer = (prevState = initialState,action) => {

        switch (action.type){
            case "ADD_ITEMS":
                console.log(action.data.product_id)
                let newItem = action.data
                const inCart = prevState.mybag.find(({ product_id, color, size }) =>
                    product_id === newItem.product_id && color === newItem.color && size === newItem.size ? true : false
                )
                console.log(inCart)
                return {
                    ...prevState,
                    mybag: inCart ?
                        prevState.mybag.map((items) =>
                            items.product_id === newItem.product_id && items.color === newItem.color && items.size === newItem.size ?
                                { ...items, qty: items.qty + 1 }
                                : items
                        )
                        : [...prevState.mybag, { ...action.data }],
                    totalAmmount: inCart ? prevState.totalAmmount + (newItem.price) : prevState.totalAmmount + (newItem.qty * newItem.price)
    
                }

            case "INC_QTY":
                const IncreaseQty = prevState.mybag.map((items) =>
                    items.product_id == action.data.product_id && items.color === action.data.color && items.size === action.data.size ?
                        { ...items, qty: items.qty + 1 }
                        : items
                )
                return {
                    ...prevState,
                    mybag: IncreaseQty,
                    totalAmmount: prevState.totalAmmount + action.data.price
                }
                
            case "DEC_QTY":
                const DecreaseQty = prevState.mybag.map((items) =>
                    items.product_id == action.data.product_id && items.color === action.data.color && items.size === action.data.size ?
                        { ...items, qty: items.qty - 1 }
                        : items
                )
                return {
                    ...prevState,
                    mybag: DecreaseQty,
                    totalAmmount: prevState.totalAmmount - action.data.price
                }

            case 'ORDER_ITEMS':
                return {
                    ...prevState,
                    mybag:
                        prevState.mybag.map((items) =>
                            true ?
                                { ...items, payment: action.data.payment, address: action.data.address, trxId: action.data.trxId }
                                : items
                        ),
                    trxId: prevState.trxId + 1
                }

            case "DELETE_ITEM":
                const itemAfterRemove = prevState.mybag.filter((items) => {
                    return items.product_id != action.data.product_id || items.color != action.data.color || items.size != action.data.size
                })
                return {
                    ...prevState,
                    mybag: itemAfterRemove,
                    totalAmmount: prevState.totalAmmount - action.data.price
                }

            case "TOTAL_PAYMENT":
                return {
                    totalPayment: prevState.totalPayment + action.data
                }

                
            case "EMPTY_BAG":
                return {
                    ...prevState,
                    mybag: [],
                    myOrder: [],
                    totalAmmount: 0,
                    totalPayment: 0,
                }
        
            default:
                return {
                    ...prevState,
                };
        }

    }

export default bagReducer