import Methods from "../http/Methods"

export const adminServices ={

    async addProduct(productData:any) : Promise<any> {
        
        try{
            const response  = await Methods.post("/deals",{productData});
            return response;
        }
        catch(error){
            console.error("Error adding product:", error);
            throw error;

    }
    },

}