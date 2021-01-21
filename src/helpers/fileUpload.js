

export const fileUpload = async ( file ) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dbumtrqcn/upload';

    // Creamos un Json para poder mandar los valores que ocupa cloudinary para poder subir un archivo (viene en la documentacion lo que ocupa)
    const formData = new FormData();
    formData.append('upload_preset','react-blocknotes');
    formData.append('file',file);

    try {
        //creamos el fetch de la peticion que le haremos a la url, pero al ser metodo post tenemos que decirle el tipo de metodo y que contendra de argumentos
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( resp.ok){
            const cloudResp = await resp.json();
            return cloudResp.secure_url
        } else{
            throw await resp.json();
        }

    } catch (error) {
        throw error;
    }

}