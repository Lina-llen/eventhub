import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

function checkToken(req, res, next) {
    const header = req.headers["authorization"];
    //ici je découpe la valeur récupéré dans un tableau des que je croise un espace 
    const token = header && header.split(" ")[1];
    if (!token) {   
        return res.status(401).json({error: "Unauthorized"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        //si une erreur est captée: mauvaise clé secrete etc etc 
        if (err) {
            return res.status(403).json({error: "Token incorrect"});
        }
        req.user = decode.user;
        
        //instruction suivante
        next();
    })
}

export default checkToken;
