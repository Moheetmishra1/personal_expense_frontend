

const AddCategoryToSlice=(estate,action)=>{

    let {payload:category} = action
    // console.log(category);
    estate.reduxCategory  = category;
}


export {AddCategoryToSlice}