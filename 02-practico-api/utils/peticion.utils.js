module.exports = {
    esPeticionValida: (requiredFields, body, res) => {
        for (const field of requiredFields) {
            if (!body[field]) {
                res.status(400).json({
                    msg: `Falta el campo ${field}`
                });
                return false;
            }
        }
        return true;
    },
    enviarError500: (res, error) => { 
        console.error('Error', error); 
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};
