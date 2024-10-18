 import path from 'node:path';
 import { fileURLToPath } from 'node:url';
import { Router, Response} from 'express';
 

const router = Router();

// TODO: Define route to serve index.html
router.get('*', (_, responseObj: Response) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    responseObj.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

export default router;
