import * as Koa from 'koa';
import classifyModel from '../../../model/classify/classify.model';

import { __IPostClassifyNew } from '../../../interface/api-manager.interface';

export let mClassifyNew = async( ctx: Koa.Context ) => {

    let { classifyTitle, children, keyCode } = ctx.request.body as __IPostClassifyNew;
    let result = await classifyModel.save( classifyTitle, keyCode, children );

    ctx.body = JSON.stringify({
        msg: 'success',
        status: '200'
    })

}