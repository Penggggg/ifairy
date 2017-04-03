
import { mClassifyNew } from './manager/classify/classify-new.controller';
import { mClassifyAll } from './manager/classify/classify-all.controller';

export default ( router ) => {

    router.get('/', async ( ctx ) => {
        ctx.body = 'Hello Ko123a';
    })



    /**管理端 */
    /**分类-新增 */
    router.post('/mapi/v1/classify-new', mClassifyNew )
    router.get('/mapi/v1/classify-all', mClassifyAll )


}