import axios from "axios";

export const subgraphQuery = async (): Promise<void> => {
    try {
        const subgraph_url = "https://api.thegraph.com/subgraphs/name/abbas-khann/lotterygame";
        const response = await axios.post(subgraph_url, {
            query
        });
        if(response.data.errors) {
            console.error(response.data.errors);
            throw new Error(`Error making subgraph query: `, response.data.errors);
        }
        return response.data.data;
    } 
    catch (err: any) {
        console.error(err);
        throw new Error(`Could not query subgraph ${err.message}`);
    }
}