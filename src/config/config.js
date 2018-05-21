export let config = {
    currentCompany: 'uniliver',
    productPrices:
    {
        classic : 269.99,
        standout : 322.99,
        premium : 394.99
    },
    discountedCompaniesWithRules:{
        unilever: {
            classic:{
                price:179.99, minQty:3, type:'xfory'
            }
        },// Type 'xfory' means deals like 3 for 2, or 5 for 4, etc.
        apple: {
            standout: {
                price:299.99, minQty:1, type:'po'
            }
        },// Type 'po' means per order i.e. if min qty met, then all are priced same.
        nike: {
            premium:{
                price:379.99, minQty:4, type:'minormore'
            }
        },// Type 'minormore' means atleast the specified minimum qty is purchased.
        ford:{
            classic : {
                price:215.992, minQty:5, type:'xfory'
            },
            standout: {
                price:309.99, minQty:1, type:'po'
            },
            premium : {
                price:389.99, minQty:3, type:'minormore'
            }
        }
    }
}